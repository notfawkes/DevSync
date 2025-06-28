import React from 'react';
import { GithubIcon, MessageSquareIcon, UsersIcon, CodeIcon, ZapIcon, ShieldIcon, BellIcon, LayersIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <MessageSquareIcon className="text-blue-400" size={28} />,
    title: 'Real-time Collaboration',
    desc: 'Chat, share code, and discuss issues instantly with your team, right alongside your GitHub repositories.'
  },
  {
    icon: <UsersIcon className="text-green-400" size={28} />,
    title: 'Team Management',
    desc: 'Organize teams, assign roles, and keep everyone in sync with project updates and notifications.'
  },
  {
    icon: <CodeIcon className="text-orange-400" size={28} />,
    title: 'Contextual Code Discussions',
    desc: 'Discuss code with context, link to PRs, issues, and files directly from chat.'
  },
  {
    icon: <ZapIcon className="text-yellow-400" size={28} />,
    title: 'Lightning Fast',
    desc: 'Built with Vite, React, and Supabase for a snappy, modern experience.'
  },
  {
    icon: <ShieldIcon className="text-purple-400" size={28} />,
    title: 'Secure by Design',
    desc: 'OAuth with GitHub, encrypted data, and privacy-first architecture.'
  },
  {
    icon: <BellIcon className="text-pink-400" size={28} />,
    title: 'Smart Notifications',
    desc: 'Never miss a mention, PR, or issue update. Customizable notifications keep you in the loop.'
  },
  {
    icon: <LayersIcon className="text-cyan-400" size={28} />,
    title: 'Project Overview',
    desc: 'See all your repositories, teams, and discussions in one unified dashboard.'
  }
];

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181A20] via-[#181A20]/90 to-[#23272f] text-gray-100 font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <MessageSquareIcon className="text-blue-400" size={28} />
          <span className="font-bold text-2xl tracking-tight">DevCollab</span>
        </div>
        <div className="hidden md:flex gap-8 text-gray-300 font-medium">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how" className="hover:text-white transition">How it works</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </div>
        <button
          onClick={() => navigate('/signin')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition"
        >
          <GithubIcon size={20} /> Authorize with GitHub
        </button>
      </nav>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
          Supercharge your GitHub collaboration
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-10">
          DevCollab brings real-time chat, team management, and contextual code discussions to your GitHub workflow. Collaborate, communicate, and ship faster—all in one place.
        </p>
        <button
          onClick={() => navigate('/signin')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl transition mb-4"
        >
          <GithubIcon size={24} /> Get Started with GitHub
        </button>
        <span className="text-gray-400 text-sm">Free for open source teams • No credit card required</span>
      </section>
      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why DevCollab?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div key={i} className="bg-[#23272f] rounded-2xl p-8 shadow-lg flex flex-col items-start gap-4 hover:scale-[1.03] transition-transform">
              {f.icon}
              <h3 className="text-xl font-semibold text-white">{f.title}</h3>
              <p className="text-gray-300 text-base">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to boost your team's productivity?</h2>
        <button
          onClick={() => navigate('/signin')}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition mx-auto"
        >
          <GithubIcon size={24} /> Start with GitHub
        </button>
        <p className="text-gray-400 mt-4">Join open source teams and organizations using DevCollab today.</p>
      </section>
      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} DevCollab. Built for developers, by developers.
      </footer>
    </div>
  );
};

export default Landing; 