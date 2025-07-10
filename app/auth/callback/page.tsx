"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { handleGoogleCallback, setUserSession } from "@/lib/auth";

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");

        if (!code || !state) {
          throw new Error("Missing authorization code or state");
        }

        const user = await handleGoogleCallback(code, state);
        setUserSession(user);
        setStatus("success");

        // Redirect based on user type
        if (typeof window !== "undefined") {
          setTimeout(() => {
            if (user.userType === "owner") {
              window.location.href = "/owner-dashboard";
            } else {
              window.location.href = "/venues";
            }
          }, 2000);
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        setStatus("error");
      }
    };

    processCallback();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {status === "loading" && "Completing Sign In..."}
            {status === "success" && "Sign In Successful!"}
            {status === "error" && "Sign In Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {status === "loading" && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">
                Please wait while we complete your sign in...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground">
                Redirecting you to your dashboard...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground">
                Something went wrong. Please try signing in again.
              </p>
              <a href="/login" className="text-primary hover:underline">
                Back to Sign In
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
