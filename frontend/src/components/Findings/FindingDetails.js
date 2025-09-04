"use client";

import { ExternalLink } from "lucide-react";

const FindingDetails = ({
  rationale = "",
  remediation = "",
  references = null,
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {references && (
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-2">
            References
          </h4>
          {Array.isArray(references) ? (
            <div className="space-y-2">
              {references.map((ref, idx) => (
                <a
                  key={idx}
                  href={ref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  <ExternalLink size={14} />
                  {ref}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-300 text-sm">{references}</p>
          )}
        </div>
      )}

      <div>
        <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-2">
          Rationale
        </h4>
        <p className="text-gray-500 leading-relaxed">{rationale}</p>
      </div>

      {remediation && (
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-2">
            Remediation
          </h4>
          <p className="text-gray-300 leading-relaxed">{remediation}</p>
        </div>
      )}
    </div>
  );
};

export default FindingDetails;
