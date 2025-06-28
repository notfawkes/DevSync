import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatPanel from '../components/ChatPanel';
import ProjectView from '../components/ProjectView';
import RepoList from '../components/RepoList';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { supabase } from '../supabaseClient';

interface DashboardProps {
  onSignOut: () => void;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  owner: { login: string };
  stargazers_count: number;
  forks_count: number;
  language: string;
  private: boolean;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

const fetchAllRepos = async (accessToken: string): Promise<GitHubRepo[]> => {
  let allRepos: GitHubRepo[] = [];
  let page = 1;
  let hasMore = true;
  while (hasMore) {
    const res = await fetch(`https://api.github.com/user/repos?per_page=100&page=${page}`,
      { headers: { Authorization: `token ${accessToken}` } });
    if (!res.ok) throw new Error('Failed to fetch repositories from GitHub.');
    const data = await res.json();
    allRepos = allRepos.concat(data);
    hasMore = data.length === 100;
    page++;
  }
  return allRepos;
};

const Dashboard: React.FC<DashboardProps> = ({ onSignOut }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [repoError, setRepoError] = useState<string | null>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    const fetchReposAndUser = async () => {
      setLoadingRepos(true);
      setRepoError(null);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const accessToken = session?.provider_token;
        if (!accessToken) throw new Error('No GitHub access token found.');
        // Fetch repos
        const allRepos = await fetchAllRepos(accessToken);
        setRepos(allRepos);
        // Fetch user profile
        const userRes = await fetch('https://api.github.com/user', {
          headers: { Authorization: `token ${accessToken}` }
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setUser({ login: userData.login, avatar_url: userData.avatar_url, html_url: userData.html_url });
        }
      } catch (err: any) {
        setRepoError(err.message || 'Failed to load repositories.');
        setRepos([]);
      } finally {
        setLoadingRepos(false);
      }
    };
    fetchReposAndUser();
  }, []);

  // Toggle dark/light mode by toggling a class on the root element
  useEffect(() => {
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
          <div className="flex items-center gap-4">
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
            {user && (
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                <img src={user.avatar_url} alt={user.login} className="w-9 h-9 rounded-full border-2 border-[#23272f] shadow" />
                <span className="text-gray-200 font-semibold group-hover:underline">{user.login}</span>
              </a>
            )}
          </div>
        </header>
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Routes>
            <Route path="/" element={<RepoList onSelectRepo={() => {}} repos={repos} loading={loadingRepos} error={repoError} />} />
            <Route path="/chat/:repoId" element={<ChatPanel />} />
            <Route path="/project/:repoId" element={<ProjectView repos={repos} loading={loadingRepos} error={repoError} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;