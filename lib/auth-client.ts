import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // The base URL is optional if you're using the same domain
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
}); 