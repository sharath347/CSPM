"use client"; // make this a client component

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Dashboard from "@/components/Dashboard";
import ServiceTable from "@/components/ServiceTable";
import { getServiceData, getFindingsCountByLevel } from "@/utils/requests";
import NotLoggedIn from "@/components/NotLoggedIn";

export default function Page() {
  const { data: session, status } = useSession();
  const params = useParams();
  const scanId = params.scan; // This will contain the scan ID from the URL
  const [summary, setSummary] = useState(null);
  const [counts, setCounts] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchData = async () => {
      try {
        if (!session?.user) {
          console.error("User ID not found in session");
          setLoading(false);
          return;
        }

        const userId = session.user; // userId from session
        const token = session.id_token;

        // 1. Fetch summary for specific scan
        const summaryData = await getServiceData(userId, scanId, token);
        if (summaryData && summaryData.success) {
          setSummary(summaryData.summary);
          setAccountId(summaryData.accountId || summaryData.account_id || null);
        } else {
          console.error("Failed to fetch summary:", summaryData.message);
          setSummary(null);
        }

        // 2. Fetch counts by level for specific scan
        const countsData = await getFindingsCountByLevel(userId, scanId, token);
        if (countsData && countsData.success) {
          setCounts(countsData.counts);
        } else {
          console.error("Failed to fetch counts:", countsData.message);
          setCounts(null);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setSummary(null);
        setCounts(null);
        setLoading(false);
      }
    };

    fetchData();
  }, [status, session?.user, session?.id_token, scanId]);

  if (status === "loading") return <p className="text-white">Loading...</p>;
  if (!session)
    return (
      <NotLoggedIn
        title="Access Denied"
        message="You need to be logged in to view service details. Please sign in to continue."
      />
    );

  return (
    <div>
      <NavBar scanId={scanId} />
      <main className="min-h-screen bg-black text-white p-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Pass real counts instead of mock */}
            {counts ? (
              <Dashboard counts={counts} scanId={scanId} accountId={accountId} />
            ) : (
              <p className="text-gray-500">No dashboard data available</p>
            )}

            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-2xl font-semibold">Services</h1>
            </div>

            {summary ? (
              <ServiceTable summary={summary} scanId={scanId} />
            ) : (
              <p className="text-gray-500">No service data available</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
