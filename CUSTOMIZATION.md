# Cookie-Cutter Agent Chat UI with Supabase

A fully customizable chat interface for LangGraph agents with Supabase authentication. This template makes it easy to create your own branded AI chat interface with minimal code changes.

## Features

- 🔐 **Supabase Authentication**: Ready-to-use authentication with Google, GitHub or email
- 🤖 **LangGraph Integration**: Connect to any LangGraph server
- 🎨 **Easy Customization**: Central configuration file for all UI and functional aspects
- 🌓 **Light/Dark Mode**: Automatic theme switching
- 📱 **Responsive Design**: Works on all devices
- 🧩 **Feature Flags**: Enable/disable features as needed

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/agent-chat-ui.git
cd agent-chat-ui
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up Supabase

1. Create a Supabase project at [supabase.com](https://supabase.com/)
2. Get your Supabase URL and anon key from the project settings > API
3. Create a `.env.local` file based on `.env.example` and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Set up LangGraph API (optional for development)

```
NEXT_PUBLIC_API_URL=http://localhost:2024
NEXT_PUBLIC_ASSISTANT_ID=agent
```

For production, you should set up the proper environment variables as described in the "Going to Production" section.

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Customization Guide

This document explains how to customize your Cookie-Cutter Agent Chat UI.

## Configuration File

All customization is done through the central configuration file: `src/config.ts`.

## Authentication Configuration

```typescript
export const AUTH_CONFIG = {
  // Supabase configuration
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  
  // Whether authentication is required
  REQUIRE_AUTH: true,
  
  // Authentication providers to display
  AUTH_PROVIDERS: {
    GOOGLE: true,      // Enable Google OAuth login
    GITHUB: true,      // Enable GitHub OAuth login
    EMAIL_PASSWORD: false, // Set to true to enable email/password auth
  },
};
```

- Set `REQUIRE_AUTH` to `false` to make the app accessible without login
- Enable or disable authentication providers by changing their values

## LangGraph Configuration

```typescript
export const AGENT_CONFIG = {
  // Default API URL for local development
  DEFAULT_API_URL: 'http://localhost:2024',
  
  // Default assistant ID
  DEFAULT_ASSISTANT_ID: 'agent',
  
  // Environment variables (will override defaults if set)
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  ASSISTANT_ID: process.env.NEXT_PUBLIC_ASSISTANT_ID,
  
  // Production API configuration
  LANGGRAPH_API_URL: process.env.LANGGRAPH_API_URL,
  LANGSMITH_API_KEY: process.env.LANGSMITH_API_KEY,
};
```

- Change `DEFAULT_API_URL` and `DEFAULT_ASSISTANT_ID` to your preferred defaults

## UI Configuration

```typescript
export const UI_CONFIG = {
  // Application branding
  APP_NAME: 'Agent Chat UI',
  APP_DESCRIPTION: 'Interact with intelligent agents powered by LangGraph',
  
  // Theme colors
  COLORS: {
    PRIMARY: 'purple', // Main brand color
    SECONDARY: 'blue',  // Secondary color for accents
    ACCENT: 'green',    // Highlight color
  },
  
  // Button styling - default Tailwind button variants
  BUTTONS: {
    PRIMARY_BUTTON: 'default',
    SECONDARY_BUTTON: 'outline',
    CANCEL_BUTTON: 'secondary',
  },
  
  // Logo configuration - set USE_CUSTOM to true to use your own logo
  LOGO: {
    USE_CUSTOM: false,
    LIGHT: '/logo-light.svg', // Logo for light mode
    DARK: '/logo-dark.svg',   // Logo for dark mode
  },
  
  // Chat interface configuration
  CHAT: {
    DEFAULT_MESSAGE: 'How can I help you today?',
    PLACEHOLDER: 'Type your message...',
    SHOW_TIMESTAMPS: true,
    SHOW_AGENT_TYPING: true,
    MAX_MESSAGES: 100, // Maximum messages to show
  },
};
```

- Change the application name, description, and accent colors
- Customize button styles using Tailwind's button variants:
  - Options: 'default', 'secondary', 'outline', 'ghost', 'link'
- Add your own logo by setting `USE_CUSTOM` to `true` and providing paths to your logo files
- Customize chat interface elements

## Feature Flags

```typescript
export const FEATURES = {
  // Enable/disable features
  CHAT_HISTORY: true,  // Conversation history panel
  ARTIFACT_PANEL: true, // Side panel for displaying content
  THREAD_NAMING: true,  // Allow naming of chat threads
  EXPORT_CHAT: false,   // Chat export functionality
  DEVELOPER_MODE: false, // Debug information
};
```

- Enable or disable specific features by changing their values

## Deployment

For production deployment, update your environment variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# LangGraph Configuration
NEXT_PUBLIC_ASSISTANT_ID="agent"
LANGGRAPH_API_URL="https://my-agent.default.us.langgraph.app"
NEXT_PUBLIC_API_URL="https://my-website.com/api"
LANGSMITH_API_KEY="lsv2_..."
```

Build and deploy as a standard Next.js application:

```bash
npm run build
npm run start
```

## License

[MIT](LICENSE)

## Acknowledgements

This project is based on the [Agent Chat UI](https://github.com/langchain-ai/agent-chat-ui) by LangChain AI, modified to be a cookie-cutter template with central configuration. 