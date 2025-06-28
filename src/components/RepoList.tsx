import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, PlusIcon, UsersIcon } from 'lucide-react';

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

interface RepoListProps {
  onSelectRepo: (repoId: string) => void;
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

const RepoList: React.FC<RepoListProps> = ({ onSelectRepo, repos, loading, error }) => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');

  const handleRepoClick = (repoId: string) => {
    onSelectRepo(repoId);
    navigate(`/dashboard/chat/${repoId}`);
  };

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-h-0 h-full overflow-hidden flex flex-col font-sans bg-[#181A20]">
      <div className="p-8 border-b border-[#23272f] bg-[#20232A] flex-1 min-h-0 h-full overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">Top repositories</h2>
        <div className="flex items-center mb-6 gap-2">
          <div className="relative flex-1">
            <SearchIcon size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Find a repository..."
              className="w-full bg-[#23272f] text-gray-100 pl-12 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#2AABEE] transition-colors"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button className="ml-2 bg-[#2AABEE] hover:bg-[#249ed9] text-white p-2 rounded-full flex items-center transition-colors">
            <PlusIcon size={20} />
          </button>
        </div>
        {loading ? (
          <div className="text-gray-400 py-8 text-center">Loading repositories...</div>
        ) : error ? (
          <div className="text-red-400 py-8 text-center">{error}</div>
        ) : (
          <div className="space-y-3">
            {filteredRepos.length === 0 ? (
              <div className="text-gray-400 text-center">No repositories found.</div>
            ) : (
              filteredRepos.map(repo => (
                <div
                  key={repo.id}
                  className="p-5 rounded-2xl bg-[#23272f] border border-transparent hover:border-[#2AABEE] flex flex-col gap-1 cursor-pointer transition-all duration-200 group"
                  onClick={() => handleRepoClick(repo.name)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-100">{repo.name}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <UsersIcon size={14} /> {repo.owner.login}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">{repo.description || 'No description'}</div>
                  <div className="flex gap-2 mt-1">
                    {repo.language && (
                      <span className="px-3 py-0.5 rounded-full bg-[#20232A] text-xs font-medium text-[#2AABEE]">
                        {repo.language}
                      </span>
                    )}
                    {repo.private && (
                      <span className="px-3 py-0.5 rounded-full bg-[#20232A] text-xs font-medium text-gray-400">
                        Private
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default RepoList;