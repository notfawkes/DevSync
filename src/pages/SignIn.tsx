import React from 'react';
import { GithubIcon, MessageSquareIcon, GitBranchIcon, UsersIcon, CodeIcon } from 'lucide-react';
interface SignInProps {
  onSignIn: () => void;
}
const SignIn: React.FC<SignInProps> = ({
  onSignIn
}) => {
  return <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <MessageSquareIcon className="text-blue-500" size={24} />
            <span className="text-white font-bold text-xl">DevCollab</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#team" className="hover:text-white transition-colors">
              Team
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Where Development
              <br />
              Meets Discussion
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              DevCollab enhances GitHub with real-time chat and collaboration
              tools, making team development smoother and more efficient.
            </p>
            <button onClick={onSignIn} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium flex items-center justify-center space-x-2 w-full sm:w-auto transition-colors">
              <GithubIcon size={20} />
              <span>Sign in with GitHub</span>
            </button>
          </div>
          {/* Right Column */}
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
              Why developers choose DevCollab
            </h2>
            <div className="space-y-6">
              <Feature icon={<MessageSquareIcon className="text-blue-500" />} title="Real-time Collaboration" description="Chat with your team directly in the context of your repositories" />
              <Feature icon={<GitBranchIcon className="text-green-500" />} title="Seamless GitHub Integration" description="Works directly with your GitHub repositories and workflow" />
              <Feature icon={<UsersIcon className="text-purple-500" />} title="Team Coordination" description="Reduce merge conflicts through better communication" />
              <Feature icon={<CodeIcon className="text-orange-500" />} title="Code Discussions" description="Share and discuss code snippets in real-time" />
            </div>
          </div>
        </div>
        {/* Trust Bar */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-6">Trusted by developers from</p>
          <div className="flex justify-center items-center space-x-12 opacity-75">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" alt="Google" className="h-8 grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Microsoft_Office_365_logo.svg/2048px-Microsoft_Office_365_logo.svg.png" alt="Microsoft" className="h-8 grayscale" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Meta-Logo.svg/2560px-Meta-Logo.svg.png" alt="Meta" className="h-8 grayscale" />
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Developer API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Partners
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Atom
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Electron
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const Feature: React.FC<FeatureProps> = ({
  icon,
  title,
  description
}) => {
  return <div className="flex items-start space-x-4">
      <div className="bg-gray-800 p-2 rounded-lg">{icon}</div>
      <div>
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>;
};
export default SignIn;