import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, MessageSquareIcon, FolderIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
const Sidebar: React.FC = () => {
  return <div className="w-16 md:w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700 flex items-center justify-center md:justify-start">
        <span className="hidden md:block font-bold text-lg">DevCollab</span>
      </div>
      <nav className="flex-1 pt-4">
        <NavLinkItem to="/dashboard" icon={<HomeIcon size={20} />} label="Repositories" />
        <NavLinkItem to="/dashboard/chat/general" icon={<MessageSquareIcon size={20} />} label="Chat" />
        <NavLinkItem to="/dashboard/project/current" icon={<FolderIcon size={20} />} label="Projects" />
        <NavLinkItem to="/dashboard/settings" icon={<SettingsIcon size={20} />} label="Settings" />
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center justify-center md:justify-start w-full text-gray-400 hover:text-white py-2 px-4 rounded-md transition-colors">
          <LogOutIcon size={20} />
          <span className="ml-2 hidden md:block">Sign Out</span>
        </button>
      </div>
    </div>;
};
interface NavLinkItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}
const NavLinkItem: React.FC<NavLinkItemProps> = ({
  to,
  icon,
  label
}) => {
  return <NavLink to={to} className={({
    isActive
  }) => `flex items-center justify-center md:justify-start py-2 px-4 mx-2 my-1 rounded-md transition-colors ${isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`} end={to === '/dashboard'}>
      {icon}
      <span className="ml-2 hidden md:block">{label}</span>
    </NavLink>;
};
export default Sidebar;