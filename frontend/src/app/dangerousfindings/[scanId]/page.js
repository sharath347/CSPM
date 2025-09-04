"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { getAllDangerousFindings } from "@/utils/requests";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import NotLoggedIn from "@/components/NotLoggedIn";
import { Shield, AlertTriangle, XCircle } from "lucide-react";
import { FindingsAccordion } from "@/components/Findings";

export default function DangerousFindingsPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const scanId = params.scanId; // This will contain the scan ID from the URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchFindings = async () => {
      try {
        if (!session?.user) {
          console.error("User ID not found in session");
          setLoading(false);
          return;
        }

        const userId = session.user;
        const token = session?.id_token;

        const result = await getAllDangerousFindings(userId, scanId, token);
        setData(result);
        console.log("Dangerous Findings API result:", result);
      } catch (err) {
        console.error("Error fetching dangerous findings:", err);
      } finally {
        setLoading(false);
      }
    };

    if (scanId) fetchFindings();
  }, [status, session?.user, session?.id_token, scanId]);

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
        message="You need to be logged in to view dangerous findings. Please sign in to continue."
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
            <p className="text-gray-400">Loading dangerous findings...</p>
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
            <p className="text-red-400 text-lg">
              Error loading dangerous findings
            </p>
            <p className="text-gray-400 mt-2">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  const findingsArray = data.dangerous_findings
    ? Object.entries(data.dangerous_findings)
    : [];

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
              Dangerous Findings
            </h1>
            <p className="text-gray-500 text-sm">Scan ID: {scanId}</p>
          </div>
        </div>

        {/* Findings List */}
        <FindingsAccordion
          findings={findingsArray.map(([key, value]) => ({
            key,
            ...value,
          }))}
          showService={true}
        />
      </main>
    </div>
  );
}
