export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Dark mode colors
        dark: {
          background: '#0D1117',
          panel: '#161B22',
          primary: '#58A6FF',
          secondary: '#3FB950',
          error: '#F85149',
          mention: '#D29922',
          text: '#C9D1D9',
          textSecondary: '#8B949E',
          border: '#30363D',
          online: '#2EA043',
        },
        // Light mode colors (updated)
        light: {
          background: '#F6F8FA', // Soft, clean off-white
          panel: '#FFFFFF', // Pure white for containers
          text: '#1F2328', // Deep neutral black
          textSecondary: '#57606A', // Muted gray
          accentBlue: '#0969DA', // GitHub link blue
          success: '#2DA44E', // GitHub green
          danger: '#CF222E', // GitHub red
          mention: '#BF8700', // Rich golden yellow
          border: '#D0D7DE', // Subtle neutral gray
          inputBg: '#FFFFFF',
          inputBorder: '#D0D7DE',
          sidebar: '#F6F8FA',
          hover: '#EAEFFF',
          buttonPrimaryBg: '#0969DA',
          buttonPrimaryText: '#FFFFFF',
          buttonSecondaryBg: 'transparent',
          buttonSecondaryText: '#57606A',
          buttonSecondaryBorder: '#D0D7DE',
          codeBlockBg: '#F6F8FA',
          codeBlockText: '#24292F',
          codeBlockBorder: '#D0D7DE',
        },
      },
    },
  },
  plugins: [],
}