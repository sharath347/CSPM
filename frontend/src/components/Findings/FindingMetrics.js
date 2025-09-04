"use client";

const FindingMetrics = ({
  flaggedItems = 0,
  checkedItems = 0,
  service = null,
  className = "",
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300">
        Metrics
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <p className="text-gray-400 text-xs uppercase tracking-wider">
            Flagged Items
          </p>
          <p className="text-xl font-bold text-red-400">{flaggedItems}</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3">
          <p className="text-gray-400 text-xs uppercase tracking-wider">
            Checked Items
          </p>
          <p className="text-xl font-bold text-blue-400">{checkedItems}</p>
        </div>
      </div>

      {service && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Service
            </p>
            <p className="text-lg text-green-400">{service}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindingMetrics;
