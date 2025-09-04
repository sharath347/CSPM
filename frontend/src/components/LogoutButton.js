"use client";

import { useSession, signOut } from "next-auth/react";

const LogoutButton = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    if (!session?.id_token) return;
    await signOut({ redirect: false });

    const logoutUrl = `http://localhost:9000/realms/cloud/protocol/openid-connect/logout?id_token_hint=${session.id_token}&post_logout_redirect_uri=http://localhost:3000`;
    window.location.href = logoutUrl;
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
