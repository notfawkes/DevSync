import React, { useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { FolderIcon, FileIcon, GitBranchIcon, TagIcon, DownloadIcon, UploadIcon } from 'lucide-react';

const monoFont = 'font-mono'; // Tailwind's default, can be customized in config if needed

const ProjectView: React.FC = () => {
  const { repoId } = useParams<{ repoId: string }>();
  // TODO: Use repoId to fetch specific repository data
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  // Mock project structure
  const projectFiles = [
    {
      id: '1',
      name: 'src',
      type: 'folder',
      children: [
        {
          id: '2',
          name: 'components',
          type: 'folder',
          children: [
            { id: '3', name: 'Header.tsx', type: 'file', content: '// Header component code here' },
            { id: '4', name: 'Footer.tsx', type: 'file', content: '// Footer component code here' },
          ],
        },
        {
          id: '5',
          name: 'pages',
          type: 'folder',
          children: [
            { id: '6', name: 'Home.tsx', type: 'file', content: '// Home page code here' },
            { id: '7', name: 'About.tsx', type: 'file', content: '// About page code here' },
          ],
        },
        { id: '8', name: 'App.tsx', type: 'file', content: '// App component code here' },
      ],
    },
    { id: '9', name: 'package.json', type: 'file', content: '{\n  "name": "project",\n  "version": "1.0.0"\n}' },
    { id: '10', name: 'README.md', type: 'file', content: '# Project Readme' },
  ];
  const renderFileTree = (files: any[], level = 0) => {
    return files.map(file => (
      <Fragment key={file.id}>
        <div
          className={`flex items-center py-1 px-2 hover:bg-[#2AABEE] cursor-pointer rounded-md transition-colors duration-200 ${selectedFile === file.id ? 'bg-[#2AABEE]' : ''}`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => file.type === 'file' && setSelectedFile(file.id)}
        >
          {file.type === 'folder' ? (
            <FolderIcon size={16} className="text-gray-100 text-light-accentBlue mr-2" />
          ) : (
            <FileIcon size={16} className="text-gray-100 text-light-muted mr-2" />
          )}
          <span className="font-medium leading-tight">{file.name}</span>
        </div>
        {file.children && renderFileTree(file.children, level + 1)}
      </Fragment>
    ));
  };
  const getSelectedFileContent = () => {
    const findFile = (files: any[]): any => {
      for (const file of files) {
        if (file.id === selectedFile) return file;
        if (file.children) {
          const found = findFile(file.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findFile(projectFiles);
  };
  const selectedFileData = getSelectedFileContent();
  return (
    <div className="flex-1 min-h-0 h-full flex overflow-hidden font-sans bg-[#181A20]">
      <div className="w-80 border-r border-[#23272f] bg-[#20232A] overflow-y-auto rounded-l-lg" style={{minWidth: '320px'}}>
        <div className="p-6 border-b border-[#23272f]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg leading-tight text-gray-100">{repoId === 'current' ? 'Current Project' : `Project: ${repoId}`}</h3>
            <div className="flex">
              <button className="p-1 text-gray-400 hover:text-[#2AABEE] transition-colors">
                <GitBranchIcon size={16} />
              </button>
              <button className="p-1 ml-1 text-gray-400 hover:text-[#2AABEE] transition-colors">
                <TagIcon size={16} />
              </button>
            </div>
          </div>
          <div className="flex justify-between gap-2 mb-4">
            <button className="text-xs bg-[#23272f] text-gray-100 px-3 py-1 rounded font-medium flex items-center gap-1 hover:bg-[#2AABEE] hover:text-white transition-colors">
              <DownloadIcon size={12} /> Pull
            </button>
            <button className="text-xs bg-[#2AABEE] text-white px-3 py-1 rounded font-medium flex items-center gap-1 hover:bg-[#249ed9] transition-colors">
              <UploadIcon size={12} /> Push to GitHub
            </button>
          </div>
          <div className="p-2 space-y-1">
            {renderFileTree(projectFiles)}
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0 h-full flex flex-col overflow-hidden rounded-r-lg">
        {selectedFileData ? (
          <>
            <div className="bg-[#20232A] border-b border-[#23272f] p-4 text-sm font-medium leading-tight text-gray-400">
              <span>{selectedFileData.name}</span>
            </div>
            <div className="flex-1 min-h-0 overflow-auto bg-[#181A20] p-8 font-mono text-sm leading-snug text-gray-100 rounded-b-lg">
              <pre className="whitespace-pre-wrap">{selectedFileData.content}</pre>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a file to view its contents</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProjectView;