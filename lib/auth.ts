// Google OAuth configuration
export const googleAuthConfig = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || `${window.location.origin}/auth/callback`,
  scope: "openid email profile",
}

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture: string
  given_name: string
  family_name: string
}

export interface AuthUser extends GoogleUser {
  userType: "customer" | "owner"
  venueDetails?: {
    venueName: string
    venueLocation: string
    contactPhone: string
    description: string
  }
}

// Simulate Google OAuth flow (replace with actual implementation)
export const initiateGoogleAuth = (userType: "customer" | "owner") => {
  // In a real implementation, this would redirect to Google OAuth
  const authUrl =
    `https://accounts.google.com/oauth/authorize?` +
    `client_id=${googleAuthConfig.clientId}&` +
    `redirect_uri=${googleAuthConfig.redirectUri}&` +
    `scope=${googleAuthConfig.scope}&` +
    `response_type=code&` +
    `state=${userType}`

  // For demo purposes, we'll simulate the flow
  console.log("Would redirect to:", authUrl)
  return authUrl
}

// Handle OAuth callback
export const handleGoogleCallback = async (code: string, state: string): Promise<AuthUser> => {
  // In a real implementation, exchange code for tokens and get user info
  const mockUser: AuthUser = {
    id: "123456789",
    email: "user@example.com",
    name: "John Doe",
    picture: "https://via.placeholder.com/150",
    given_name: "John",
    family_name: "Doe",
    userType: state as "customer" | "owner",
  }

  return mockUser
}

// Store user session (replace with your preferred session management)
export const setUserSession = (user: AuthUser) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user))
  }
}

// Get current user session
export const getUserSession = (): AuthUser | null => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user")
    return userStr ? JSON.parse(userStr) : null
  }
  return null
}

// Clear user session
export const clearUserSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
}
