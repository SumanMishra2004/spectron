'use server';

import { signIn, signOut } from "next-auth/react";

// These are just exports for client components
// The actual auth is handled by NextAuth
export { signIn as signInWithGoogle, signOut as signOutAction };
