import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, MessageSquareIcon, FolderIcon, SettingsIcon, LogOutIcon } from 'lucide-react';

interface SidebarProps {
  darkMode: boolean;
  onSignOut: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, onSignOut }) => {
  return (
    <div className={`w-64 flex flex-col h-full bg-[#20232A] border-r border-[#23272f] text-gray-100 font-sans`} style={{minWidth: '256px'}}>
      <div className="p-6 border-b border-[#23272f] flex items-center justify-center">
        <span className="font-bold text-xl tracking-tight">DevCollab</span>
      </div>
      <nav className="flex-1 pt-6 space-y-2">
        <NavLinkItem to="/dashboard" icon={<HomeIcon size={20} />} label="Repositories" />
        <NavLinkItem to="/dashboard/chat/general" icon={<MessageSquareIcon size={20} />} label="Chat" />
        <NavLinkItem to="/dashboard/project/current" icon={<FolderIcon size={20} />} label="Projects" />
        <NavLinkItem to="/dashboard/settings" icon={<SettingsIcon size={20} />} label="Settings" />
      </nav>
      <div className="p-6 border-t border-[#23272f]">
        <button 
          onClick={onSignOut}
          className="flex items-center w-full py-2 px-4 rounded-md font-medium text-gray-400 hover:text-white hover:bg-[#23272f] transition-colors"
        >
          <LogOutIcon size={20} />
          <span className="ml-2">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

interface NavLinkItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}
const NavLinkItem: React.FC<NavLinkItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-2 px-6 rounded-md font-medium transition-colors text-base ` +
        (isActive
          ? 'bg-[#23272f] text-white'
          : 'text-gray-400 hover:text-white hover:bg-[#23272f]')
      }
      end={to === '/dashboard'}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </NavLink>
  );
};

export default Sidebar;