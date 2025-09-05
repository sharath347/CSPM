"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { connectAwsService, connectGcpService, connectAzureService } from "@/utils/requests";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { ProviderForm } from "@/components/forms";

export default function ConnectProvidersPage() {
  const { data: session, status } = useSession();
  const [provider, setProvider] = useState("aws"); // default AWS
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    if (status !== "authenticated") {
      setError("You must be logged in to connect.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let result;

      if (provider === "aws") {
        result = await connectAwsService(
          session.user,
          session.id_token,
          formData
        );
      } else if (provider === "gcp") {
        result = await connectGcpService(
          session.user,
          session.id_token,
          formData
        );
      } else if (provider === "azure") {
        result = await connectAzureService(
          session.user,
          session.id_token,
          formData
        );
      }

      // ✅ Navigate only on success
      if (result?.success) {
        router.push("/scans");
      } else {
        setError(
          result?.error || `Failed to connect ${provider.toUpperCase()}`
        );
      }
    } catch (err) {
      console.error("Connection error:", err);
      setError(err.message || `Error connecting ${provider.toUpperCase()}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/scans");
  };

  return (
    <div className="relative min-h-screen">
      {/* Logout Button */}
      <div className="absolute top-4 right-4 z-10">
        <LogoutButton />
      </div>

      <main className="min-h-screen text-white flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl text-red-700 tracking-[.6em] mb-3 pt-3">
          CLOUD <span className="text-blue-700">SERVICES</span>
        </h2>
        <p className="text-gray-500 mb-7">
          Connect your cloud account for security monitoring
        </p>

        <div className="w-full max-w-lg border border-gray-600 rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-900/20 border border-red-500 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <p className="text-red-400 text-sm">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="text-red-400 hover:text-red-300 ml-2 text-lg font-bold"
                  title="Close error"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Provider Selector */}
          <div className="flex justify-center gap-4 mb-6">
            {["aws", "gcp", "azure"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setProvider(p);
                  setError(null);
                }}
                className={`px-4 py-2 rounded-xl border ${
                  provider === p
                    ? "border-blue-500 text-blue-400"
                    : "border-gray-600 text-gray-400"
                }`}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Dynamic Form */}
          <ProviderForm
            provider={provider}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={handleCancel}
          />
        </div>
      </main>
    </div>
  );
}
