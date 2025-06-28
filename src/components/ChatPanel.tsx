import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { SendIcon, PaperclipIcon, SmileIcon, CodeIcon } from 'lucide-react';
import { getChatChannel, supabase } from '../supabaseClient';

interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  userId: string;
}

const ChatPanel: React.FC = () => {
  const { repoId } = useParams<{ repoId: string }>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [user, setUser] = useState<{ login: string; avatar_url: string; id: string } | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.provider_token;
      if (!accessToken) return;
      const res = await fetch('https://api.github.com/user', {
        headers: { Authorization: `token ${accessToken}` }
      });
      if (res.ok) {
        const userData = await res.json();
        setUser({ login: userData.login, avatar_url: userData.avatar_url, id: userData.id?.toString() || userData.login });
      }
    };
    fetchUser();
  }, []);

  // Join chat channel for this repo
  useEffect(() => {
    if (!repoId) return;
    const channel = getChatChannel(repoId);
    channel.on('broadcast', { event: 'message' }, (payload) => {
      setMessages((prev) => [...prev, payload.payload as ChatMessage]);
    });
    channel.subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [repoId]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || !repoId) return;
    const msg: ChatMessage = {
      id: `${user.id}-${Date.now()}`,
      sender: user.login,
      avatar: user.avatar_url,
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      userId: user.id,
    };
    const channel = getChatChannel(repoId);
    await channel.send({ type: 'broadcast', event: 'message', payload: msg });
    setMessages((prev) => [...prev, msg]);
    setMessage('');
  };

  return (
    <div className="flex-1 min-h-0 h-full flex flex-col bg-[#181A20] font-sans">
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#23272f] bg-[#20232A]">
        <div>
          <h2 className="text-lg font-semibold text-gray-100">Chat | <span className="font-normal text-gray-400">{repoId}</span></h2>
        </div>
      </div>
      <div ref={chatRef} className="flex-1 min-h-0 overflow-y-auto px-8 py-6 space-y-4 bg-[#181A20]">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${user?.id === msg.userId ? 'justify-end' : 'justify-start'}`}>
            {user?.id !== msg.userId && (
              <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full mr-3 self-end" />
            )}
            <div className={`max-w-xl flex flex-col ${user?.id === msg.userId ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-5 py-3 text-base font-normal shadow-sm ${user?.id === msg.userId ? 'bg-[#2AABEE] text-white' : 'bg-[#23272f] text-gray-100'} matte-bubble`} style={{wordBreak: 'break-word'}}>
                {msg.content}
              </div>
              <span className="text-xs text-gray-400 mt-1 px-1">{msg.time}</span>
            </div>
            {user?.id === msg.userId && (
              <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full ml-3 self-end" />
            )}
          </div>
        ))}
      </div>
      <div className="px-8 py-4 border-t border-[#23272f] bg-[#20232A]">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <button type="button" className="p-2 text-gray-400 hover:text-[#2AABEE]">
            <PaperclipIcon size={20} />
          </button>
          <div className="flex-1 bg-[#23272f] rounded-full px-4">
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." className="w-full bg-transparent py-2 text-gray-100 focus:outline-none font-sans" />
          </div>
          <button type="button" className="p-2 text-gray-400 hover:text-[#2AABEE]">
            <CodeIcon size={20} />
          </button>
          <button type="button" className="p-2 text-gray-400 hover:text-[#2AABEE]">
            <SmileIcon size={20} />
          </button>
          <button type="submit" className="ml-2 bg-[#2AABEE] hover:bg-[#249ed9] text-white p-2 rounded-full transition-colors" disabled={!message.trim()}>
            <SendIcon size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};
export default ChatPanel;