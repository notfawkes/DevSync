import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SendIcon, PaperclipIcon, SmileIcon, CodeIcon } from 'lucide-react';
const ChatPanel: React.FC = () => {
  const {
    repoId
  } = useParams<{
    repoId: string;
  }>();
  const [message, setMessage] = useState('');
  // Mock chat data
  const chatMessages = [{
    id: '1',
    sender: 'Alex',
    content: 'Hey team, I just pushed some changes to the authentication module',
    time: '10:30 AM',
    avatar: 'https://i.pravatar.cc/150?img=1'
  }, {
    id: '2',
    sender: 'Taylor',
    content: 'I noticed some issues with the login flow. Can we discuss?',
    time: '10:35 AM',
    avatar: 'https://i.pravatar.cc/150?img=2'
  }, {
    id: '3',
    sender: 'Jordan',
    content: 'Sure, what specifically is the problem?',
    time: '10:37 AM',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }, {
    id: '4',
    sender: 'Taylor',
    content: 'When a user enters incorrect credentials, the error message is not displaying properly',
    time: '10:40 AM',
    avatar: 'https://i.pravatar.cc/150?img=2'
  }, {
    id: '5',
    sender: 'Alex',
    content: "Let me check that. I'll create a fix branch.",
    time: '10:42 AM',
    avatar: 'https://i.pravatar.cc/150?img=1'
  }, {
    id: '6',
    sender: 'Jordan',
    content: 'Should we tag this as a high priority issue?',
    time: '10:45 AM',
    avatar: 'https://i.pravatar.cc/150?img=3'
  }];
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to a backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };
  return <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              #{repoId === 'general' ? 'general' : `repo-${repoId}`}
            </h2>
            <p className="text-sm text-gray-400">
              {repoId === 'general' ? 'General discussion' : 'Repository discussion'}
            </p>
          </div>
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/150?img=1" alt="Team member" className="w-8 h-8 rounded-full border-2 border-gray-800" />
            <img src="https://i.pravatar.cc/150?img=2" alt="Team member" className="w-8 h-8 rounded-full border-2 border-gray-800" />
            <img src="https://i.pravatar.cc/150?img=3" alt="Team member" className="w-8 h-8 rounded-full border-2 border-gray-800" />
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs border-2 border-gray-800">
              +2
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {chatMessages.map(msg => <div key={msg.id} className="flex items-start">
              <img src={msg.avatar} alt={msg.sender} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{msg.sender}</span>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <p className="text-gray-300 mt-1">{msg.content}</p>
              </div>
            </div>)}
        </div>
      </div>
      <div className="p-4 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <button type="button" className="p-2 text-gray-400 hover:text-white">
            <PaperclipIcon size={20} />
          </button>
          <div className="flex-1 mx-2 bg-gray-700 rounded-md">
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." className="w-full bg-transparent px-4 py-2 focus:outline-none" />
          </div>
          <button type="button" className="p-2 text-gray-400 hover:text-white">
            <CodeIcon size={20} />
          </button>
          <button type="button" className="p-2 text-gray-400 hover:text-white">
            <SmileIcon size={20} />
          </button>
          <button type="submit" className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md" disabled={!message.trim()}>
            <SendIcon size={20} />
          </button>
        </form>
      </div>
    </div>;
};
export default ChatPanel;