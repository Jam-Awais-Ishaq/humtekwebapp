// ✅ ViewEstimate – Parts Table with Totals
export const ViewEstimate = ({ data }) => {
  if (!data) return null;

  const calculateTotalWithTax = (qty, price, taxPercent) => {
    const subTotal = Number(qty || 0) * Number(price || 0);
    const taxAmount = (subTotal * Number(taxPercent || 0)) / 100;
    return subTotal + taxAmount;
  };
  // calculate totals
  const partsTotal = data.items?.reduce(
    (acc, item) => acc + calculateTotalWithTax(item.qty, item.price, item.tax),
    0
  ) || 0;

  return (
    <div className="p-3 space-y-6 ">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Estimate Details</h2>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">Bank Name</span>
          <span>{data.bankName}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">Branch Name</span>
          <span>{data.branchName}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">Complaint #</span>
          <span>{data.complaintNo}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">Machine</span>
          <span>{data.machine}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">Model</span>
          <span>{data.model}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">Estimate #</span>
          <span>{data.estimateNo}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">Estimate Date</span>
          <span>{data.estimateDate || "N/A"}</span>
        </div>
      </div>

      {/* Parts / Services Table */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-1">Parts / Services</h3>
        {data.items?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
              {/* Table Header */}
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left">Part Name</th>
                  <th className="px-4 py-2 text-right">QTY</th>
                  <th className="px-4 py-2 text-right">Unit Price</th>
                  <th className="px-4 py-2 text-right">Tax</th>
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data.items.map((item, index) => {
                  const total = calculateTotalWithTax(item.qty, item.price, item.tax);
                  return (
                    <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                      <td className="px-4 py-2">{item.partName}</td>
                      <td className="px-4 py-2 text-right">{item.qty}</td>
                      <td className="px-4 py-2 text-right">{item.price.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right">{(item.tax || 0).toFixed(2)}</td>
                      <td className="px-4 py-2 text-right font-semibold">{total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>

              {/* Grand Total */}
              <tfoot className="bg-gray-100 font-semibold">
                <tr>
                  <td className="px-4 py-2 text-left" colSpan={4}>Grand Total</td>
                  <td className="px-4 py-2 text-right">{partsTotal.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic mt-2">No parts or services added.</p>
        )}
      </div>
    </div>
  );
};
