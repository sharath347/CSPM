import ServiceRow from "./ServiceRow";

const ServiceTable = ({ summary, scanId }) => {
  if (!summary || typeof summary !== "object") {
    return <p className="text-red-500">Invalid or missing data.</p>;
  }

  const order = [
    "Service",
    "Checks",
    "Findings",
    "Rules",
    "Resources",
    "Status",
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-700 bg-black shadow-sm">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-900 sticky top-0 z-10">
          <tr>
            {order.map((e, i) => {
              return (
                <th
                  key={i}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                >
                  {e}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {Object.entries(summary ?? {}).map(([name, data]) => (
            <ServiceRow key={name} name={name} data={data} scanId={scanId} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
