"use client";

import { useState } from "react";
import FindingCard from "./FindingCard";

const FindingsAccordion = ({
  findings = [],
  showService = false,
  className = "",
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!findings || findings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg">No findings found</div>
        <p className="text-gray-500 mt-2">
          No security findings detected for this selection
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {findings.map((finding, index) => (
        <FindingCard
          key={finding.key || index}
          finding={finding}
          isOpen={openIndex === index}
          onToggle={() => toggleAccordion(index)}
          showService={showService}
        />
      ))}
    </div>
  );
};

export default FindingsAccordion;
