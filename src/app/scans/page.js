"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Calendar, Cloud, Hash, MoreVertical, Trash2 } from "lucide-react";
import { getUserScans, deleteScan } from "@/utils/requests";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import NotLoggedIn from "@/components/NotLoggedIn";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    timeZone: "UTC", // Use UTC to display timestamps as they appear in data
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 12h clock (6:30 PM), remove for 24h
  }); // Add UTC suffix to make it clear
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, scanId }) => {
  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <Trash2 className="text-red-400 mr-3" size={24} />
          <h3 className="text-lg font-semibold text-white">Delete Scan</h3>
        </div>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete this scan? This action cannot be
          undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(modal, document.body);
  }
  return null;
};

const ScanRow = ({ scan, onDelete }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleRowClick = (e) => {
    // Don't navigate if clicking on the menu
    if (e.target.closest(".menu-container")) {
      return;
    }
    router.push(`/Services/${scan.scan_id}`);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(scan.scan_id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <tr
        className="hover:bg-gray-900 transition-colors cursor-pointer relative"
        onClick={handleRowClick}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <Cloud className="text-blue-400 mr-2" size={16} />
            <span className="text-blue-400 font-semibold">
              {scan.cloud_provider}
            </span>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <Hash className="text-gray-400 mr-2" size={16} />
            <span className="text-gray-300 font-mono text-sm">
              {scan.scan_id}
            </span>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <Calendar className="text-yellow-400 mr-2" size={16} />
            <span className="text-gray-300">{formatDate(scan.created_at)}</span>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="menu-container relative">
            <button
              onClick={handleMenuClick}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <MoreVertical className="text-gray-400" size={16} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
                <button
                  onClick={handleDeleteClick}
                  className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 flex items-center"
                >
                  <Trash2 className="mr-2" size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        scanId={scan.scan_id}
      />
    </>
  );
};

const ScansTable = ({ scans, onDeleteScan }) => {
  if (!scans || scans.length === 0) {
    return (
      <div className="text-center py-12">
        <Cloud className="text-gray-500 mx-auto mb-4" size={48} />
        <p className="text-gray-500">No scans found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 bg-black shadow-sm">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-900 sticky top-0 z-10">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Cloud Provider
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Scan ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {scans.map((scan, index) => (
            <ScanRow
              key={scan.scan_id || index}
              scan={scan}
              onDelete={onDeleteScan}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function ScansPage() {
  const { data: session, status } = useSession();
  const [scansData, setScansData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchScansData = async () => {
      try {
        if (!session?.user) {
          console.error("User ID not found in session");
          setLoading(false);
          return;
        }

        const data = await getUserScans(session.user, session.id_token);

        if (!data.success) {
          console.error("Failed to fetch scans:", data.message);
          setScansData({ scans: [] });
        } else {
          setScansData(data);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching scans data:", err);
        setScansData({ scans: [] });
        setLoading(false);
      }
    };

    fetchScansData();
  }, [status, session?.user, session?.id_token]);

  const handleDeleteScan = async (scanId) => {
    try {
      if (!session?.user) {
        console.error("User not found in session");
        alert("User session not found. Please log in again.");
        return;
      }

      // Call the delete API
      const response = await deleteScan(session.user, scanId, session.id_token);

      if (response && response.success) {
        // Remove from local state on successful deletion
        setScansData((prev) => ({
          ...prev,
          scans: prev.scans.filter((scan) => scan.scan_id !== scanId),
        }));
        alert("Scan deleted successfully");
      } else {
        console.error(
          "❌ Failed to delete scan:",
          response?.message || "Unknown error"
        );
        alert(response?.message || "Failed to delete scan");
      }
    } catch (error) {
      console.error("❌ Error deleting scan:", error);

      // Handle specific error cases
      if (error.message.includes("401") || error.message.includes("403")) {
        alert("Session expired. Please log in again.");
      } else if (error.message.includes("404")) {
        alert("Scan not found or already deleted.");
      } else {
        alert("Failed to delete scan. Please try again.");
      }
    }
  };

  if (status === "loading") return <p className="text-white">Loading...</p>;
  if (!session)
    return (
      <NotLoggedIn
        title="Access Denied"
        message="You need to be logged in to view your scans. Please sign in to continue."
      />
    );

  return (
    <div>
      <main className="min-h-screen bg-black text-white p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex">
            <Link
              href="/ConnectProvider"
              className="text-gray-400 px-2 py-1 hover:text-blue-300 transition-colors text-2xl"
            >
              <IoIosArrowBack />
            </Link>
            <h1 className="text-2xl font-semibold">Scans</h1>
          </div>
          <div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                Total Scans: {scansData?.scans?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading scans...</p>
          </div>
        ) : (
          <ScansTable
            scans={scansData?.scans || []}
            onDeleteScan={handleDeleteScan}
          />
        )}
      </main>
    </div>
  );
}
