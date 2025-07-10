"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState({
    venueName: "",
    venueLocation: "",
    contactPhone: "",
    description: "",
  });

  const handleGoogleSignup = async (userType: "customer" | "owner") => {
    setIsLoading(true);
    try {
      // In a real app, this would redirect to Google OAuth
      console.log(`Google signup for ${userType}`);

      // Simulate OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (userType === "owner") {
        alert(
          "Owner registration successful! Please complete your venue details."
        );
        // In a real app, you'd redirect to a venue setup page
      } else {
        alert(
          "Customer registration successful! Welcome to Wedding Venues Kigali!"
        );
        if (typeof window !== "undefined") {
          window.location.href = "/venues";
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOwnerDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Owner details:", ownerDetails);
    alert("Venue details saved! Your account is now complete.");
    if (typeof window !== "undefined") {
      window.location.href = "/owner-dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                WV
              </span>
            </div>
            <span className="text-xl font-bold">Wedding Venues Kigali</span>
          </div>
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="text-muted-foreground">
            Join us with your Google account
          </p>
        </div>

        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="owner">Venue Owner</TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <Card>
              <CardHeader>
                <CardTitle>Customer Registration</CardTitle>
                <CardDescription>
                  Create an account to book wedding venues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => handleGoogleSignup("customer")}
                  className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
                  {isLoading ? "Creating account..." : "Sign up with Google"}
                </Button>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        What you get:
                      </h3>
                      <ul className="mt-1 text-sm text-green-700 list-disc list-inside">
                        <li>Browse all wedding venues</li>
                        <li>Submit booking requests</li>
                        <li>Track booking status</li>
                        <li>Save favorite venues</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>
                    By signing up, you agree to our Terms of Service and Privacy
                    Policy
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="owner">
            <Card>
              <CardHeader>
                <CardTitle>Venue Owner Registration</CardTitle>
                <CardDescription>
                  List your venue and manage bookings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => handleGoogleSignup("owner")}
                  className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
                  {isLoading ? "Creating account..." : "Sign up with Google"}
                </Button>

                {/* Venue Details Form (shown after Google signup) */}
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-3">
                    Complete Your Venue Profile
                  </h3>
                  <form
                    onSubmit={handleOwnerDetailsSubmit}
                    className="space-y-3"
                  >
                    <div>
                      <Label htmlFor="venue-name" className="text-xs">
                        Venue Name
                      </Label>
                      <Input
                        id="venue-name"
                        placeholder="e.g., Kigali Grand Hotel"
                        value={ownerDetails.venueName}
                        onChange={(e) =>
                          setOwnerDetails({
                            ...ownerDetails,
                            venueName: e.target.value,
                          })
                        }
                        className="h-9"
                      />
                    </div>
                    <div>
                      <Label htmlFor="venue-location" className="text-xs">
                        Location
                      </Label>
                      <Input
                        id="venue-location"
                        placeholder="e.g., Kimihurura, Kigali"
                        value={ownerDetails.venueLocation}
                        onChange={(e) =>
                          setOwnerDetails({
                            ...ownerDetails,
                            venueLocation: e.target.value,
                          })
                        }
                        className="h-9"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone" className="text-xs">
                        Contact Phone
                      </Label>
                      <Input
                        id="contact-phone"
                        placeholder="+250 788 123 456"
                        value={ownerDetails.contactPhone}
                        onChange={(e) =>
                          setOwnerDetails({
                            ...ownerDetails,
                            contactPhone: e.target.value,
                          })
                        }
                        className="h-9"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description" className="text-xs">
                        Brief Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your venue..."
                        value={ownerDetails.description}
                        onChange={(e) =>
                          setOwnerDetails({
                            ...ownerDetails,
                            description: e.target.value,
                          })
                        }
                        className="h-20 text-sm"
                      />
                    </div>
                    <Button type="submit" size="sm" className="w-full">
                      Complete Registration
                    </Button>
                  </form>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-4 w-4 text-blue-400 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-2">
                      <h3 className="text-xs font-medium text-blue-800">
                        Owner Benefits:
                      </h3>
                      <ul className="mt-1 text-xs text-blue-700 list-disc list-inside">
                        <li>Manage booking requests</li>
                        <li>Set venue availability</li>
                        <li>Track revenue & analytics</li>
                        <li>Direct customer communication</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
