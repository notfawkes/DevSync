# DevCollab - GitHub Chat Application

A real-time chat and collaboration platform that integrates with GitHub repositories.

## Features

- 🔐 GitHub OAuth Authentication
- 💬 Real-time chat for repositories
- 📁 Project file viewer
- 🌙 Dark/Light mode toggle
- 👥 Team collaboration tools

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account
- GitHub OAuth App

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Supabase Configuration

1. Create a new project at [Supabase](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env` file in the root directory with:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. GitHub OAuth Setup

1. Go to your GitHub account settings
2. Navigate to Developer settings > OAuth Apps
3. Create a new OAuth App with:
   - **Application name**: DevCollab
   - **Homepage URL**: `http://localhost:5173` (for development)
   - **Authorization callback URL**: `http://localhost:5173/auth/callback`
4. Copy the Client ID and Client Secret

### 4. Configure Supabase Auth

1. In your Supabase dashboard, go to Authentication > Providers
2. Enable GitHub provider
3. Add your GitHub OAuth App credentials:
   - Client ID: Your GitHub OAuth App Client ID
   - Client Secret: Your GitHub OAuth App Client Secret
4. Set the redirect URL to: `http://localhost:5173/auth/callback`

### 5. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Click "Authorize with GitHub" on the sign-in page
2. Complete GitHub OAuth flow
3. You'll be redirected to the dashboard
4. Use the sidebar to navigate between repositories, chat, and projects
5. Click "Sign Out" to log out

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase (Auth & Database)
- React Router DOM
- Lucide React Icons
