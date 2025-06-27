import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, PlusIcon, TagIcon, GitBranchIcon, UsersIcon } from 'lucide-react';
interface RepoListProps {
  onSelectRepo: (repoId: string) => void;
}
const RepoList: React.FC<RepoListProps> = ({
  onSelectRepo
}) => {
  const navigate = useNavigate();
  // Mock repository data
  const repositories = [{
    id: '1',
    name: 'frontend-project',
    description: 'React application for client',
    tags: ['react', 'typescript'],
    collaborators: 4
  }, {
    id: '2',
    name: 'api-service',
    description: 'Backend API service',
    tags: ['node', 'express'],
    collaborators: 2
  }, {
    id: '3',
    name: 'documentation',
    description: 'Project documentation',
    tags: ['markdown'],
    collaborators: 6
  }, {
    id: '4',
    name: 'mobile-app',
    description: 'React Native mobile application',
    tags: ['react-native'],
    collaborators: 3
  }];
  const handleRepoClick = (repoId: string) => {
    onSelectRepo(repoId);
    navigate(`/dashboard/chat/${repoId}`);
  };
  return <div className="flex-1 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold mb-4">Your Repositories</h2>
        <div className="flex items-center mb-4">
          <div className="relative flex-1">
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search repositories..." className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md flex items-center">
            <PlusIcon size={20} />
          </button>
        </div>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
            All repositories
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
            Recent
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
            Starred
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid gap-4">
          {repositories.map(repo => <div key={repo.id} onClick={() => handleRepoClick(repo.id)} className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 cursor-pointer transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{repo.name}</h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <UsersIcon size={16} className="mr-1" />
                  <span>{repo.collaborators}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3">{repo.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {repo.tags.map((tag, index) => <div key={index} className="flex items-center text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                      <TagIcon size={12} className="mr-1" />
                      {tag}
                    </div>)}
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <GitBranchIcon size={16} className="mr-1" />
                  <span>main</span>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default RepoList;