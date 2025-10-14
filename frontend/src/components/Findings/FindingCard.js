"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import LevelIcon from "./LevelIcon";
import FindingMetrics from "./FindingMetrics";
import FindingDetails from "./FindingDetails";

const FindingCard = ({
  finding,
  isOpen = false,
  onToggle,
  showService = false,
  className = "",
}) => {
  const { scanId, serviceName } = useParams();
  const {
    description = "",
    level = "",
    flagged_items = 0,
    checked_items = 0,
    rationale = "",
    remediation = "",
    references = null,
    service = null,
  } = finding;

  return (
    <div
      className={`bg-gray-900/30 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors ${className}`}
    >
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg"
      >
        <div className="flex items-center gap-4 flex-1">
          <LevelIcon
            level={level}
            flaggedItems={flagged_items}
            checkedItems={checked_items}
          />
          <div className="text-left">
            {level !== "good" && flagged_items > 0 && checked_items > 0 ? (
              <Link
                href={`/Findings/${scanId}/${serviceName}/details/${encodeURIComponent(
                  finding.key
                )}`}
                className="font-semibold text-white leading-relaxed text-blue-300 hover:underline"
              >
                {description}
              </Link>
            ) : (
              <h3 className="font-semibold text-white leading-relaxed">
                {description}
              </h3>
            )}
          </div>
        </div>
        <ChevronDown
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="px-6 py-5 bg-gray-950/50 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Metrics */}
            <FindingMetrics
              flaggedItems={flagged_items}
              checkedItems={checked_items}
              service={showService ? service : null}
            />

            {/* Details */}
            <FindingDetails
              rationale={rationale}
              remediation={remediation}
              references={references}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FindingCard;
