"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import fortivestLogo from "../fortivest_logo.png";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect after login
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/ConnectProvider");
    }
  }, [status, router]);

  // Loading state while session is being checked
  if (status === "loading") {
    return <p className="text-white">Checking authentication...</p>;
  }

  // Show login page if not logged in
  if (!session) {
    return (
      <main className="min-h-screen text-white flex flex-col items-center justify-center px-4">
        <div className="mb-4 flex flex-col items-center">
          <Image
            src={fortivestLogo}
            alt="Fortivest"
            width={64}
            height={64}
            className="rounded-lg object-cover shadow bg-white/90 p-[3px]"
            priority
          />
          <h1 className="text-2xl font-bold text-white mt-3 tracking-wider">
            FORTIVEST
          </h1>
        </div>
        <h2 className="text-2xl text-red-700 tracking-[.6em] mb-3 pt-3">
          CLOUD <span className="text-blue-700">SERVICES</span>
        </h2>
        <p className="text-gray-500 mb-7">
          Welcome to Cloud Security Dashboard
        </p>

        <div className="w-full max-w-md border border-gray-600 rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-lg text-white/90 tracking-[.3em] pb-5 pt-3">
              LOGIN
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Sign in with your Keycloak account to continue
            </p>
          </div>

          <button
            onClick={() => signIn("keycloak")}
            className="w-full border border-green-900 hover:border-green-700 cursor-pointer transition-colors text-white/80 font-medium py-3 rounded-xl"
          >
            Login with Keycloak
          </button>
        </div>
      </main>
    );
  }

  return null; // Avoid rendering anything while redirecting
}

