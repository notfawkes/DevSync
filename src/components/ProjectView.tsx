import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { FolderIcon, FileIcon, GitBranchIcon, TagIcon, DownloadIcon, UploadIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';
import Editor from '@monaco-editor/react';

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

interface ProjectViewProps {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  url: string;
  download_url: string | null;
  sha: string;
}

const ProjectView: React.FC<ProjectViewProps> = ({ repos, loading, error }) => {
  const { repoId } = useParams<{ repoId: string }>();
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [files, setFiles] = useState<GitHubFile[] | null>(null);
  const [filesLoading, setFilesLoading] = useState(false);
  const [filesError, setFilesError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<GitHubFile | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [fileContentLoading, setFileContentLoading] = useState(false);
  const [fileContentError, setFileContentError] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (selectedRepo) {
      const repo = repos.find(r => r.name === selectedRepo);
      if (!repo) return;
      const fetchFiles = async () => {
        setFilesLoading(true);
        setFilesError(null);
        setFiles(null);
        setSelectedFile(null);
        setFileContent('');
        setEditContent('');
        setFileContentError(null);
        try {
          const { data: { session } } = await supabase.auth.getSession();
          const accessToken = session?.provider_token;
          if (!accessToken) throw new Error('No GitHub access token found.');
          const res = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents`, {
            headers: { Authorization: `token ${accessToken}` }
          });
          if (!res.ok) throw new Error('Failed to fetch files from GitHub.');
          const data = await res.json();
          setFiles(data);
        } catch (err: any) {
          setFilesError(err.message || 'Failed to load files.');
        } finally {
          setFilesLoading(false);
        }
      };
      fetchFiles();
    }
  }, [selectedRepo, repos]);

  // Fetch file content when a file is selected
  useEffect(() => {
    if (selectedFile && selectedRepo) {
      const repo = repos.find(r => r.name === selectedRepo);
      if (!repo || selectedFile.type !== 'file') return;
      const fetchFileContent = async () => {
        setFileContentLoading(true);
        setFileContentError(null);
        setFileContent('');
        setEditContent('');
        setSaveSuccess(false);
        try {
          const { data: { session } } = await supabase.auth.getSession();
          const accessToken = session?.provider_token;
          if (!accessToken) throw new Error('No GitHub access token found.');
          const res = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/${selectedFile.path}`, {
            headers: { Authorization: `token ${accessToken}` }
          });
          if (!res.ok) throw new Error('Failed to fetch file content from GitHub.');
          const data = await res.json();
          const content = atob(data.content.replace(/\n/g, ''));
          setFileContent(content);
          setEditContent(content);
        } catch (err: any) {
          setFileContentError(err.message || 'Failed to load file content.');
        } finally {
          setFileContentLoading(false);
        }
      };
      fetchFileContent();
    }
  }, [selectedFile, selectedRepo, repos]);

  // Save file content to GitHub
  const handleSave = async () => {
    if (!selectedFile || !selectedRepo) return;
    const repo = repos.find(r => r.name === selectedRepo);
    if (!repo) return;
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.provider_token;
      if (!accessToken) throw new Error('No GitHub access token found.');
      const res = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents/${selectedFile.path}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Edit ${selectedFile.name} via DevCollab`,
          content: btoa(unescape(encodeURIComponent(editContent))),
          sha: selectedFile.sha,
        }),
      });
      if (!res.ok) throw new Error('Failed to save file to GitHub.');
      setSaveSuccess(true);
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save file.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 min-h-0 h-full flex overflow-hidden font-sans bg-[#181A20]">
      <div className="w-80 border-r border-[#23272f] bg-[#20232A] overflow-y-auto rounded-l-lg" style={{minWidth: '320px'}}>
        <div className="p-6 border-b border-[#23272f]">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg leading-tight text-gray-100">Projects</h3>
          </div>
          <div className="p-2 space-y-1">
            {loading ? (
              <div className="text-gray-400 py-8 text-center">Loading repositories...</div>
            ) : error ? (
              <div className="text-red-400 py-8 text-center">{error}</div>
            ) : repos.length === 0 ? (
              <div className="text-gray-400 text-center">No repositories found.</div>
            ) : (
              repos.map(repo => (
                <div
                  key={repo.id}
                  className={`flex items-center py-2 px-3 hover:bg-[#2AABEE]/10 cursor-pointer rounded-md transition-colors duration-200 ${selectedRepo === repo.name ? 'bg-[#2AABEE]/20' : ''}`}
                  onClick={() => {
                    setSelectedRepo(repo.name);
                    setSelectedFile(null);
                  }}
                >
                  <FolderIcon size={16} className="text-gray-100 mr-2" />
                  <span className="font-medium leading-tight text-gray-100">{repo.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0 h-full flex flex-col overflow-hidden rounded-r-lg">
        {selectedRepo ? (
          <div className="flex-1 flex flex-col">
            <div className="bg-[#20232A] border-b border-[#23272f] p-4 text-sm font-medium leading-tight text-gray-400">
              <span>Files in <span className="text-blue-400 font-semibold">{selectedRepo}</span></span>
            </div>
            <div className="flex-1 min-h-0 overflow-auto p-8 flex">
              {/* File list */}
              <div className="w-1/3 pr-8 border-r border-[#23272f]">
                {filesLoading ? (
                  <div className="text-gray-400 text-center">Loading files...</div>
                ) : filesError ? (
                  <div className="text-red-400 text-center">{filesError}</div>
                ) : files && files.length > 0 ? (
                  <div className="space-y-2">
                    {files.map(file => (
                      <div
                        key={file.path}
                        className={`flex items-center gap-2 py-1 px-2 rounded hover:bg-[#23272f] transition-colors cursor-pointer ${selectedFile?.path === file.path ? 'bg-[#2AABEE]/20' : ''}`}
                        onClick={() => file.type === 'file' && setSelectedFile(file)}
                      >
                        {file.type === 'dir' ? <FolderIcon size={16} className="text-blue-400" /> : <FileIcon size={16} className="text-gray-300" />}
                        <span className="text-gray-100 font-mono text-sm">{file.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center">No files found in this repository.</div>
                )}
              </div>
              {/* File viewer/editor */}
              <div className="flex-1 pl-8">
                {selectedFile && selectedFile.type === 'file' ? (
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-lg font-semibold text-blue-300 font-mono">{selectedFile.name}</span>
                    </div>
                    {fileContentLoading ? (
                      <div className="text-gray-400">Loading file content...</div>
                    ) : fileContentError ? (
                      <div className="text-red-400">{fileContentError}</div>
                    ) : (
                      <Editor
                        height="600px"
                        defaultLanguage={getLanguageFromFileName(selectedFile.name)}
                        value={editContent}
                        theme="vs-dark"
                        options={{
                          readOnly: true,
                          fontSize: 16,
                          fontFamily: 'Fira Mono, Menlo, Monaco, Consolas, monospace',
                          minimap: { enabled: false },
                          scrollBeyondLastLine: false,
                          wordWrap: 'on',
                          smoothScrolling: true,
                          lineNumbers: 'on',
                          renderLineHighlight: 'all',
                        }}
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center mt-20">Select a file to view or edit</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Select a project to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

function getLanguageFromFileName(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'js': return 'javascript';
    case 'ts': return 'typescript';
    case 'tsx': return 'typescript';
    case 'py': return 'python';
    case 'json': return 'json';
    case 'md': return 'markdown';
    case 'css': return 'css';
    case 'html': return 'html';
    case 'java': return 'java';
    case 'c': return 'c';
    case 'cpp': return 'cpp';
    case 'cs': return 'csharp';
    case 'go': return 'go';
    case 'rb': return 'ruby';
    case 'php': return 'php';
    case 'sh': return 'shell';
    case 'xml': return 'xml';
    case 'yml':
    case 'yaml': return 'yaml';
    case 'txt': return 'plaintext';
    default: return 'plaintext';
  }
}

export default ProjectView;