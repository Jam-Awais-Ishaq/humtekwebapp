const PartsTable = ({ items, handleAddItem, handleItemChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-700">Parts / Services</h2>
        <button
          onClick={handleAddItem}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all"
        >
          + Add Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left border-b border-gray-200">Part</th>
              <th className="p-3 text-left border-b border-gray-200">Qty</th>
              <th className="p-3 text-left border-b border-gray-200">Unit Price</th>
              <th className="p-3 text-left border-b border-gray-200">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="p-3">
                  <input
                    type="text"
                    placeholder="Part name"
                    className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={row.partName || ""}
                    onChange={(e) => handleItemChange(i, "partName", e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={row.qty || 1}
                    onChange={(e) => handleItemChange(i, "qty", e.target.value)}
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={row.price || 0}
                    onChange={(e) => handleItemChange(i, "price", e.target.value)}
                  />
                </td>
                <td className="p-3 font-medium text-gray-800">{(row.qty || 0) * (row.price || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartsTable;
