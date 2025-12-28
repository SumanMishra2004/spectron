'use server';

import { signIn } from "@/lib/auth-config";
import { redirect } from "next/navigation";

export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/' });
}

export async function signOutAction() {
  await signIn('google', { redirectTo: '/auth/signout' });
}
