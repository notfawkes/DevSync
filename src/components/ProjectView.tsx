import React, { useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { FolderIcon, FileIcon, GitBranchIcon, TagIcon, DownloadIcon, UploadIcon } from 'lucide-react';
const ProjectView: React.FC = () => {
  const {
    repoId
  } = useParams<{
    repoId: string;
  }>();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  // Mock project structure
  const projectFiles = [{
    id: '1',
    name: 'src',
    type: 'folder',
    children: [{
      id: '2',
      name: 'components',
      type: 'folder',
      children: [{
        id: '3',
        name: 'Header.tsx',
        type: 'file',
        content: '// Header component code here'
      }, {
        id: '4',
        name: 'Footer.tsx',
        type: 'file',
        content: '// Footer component code here'
      }]
    }, {
      id: '5',
      name: 'pages',
      type: 'folder',
      children: [{
        id: '6',
        name: 'Home.tsx',
        type: 'file',
        content: '// Home page code here'
      }, {
        id: '7',
        name: 'About.tsx',
        type: 'file',
        content: '// About page code here'
      }]
    }, {
      id: '8',
      name: 'App.tsx',
      type: 'file',
      content: '// App component code here'
    }]
  }, {
    id: '9',
    name: 'package.json',
    type: 'file',
    content: '{\n  "name": "project",\n  "version": "1.0.0"\n}'
  }, {
    id: '10',
    name: 'README.md',
    type: 'file',
    content: '# Project\n\nProject description here.'
  }];
  const renderFileTree = (files: any[], level = 0) => {
    return files.map(file => <Fragment key={file.id}>
        <div className={`flex items-center py-1 px-2 hover:bg-gray-700 cursor-pointer rounded ${selectedFile === file.id ? 'bg-gray-700' : ''}`} style={{
        paddingLeft: `${level * 16 + 8}px`
      }} onClick={() => file.type === 'file' && setSelectedFile(file.id)}>
          {file.type === 'folder' ? <FolderIcon size={16} className="text-blue-400 mr-2" /> : <FileIcon size={16} className="text-gray-400 mr-2" />}
          <span>{file.name}</span>
        </div>
        {file.children && renderFileTree(file.children, level + 1)}
      </Fragment>);
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
  return <div className="flex-1 flex overflow-hidden">
      <div className="w-64 border-r border-gray-700 overflow-y-auto">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Project Files</h3>
            <div className="flex">
              <button className="p-1 text-gray-400 hover:text-white">
                <GitBranchIcon size={16} />
              </button>
              <button className="p-1 text-gray-400 hover:text-white ml-1">
                <TagIcon size={16} />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <button className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded flex items-center">
              <DownloadIcon size={12} className="mr-1" />
              Pull
            </button>
            <button className="text-xs bg-green-700 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center">
              <UploadIcon size={12} className="mr-1" />
              Push to GitHub
            </button>
          </div>
        </div>
        <div className="p-2">{renderFileTree(projectFiles)}</div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedFileData ? <>
            <div className="bg-gray-800 border-b border-gray-700 p-2 text-sm">
              <span className="text-gray-400">{selectedFileData.name}</span>
            </div>
            <div className="flex-1 overflow-auto bg-gray-900 p-4">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {selectedFileData.content}
              </pre>
            </div>
          </> : <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a file to view its contents</p>
          </div>}
      </div>
    </div>;
};
export default ProjectView;