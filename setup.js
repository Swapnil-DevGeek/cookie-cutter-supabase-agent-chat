#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ASCII art banner
console.log(`
┌───────────────────────────────────────────────┐
│                                               │
│      Cookie-Cutter Agent Chat UI Setup        │
│                                               │
└───────────────────────────────────────────────┘
`);

console.log('This script will help you set up your Cookie-Cutter Agent Chat UI.\n');

// Function to ask a question and get user input
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Function to copy .env.example to .env.local
function copyEnvFile() {
  try {
    if (!fs.existsSync('.env.local')) {
      fs.copyFileSync('.env.example', '.env.local');
      console.log('✅ Created .env.local file');
    } else {
      console.log('ℹ️ .env.local file already exists, skipping creation');
    }
  } catch (error) {
    console.error('❌ Error creating .env.local file:', error.message);
  }
}

// Function to update the .env.local file
function updateEnvFile(key, value) {
  try {
    const envPath = '.env.local';
    let content = '';
    
    if (fs.existsSync(envPath)) {
      content = fs.readFileSync(envPath, 'utf8');
    }
    
    // Replace existing key or add new one
    const regex = new RegExp(`^${key}=.*`, 'm');
    if (regex.test(content)) {
      content = content.replace(regex, `${key}=${value}`);
    } else {
      content += `\n${key}=${value}`;
    }
    
    fs.writeFileSync(envPath, content);
    console.log(`✅ Updated ${key} in .env.local`);
  } catch (error) {
    console.error(`❌ Error updating ${key} in .env.local:`, error.message);
  }
}

// Function to update config.ts
function updateConfig(key, subKey, value) {
  try {
    const configPath = path.join('src', 'config.ts');
    let content = fs.readFileSync(configPath, 'utf8');
    
    // Simple string replacement (not a full parser)
    // This is a basic implementation - for complex changes, consider using a TS parser
    
    if (key === 'APP_NAME') {
      content = content.replace(/APP_NAME: ['"].*?['"]/g, `APP_NAME: '${value}'`);
    }
    else if (key === 'APP_DESCRIPTION') {
      content = content.replace(/APP_DESCRIPTION: ['"].*?['"]/g, `APP_DESCRIPTION: '${value}'`);
    }
    else if (key === 'COLORS' && subKey) {
      content = content.replace(new RegExp(`${subKey}: ['"].*?['"]`), `${subKey}: '${value}'`);
    }
    else if (key === 'BUTTONS' && subKey) {
      content = content.replace(new RegExp(`${subKey}: ['"].*?['"]`), `${subKey}: '${value}'`);
    }
    else if (key === 'REQUIRE_AUTH') {
      content = content.replace(/REQUIRE_AUTH: (true|false)/g, `REQUIRE_AUTH: ${value}`);
    }
    
    fs.writeFileSync(configPath, content);
    console.log(`✅ Updated ${key}${subKey ? '.' + subKey : ''} in config.ts`);
  } catch (error) {
    console.error(`❌ Error updating config.ts:`, error.message);
  }
}

async function main() {
  try {
    // Copy .env.example to .env.local if it doesn't exist
    copyEnvFile();
    
    // Ask for Supabase credentials
    console.log('\n📋 Supabase Configuration:');
    const supabaseUrl = await ask('Enter your Supabase URL: ');
    const supabaseAnonKey = await ask('Enter your Supabase Anon Key: ');
    
    // Update .env.local with Supabase credentials
    if (supabaseUrl) updateEnvFile('NEXT_PUBLIC_SUPABASE_URL', supabaseUrl);
    if (supabaseAnonKey) updateEnvFile('NEXT_PUBLIC_SUPABASE_ANON_KEY', supabaseAnonKey);
    
    // Ask for basic UI customization
    console.log('\n📋 Basic UI Customization:');
    const appName = await ask('Enter your application name (default: Agent Chat UI): ');
    const appDesc = await ask('Enter your application description (default: keep existing): ');
    const primaryColor = await ask('Enter your primary color (e.g., purple, blue, green - default: purple): ');
    
    // Ask for authentication settings
    console.log('\n📋 Authentication Settings:');
    const requireAuth = await ask('Require authentication? (yes/no - default: yes): ');
    
    // Update config.ts with customizations
    if (appName) updateConfig('APP_NAME', null, appName);
    if (appDesc) updateConfig('APP_DESCRIPTION', null, appDesc);
    if (primaryColor) updateConfig('COLORS', 'PRIMARY', primaryColor);
    if (requireAuth && requireAuth.toLowerCase() === 'no') updateConfig('REQUIRE_AUTH', null, 'false');
    
    console.log('\n🎉 Setup completed! You can now run the development server:');
    console.log('\nnpm run dev');
    console.log('# or');
    console.log('yarn dev');
    console.log('# or');
    console.log('pnpm dev\n');
    
    console.log('For more customization options, check out src/config.ts and CUSTOMIZATION.md');
  } catch (error) {
    console.error('❌ Error during setup:', error.message);
  } finally {
    rl.close();
  }
}

main(); 