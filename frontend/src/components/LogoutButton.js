"use client";

import { useSession, signOut } from "next-auth/react";

const LogoutButton = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    if (!session?.id_token) return;
    await signOut({ redirect: false });

    const baseLogoutUrl = process.env.NEXT_PUBLIC_LOGOUT_URL; // e.g. https://auth.example.com/realms/cloud/protocol/openid-connect/logout
    if (!baseLogoutUrl) {
      console.error("Missing NEXT_PUBLIC_LOGOUT_URL env var");
      return;
    }

    const url = new URL(baseLogoutUrl);
    url.searchParams.set("id_token_hint", session.id_token);
    const redirectUri = process.env.NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI;
    url.searchParams.set("post_logout_redirect_uri", redirectUri);
    window.location.href = url.toString();
  };

  return (
    <button
      onClick={handleLogout}
      className="border border-red-800 hover:border-red-600 px-4 py-2 rounded-md text-sm text-gray-300 cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
