import { CheckCircle, AlertTriangle, XCircle, Slash } from "lucide-react";
import { useRouter } from "next/navigation";

const getStatusIcon = (flagged, level) => {
  if (flagged === 0)
    return <CheckCircle className="text-green-500" size={18} strokeWidth={2} />;
  if (level === "warning")
    return (
      <AlertTriangle className="text-yellow-400" size={18} strokeWidth={2} />
    );
  if (level === "danger")
    return <XCircle className="text-red-600" size={18} strokeWidth={2} />;
  return <Slash className="text-gray-500" size={18} strokeWidth={2} />;
};

const ServiceRow = ({ name, data, scanId }) => {
  const router = useRouter();
  const {
    checked_items,
    flagged_items,
    rules_count,
    resources_count,
    max_level,
  } = data;

  const handleRowClick = () => {
    router.push(`/Findings/${scanId}/${name}`);
  };

  return (
    <tr
      className="hover:bg-gray-900 transition-colors cursor-pointer"
      onClick={handleRowClick}
    >
      <td className="px-6 py-4 whitespace-nowrap font-semibold">
        <span className="text-blue-400 hover:text-blue-300">{name}</span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-300 font-medium">
        {checked_items}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span
          className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold ${
            flagged_items === 0
              ? "bg-gray-700 text-gray-300"
              : "bg-red-700 text-red-200"
          }`}
          style={{ minWidth: "24px" }}
        >
          {flagged_items}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-300 font-medium">
        {rules_count}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center text-gray-300 font-medium">
        {resources_count}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        {getStatusIcon(flagged_items, max_level)}
      </td>
    </tr>
  );
};

export default ServiceRow;
