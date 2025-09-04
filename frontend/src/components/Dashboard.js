"use client";

import { ShieldAlert, Activity, ShieldCheck } from "lucide-react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { useRouter } from "next/navigation";

const Dashboard = ({ counts, scanId }) => {
  const { good = 0, warning = 0, danger = 0 } = counts || {};
  const total = good + warning + danger;
  const router = useRouter();

  // Debug logs
  console.log("✅ Dashboard counts:", { good, warning, danger, total });

  const handleActiveClick = () => {
    router.push(`/dangerousfindings/${scanId}`);
  };

  return (
    <section className="mb-10">
      <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-400 mb-6">
        Monitor your cloud infrastructure services and resources
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Service Health */}
        <DashboardCard
          title="Service Health"
          value={total}
          description="Total Services"
          icon={<Activity className="text-white" />}
        >
          <div className="flex gap-3 mt-4">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle size={20} />
              <span className="text-sm font-medium">{good} Good</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <AlertTriangle size={20} />
              <span className="text-sm font-medium">{warning} Warnings</span>
            </div>
            <div className="flex items-center gap-2 text-red-500">
              <XCircle size={20} />
              <span className="text-sm font-medium">{danger} Danger</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Compliance Score"
          value={total > 0 ? `${((good / total) * 100).toFixed(1)}%` : "0%"}
          description="Services passing security checks"
          icon={<ShieldCheck className="text-white" />}
        >
          <div
            className="h-2 bg-green-500 mt-4 rounded-full"
            style={{
              width: total > 0 ? `${(good / total) * 100}%` : "0%",
            }}
          />
        </DashboardCard>
        {/* Active Findings - Clickable */}
        <DashboardCard
          title="Active Findings"
          description="Critical security issues detected"
          icon={<ShieldAlert className="text-white" />}
          onClick={handleActiveClick}
          className="cursor-pointer hover:border-red-600 hover:border-opacity-80 hover:border-2 transition-all duration-200"
        >
          <div className="flex items-center gap-2 mt-4">
            <XCircle size={20} className="text-red-500" />
            <span className="text-sm text-gray-400">
              Click to view all critical findings
            </span>
          </div>
        </DashboardCard>

        {/* Compliance Score */}
      </div>
    </section>
  );
};

export default Dashboard;
