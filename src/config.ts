/**
 * Cookie-Cutter Agent Chat UI with Supabase
 * 
 * Global configuration file - modify this file to customize all aspects of the application.
 * 
 * For detailed setup and customization guides, see CUSTOMIZATION.md
 */

/**
 * Authentication configuration
 * Controls how users authenticate with your application
 */
export const AUTH_CONFIG = {
  // Supabase configuration - add your Supabase URL and anon key from your project
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  
  // Whether authentication is required to use the application
  // Set to false to allow users to chat without logging in
  REQUIRE_AUTH: true,
  
  // Authentication providers to display on the login page
  AUTH_PROVIDERS: {
    GOOGLE: true,      // Enable Google OAuth login
    GITHUB: true,      // Enable GitHub OAuth login
    EMAIL_PASSWORD: false, // Set to true to enable email/password login
  },
};

/**
 * LangGraph/Agent configuration
 * Controls how the application connects to LangGraph
 */
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

/**
 * UI Configuration
 * Customize the look and feel of your application
 */
export const UI_CONFIG = {
  // Application branding
  APP_NAME: 'Agent Chat UI',
  APP_DESCRIPTION: 'Interact with intelligent agents powered by LangGraph',
  
  // Theme colors - used for decorative elements and backgrounds
  // It's recommended to use standard Tailwind color names:
  // 'purple', 'blue', 'green', 'red', 'yellow', 'indigo', 'pink', etc.
  COLORS: {
    PRIMARY: 'purple', // Main brand color
    SECONDARY: 'blue',  // Secondary color for accents
    ACCENT: 'green',    // Highlight color
  },
  
  // Button styling - default Tailwind button variants
  // Options: 'default', 'secondary', 'outline', 'ghost', 'link'
  BUTTONS: {
    PRIMARY_BUTTON: 'default',
    SECONDARY_BUTTON: 'outline',
    CANCEL_BUTTON: 'secondary',
  },
  
  // Logo configuration - set USE_CUSTOM to true to use your own logo
  // Place your logo files in the public directory
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
    MAX_MESSAGES: 100, // Maximum number of messages to show in the chat
  },
};

/**
 * Feature flags
 * Enable or disable specific features
 */
export const FEATURES = {
  // Chat history panel showing previous conversations
  CHAT_HISTORY: true,
  
  // Artifact panel for displaying additional content
  ARTIFACT_PANEL: true,
  
  // Allow naming of chat threads
  THREAD_NAMING: true,
  
  // Allow exporting chat history
  EXPORT_CHAT: false,
  
  // Show debug information for developers
  DEVELOPER_MODE: false,
}; 