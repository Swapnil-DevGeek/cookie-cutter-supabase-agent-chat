"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { LangGraphLogoSVG } from "@/components/icons/langgraph";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/Auth";
import { LogOut } from "lucide-react";
import { UI_CONFIG, AUTH_CONFIG } from "@/config";

export default function WelcomePage(): React.ReactNode {
  const router = useRouter();
  const { isAuthenticated, isLoading, signOut, user } = useAuth();

  const handleGoToChat = () => {
    router.push("/chat");
  };

  const handleGoToAuth = () => {
    router.push("/auth");
  };

  if (isLoading) {
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
    <React.Suspense fallback={<div>Loading (layout)...</div>}>
      <Toaster />
      <div className="flex min-h-screen w-full items-center justify-center p-4">
        <div className="animate-in fade-in-0 zoom-in-95 bg-background flex max-w-3xl flex-col rounded-lg border shadow-lg">
          <div className="flex flex-col items-center space-y-4 p-12">
            {UI_CONFIG.LOGO.USE_CUSTOM ? (
              <img 
                src={UI_CONFIG.LOGO.LIGHT} 
                alt={UI_CONFIG.APP_NAME} 
                className="h-14 mb-2 dark:hidden" 
              />
            ) : (
              <LangGraphLogoSVG className="h-14 mb-2" />
            )}
            {UI_CONFIG.LOGO.USE_CUSTOM && (
              <img 
                src={UI_CONFIG.LOGO.DARK} 
                alt={UI_CONFIG.APP_NAME} 
                className="h-14 mb-2 hidden dark:block" 
              />
            )}
            <h1 className="text-3xl font-bold tracking-tight text-center">
              {UI_CONFIG.APP_NAME}
            </h1>
            <p className="text-muted-foreground text-center max-w-lg">
              {UI_CONFIG.APP_DESCRIPTION}
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Button 
                variant="default"
                size="lg" 
                onClick={handleGoToChat}
                className="font-medium"
              >
                Start Chatting
              </Button>
              
              {AUTH_CONFIG.REQUIRE_AUTH && !isAuthenticated && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleGoToAuth}
                  className="font-medium"
                >
                  Sign In
                </Button>
              )}
              
              {isAuthenticated && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={signOut}
                  className="font-medium"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Suspense>
  );
}
