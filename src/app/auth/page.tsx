"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/Auth";
import { supabase } from "@/lib/supabase";
import { LangGraphLogoSVG } from "@/components/icons/langgraph";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { Toaster, toast } from "sonner";
import { AUTH_CONFIG, UI_CONFIG } from "@/config";

export default function AuthPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // If authentication is not required or user is authenticated, redirect to home
    if (!AUTH_CONFIG.REQUIRE_AUTH || (isAuthenticated && !isLoading)) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleGoogleSignIn = async () => {
    if (!AUTH_CONFIG.AUTH_PROVIDERS.GOOGLE) return;
    
    try {
      setIsRedirecting(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast.error("Failed to sign in with Google", {
        description: error.message,
      });
      setIsRedirecting(false);
    }
  };

  const handleGithubSignIn = async () => {
    if (!AUTH_CONFIG.AUTH_PROVIDERS.GITHUB) return;
    
    try {
      setIsRedirecting(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast.error("Failed to sign in with GitHub", {
        description: error.message,
      });
      setIsRedirecting(false);
    }
  };

  if (isLoading || isRedirecting) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <div className="animate-spin w-8 h-8 rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Get the primary color from config for styling
  const primaryColor = UI_CONFIG.COLORS.PRIMARY;
  const secondaryColor = UI_CONFIG.COLORS.SECONDARY;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 w-full h-full bg-black/10 dark:bg-black/30 z-0" />
      <div className={`absolute -top-40 -left-40 w-80 h-80 bg-${primaryColor}-500 rounded-full filter blur-3xl opacity-20 animate-blob`} />
      <div className={`absolute -bottom-40 -right-40 w-80 h-80 bg-${secondaryColor}-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000`} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      
      <Toaster />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-background/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10">
          <div className="flex flex-col items-center space-y-2 mb-8">
            {UI_CONFIG.LOGO.USE_CUSTOM ? (
              <img 
                src={UI_CONFIG.LOGO.LIGHT} 
                alt={UI_CONFIG.APP_NAME} 
                className="h-12 mb-2 dark:hidden" 
              />
            ) : (
              <LangGraphLogoSVG className="h-12 mb-2" />
            )}
            {UI_CONFIG.LOGO.USE_CUSTOM && (
              <img 
                src={UI_CONFIG.LOGO.DARK} 
                alt={UI_CONFIG.APP_NAME} 
                className="h-12 mb-2 hidden dark:block" 
              />
            )}
            <h1 className="text-2xl font-bold tracking-tight text-center">{UI_CONFIG.APP_NAME}</h1>
            <p className="text-muted-foreground text-center">{UI_CONFIG.APP_DESCRIPTION}</p>
          </div>
          
          <div className="flex flex-col gap-4">
            {AUTH_CONFIG.AUTH_PROVIDERS.GOOGLE && (
              <Button 
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isRedirecting}
                className="relative overflow-hidden group font-medium"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </div>
              </Button>
            )}
            
            {AUTH_CONFIG.AUTH_PROVIDERS.GITHUB && (
              <Button 
                variant="outline" 
                className="relative overflow-hidden group font-medium"
                onClick={handleGithubSignIn}
                disabled={isRedirecting}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="flex items-center justify-center">
                  <GithubIcon className="mr-2 h-5 w-5" />
                  <span>Sign in with GitHub</span>
                </div>
              </Button>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mt-8 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
} 