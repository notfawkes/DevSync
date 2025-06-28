import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatPanel from '../components/ChatPanel';
import ProjectView from '../components/ProjectView';
import RepoList from '../components/RepoList';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface DashboardProps {
  onSignOut: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSignOut }) => {
  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark/light mode by toggling a class on the root element
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`flex h-screen overflow-hidden font-sans ${darkMode ? 'bg-dark-background text-dark-text' : 'bg-light-background text-light-text'}`}>
      <Sidebar darkMode={darkMode} onSignOut={onSignOut} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className={`flex items-center justify-between px-8 h-20 bg-[#20232A] border-b border-[#23272f]`}>
          <h1 className="text-2xl font-bold tracking-tight text-gray-100 font-sans">Dashboard</h1>
          <button
            className="rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#23272f] bg-[#23272f] hover:bg-[#23272f]/80"
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
            >
            {darkMode ? (
              <SunIcon className="w-6 h-6 text-gray-300" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </header>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Routes>
            <Route path="/" element={<RepoList onSelectRepo={() => {}} />} />
            <Route path="/chat/:repoId" element={<ChatPanel />} />
            <Route path="/project/:repoId" element={<ProjectView />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;