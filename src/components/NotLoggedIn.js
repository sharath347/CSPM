"use client";

import { useRouter } from "next/navigation";
import { Lock, LogIn } from "lucide-react";

const NotLoggedIn = ({
  title = "Authentication Required",
  message = "Please log in to access this page",
  showLoginButton = true,
}) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
            <Lock className="text-gray-400" size={32} />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-white mb-3">{title}</h1>

          {/* Message */}
          <p className="text-gray-400 mb-8 leading-relaxed">{message}</p>

          {/* Login Button */}
          {showLoginButton && (
            <button
              onClick={handleLogin}
              className="border border-gray-500 cursor-pointer text-white/80 px-3 py-2 rounded-lg"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
