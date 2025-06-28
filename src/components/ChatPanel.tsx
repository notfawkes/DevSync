import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SendIcon, PaperclipIcon, SmileIcon, CodeIcon } from 'lucide-react';

const ChatPanel: React.FC = () => {
  const { repoId } = useParams<{ repoId: string }>();
  const [message, setMessage] = useState('');
  // Mock chat data
  const chatMessages = [
    {
      id: '1',
      sender: 'Alex',
      content: 'Hey team, I just pushed some changes to the authentication module',
      time: '10:30 AM',
      avatar: 'https://i.pravatar.cc/150?img=1',
      isMe: false
    },
    {
      id: '2',
      sender: 'Taylor',
      content: 'I noticed some issues with the login flow. Can we discuss?',
      time: '10:35 AM',
      avatar: 'https://i.pravatar.cc/150?img=2',
      isMe: true
    },
    {
      id: '3',
      sender: 'Jordan',
      content: 'Sure, what specifically is the problem?',
      time: '10:37 AM',
      avatar: 'https://i.pravatar.cc/150?img=3',
      isMe: false
    },
    {
      id: '4',
      sender: 'Taylor',
      content: 'When a user enters incorrect credentials, the error message is not displaying properly',
      time: '10:40 AM',
      avatar: 'https://i.pravatar.cc/150?img=2',
      isMe: true
    },
    {
      id: '5',
      sender: 'Alex',
      content: "Let me check that. I'll create a fix branch.",
      time: '10:42 AM',
      avatar: 'https://i.pravatar.cc/150?img=1',
      isMe: false
    },
    {
      id: '6',
      sender: 'Jordan',
      content: 'Should we tag this as a high priority issue?',
      time: '10:45 AM',
      avatar: 'https://i.pravatar.cc/150?img=3',
      isMe: false
    }
  ];
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to a backend
      setMessage('');
    }
  };
  return (
    <div className="flex-1 min-h-0 h-full flex flex-col bg-[#181A20] font-sans">
      <div className="flex items-center justify-between px-8 py-4 border-b border-[#23272f] bg-[#20232A]">
        <div>
          <h2 className="text-lg font-semibold text-gray-100">Chat | <span className="font-normal text-gray-400">{repoId}</span></h2>
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto px-8 py-6 space-y-4 bg-[#181A20]">
        {chatMessages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            {!msg.isMe && (
              <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full mr-3 self-end" />
            )}
            <div className={`max-w-xl flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-5 py-3 text-base font-normal shadow-sm ${msg.isMe ? 'bg-[#2AABEE] text-white' : 'bg-[#23272f] text-gray-100'} matte-bubble`} style={{wordBreak: 'break-word'}}>
                {msg.content}
              </div>
              <span className="text-xs text-gray-400 mt-1 px-1">{msg.time}</span>
            </div>
            {msg.isMe && (
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