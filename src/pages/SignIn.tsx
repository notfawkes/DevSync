import React from 'react';
import { GithubIcon, MessageSquareIcon, UsersIcon, CodeIcon, ZapIcon, ShieldIcon, BellIcon, LayersIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';

const features = [
  {
    icon: <MessageSquareIcon className="text-blue-400" size={28} />,
    title: 'Real-time Collaboration',
    desc: 'Chat, share code, and discuss issues instantly with your team, right alongside your GitHub repositories.',
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <UsersIcon className="text-green-400" size={28} />,
    title: 'Team Management',
    desc: 'Organize teams, assign roles, and keep everyone in sync with project updates and notifications.',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <CodeIcon className="text-orange-400" size={28} />,
    title: 'Contextual Code Discussions',
    desc: 'Discuss code with context, link to PRs, issues, and files directly from chat.',
    img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <ZapIcon className="text-yellow-400" size={28} />,
    title: 'Lightning Fast',
    desc: 'Built with Vite, React, and Supabase for a snappy, modern experience.',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <ShieldIcon className="text-purple-400" size={28} />,
    title: 'Secure by Design',
    desc: 'OAuth with GitHub, encrypted data, and privacy-first architecture.',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <BellIcon className="text-pink-400" size={28} />,
    title: 'Smart Notifications',
    desc: 'Never miss a mention, PR, or issue update. Customizable notifications keep you in the loop.',
    img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80'
  },
  {
    icon: <LayersIcon className="text-cyan-400" size={28} />,
    title: 'Project Overview',
    desc: 'See all your repositories, teams, and discussions in one unified dashboard.',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  }
];

const trustedBy = [
  'facebook', 'tinder', 'airbnb', 'HubSpot', 'amazon'
];

const SignIn: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGitHubSignIn = async () => {
    setError(null);
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + '/dashboard',
        scopes: 'read:user user:email'
      }
    });
    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
    // Supabase will redirect automatically on success
  };

  return (
    <div className="min-h-screen bg-[#10182a] text-gray-100 font-sans relative overflow-x-hidden">
      {/* Subtle abstract shapes */}
      <div className="pointer-events-none select-none fixed inset-0 z-0">
        <div className="absolute left-[-120px] top-[-80px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-700/40 via-blue-500/20 to-purple-600/10 opacity-60 blur-2xl" />
        <div className="absolute right-[-120px] top-[-60px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-700/40 via-blue-500/20 to-blue-600/10 opacity-60 blur-2xl" />
        <div className="absolute right-[-100px] bottom-[-100px] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-blue-700/30 via-blue-500/10 to-purple-600/10 opacity-40 blur-2xl" />
      </div>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto z-10 relative">
        <div className="flex items-center gap-3">
          <MessageSquareIcon className="text-blue-400" size={28} />
          <span className="font-bold text-2xl tracking-tight">DevCollab</span>
        </div>
        <div className="hidden md:flex gap-8 text-gray-400 font-medium">
          <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
          <a href="#how" className="hover:text-white transition-colors duration-200">How it works</a>
          <a href="#pricing" className="hover:text-white transition-colors duration-200">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors duration-200">FAQ</a>
        </div>
        <button
          onClick={handleGitHubSignIn}
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          Get Started
        </button>
      </nav>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 py-24 px-4 relative z-10">
        <div className="flex-1 flex flex-col items-start text-left">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-900/40 text-blue-200 text-sm font-semibold tracking-wide shadow">Now in Public Beta</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
            Where teams build <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">better software</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            DevCollab brings real-time chat, code discussions, and seamless GitHub integration to your team. Collaborate, communicate, and ship faster—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
            <button
              onClick={handleGitHubSignIn}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-bold text-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <GithubIcon size={22} /> {isLoading ? 'Authorizing...' : 'Sign in with GitHub'}
            </button>
            <a
              href="#features"
              className="flex-1 flex items-center justify-center gap-2 bg-[#23272f] hover:bg-[#23272f]/80 text-gray-200 px-8 py-3 rounded-lg font-bold text-lg shadow transition-all duration-200"
            >
              Explore Features
            </a>
          </div>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </section>
      {/* Trusted By Logos */}
      <section className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-10 py-8 mb-8 opacity-80 border-t border-b border-[#23272f]/60">
        {trustedBy.map((brand, i) => (
          <span key={i} className="text-gray-400 text-xl font-semibold tracking-wide opacity-70 hover:opacity-100 transition select-none uppercase" style={{letterSpacing: '0.04em'}}>{brand}</span>
        ))}
      </section>
      {/* Focus Section */}
      <section className="max-w-5xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-white">Focus on what matters—collaboration, not configuration</h2>
      </section>
      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">Why DevCollab?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden shadow-lg group border border-[#23272f]/60 bg-[#23272f]/90 backdrop-blur-[6px] transition-all duration-200 hover:scale-[1.025]"
              style={{ minHeight: 260 }}
            >
              <img
                src={f.img}
                alt="feature background"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-25 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#181A20]/85 backdrop-blur-[6px]" />
              <div className="relative z-10 p-8 flex flex-col items-start gap-4 h-full">
                {f.icon}
                <h3 className="text-xl font-semibold text-white drop-shadow-lg tracking-tight">{f.title}</h3>
                <p className="text-gray-300 text-base drop-shadow-lg leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Ready to transform your team's workflow?</h2>
        <button
          onClick={handleGitHubSignIn}
          disabled={isLoading}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-200 mx-auto focus:outline-none focus:ring-2 focus:ring-blue-500/40"
        >
          <GithubIcon size={24} /> {isLoading ? 'Authorizing...' : 'Start with GitHub'}
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

export default SignIn;