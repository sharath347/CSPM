import { Shield } from "lucide-react";

const NoFind = () => {
  return (
    <div className="text-center py-12">
      <Shield className="text-gray-500 mx-auto mb-4" size={48} />
      <h3 className="text-xl font-semibold text-gray-300 mb-2">
        Great ! No Findings Found
      </h3>
      <p className="text-gray-400">
        No security issues detected for this Service
      </p>
    </div>
  );
};

export default NoFind;
