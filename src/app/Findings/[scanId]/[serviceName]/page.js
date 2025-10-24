"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import { getServiceFindings } from "@/utils/requests";
import { IoIosArrowBack } from "react-icons/io";
import { Shield, AlertTriangle, XCircle } from "lucide-react";
import NoFind from "@/components/Findings/noFind";
import NotLoggedIn from "@/components/NotLoggedIn";
import { FindingsAccordion } from "@/components/Findings";

export default function ServiceFindingsPage() {
  const { data: session, status } = useSession();
  const { scanId, serviceName } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        const userId = session.user;
        const token = session?.id_token;

        const result = await getServiceFindings(
          userId,
          token,
          serviceName,
          scanId
        );
        setData(result);
      } catch (err) {
        console.error("Error fetching findings:", err);
      } finally {
        setLoading(false);
      }
    };

    if (serviceName && scanId) fetchData();
  }, [status, session?.user, session?.id_token, serviceName, scanId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Checking authentication...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <NotLoggedIn
        title="Access Denied"
        message="You need to be logged in to view findings. Please sign in to continue."
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavBar scanId={scanId} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading findings...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white">
        <NavBar scanId={scanId} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <XCircle className="text-red-500 mx-auto mb-4" size={48} />
            <p className="text-red-400 text-lg">Error loading findings</p>
            <p className="text-gray-400 mt-2">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  const findingsArray = data.findings ? Object.entries(data.findings) : [];

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar scanId={scanId} />

      <main className="p-8">
        {/* Header Section */}
        <div className="mb-8 flex">
          <Link
            href={`/Services/${scanId}`}
            className="text-gray-400 px-2 py-1 hover:text-blue-300 transition-colors text-2xl"
          >
            <IoIosArrowBack />
          </Link>
          <div>
            <h1 className="text-2xl text-gray-300 font-bold mb-2">
              {serviceName.toUpperCase()} Security Findings
            </h1>
            <p className="text-gray-500 text-sm">Scan ID: {scanId}</p>
          </div>
        </div>

        {/* Summary Stats */}
        {findingsArray.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Shield className="text-blue-400" size={24} />
                <div>
                  <p className="text-gray-400 text-sm">Total Findings</p>
                  <p className="text-2xl font-bold">{findingsArray.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-yellow-400" size={24} />
                <div>
                  <p className="text-gray-400 text-sm">Warnings</p>
                  <p className="text-2xl font-bold">
                    {
                      findingsArray.filter(
                        ([_, value]) =>
                          value.level === "warning" &&
                          value.checked_items > 0 &&
                          value.flagged_items > 0
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <XCircle className="text-red-500" size={24} />
                <div>
                  <p className="text-gray-400 text-sm">Critical Issues</p>
                  <p className="text-2xl font-bold">
                    {
                      findingsArray.filter(
                        ([_, value]) =>
                          value.level === "danger" &&
                          value.flagged_items > 0 &&
                          value.checked_items > 0
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Findings List */}
        <FindingsAccordion
          findings={findingsArray.map(([key, value]) => ({
            key,
            ...value,
          }))}
          showService={false}
        />
      </main>
    </div>
  );
}
