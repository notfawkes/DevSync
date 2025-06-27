import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatPanel from '../components/ChatPanel';
import ProjectView from '../components/ProjectView';
import RepoList from '../components/RepoList';
const Dashboard: React.FC = () => {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  return <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <h1 className="text-xl font-bold">DevCollab</h1>
        </header>
        <div className="flex-1 flex overflow-hidden">
          <Routes>
            <Route path="/" element={<RepoList onSelectRepo={setSelectedRepo} />} />
            <Route path="/chat/:repoId" element={<ChatPanel />} />
            <Route path="/project/:repoId" element={<ProjectView />} />
          </Routes>
        </div>
      </div>
    </div>;
};
export default Dashboard;