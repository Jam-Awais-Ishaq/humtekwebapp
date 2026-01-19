const EstimateCustomerInfo = ({ form, handleChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl  space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Customer Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="flex flex-col">
          <label className="text-green-600 font-medium mb-1">Bank Name</label>
          <input
            name="bankName"
            value={form.bankName}
            onChange={handleChange}
            placeholder="Enter bank name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-red-600 font-medium mb-1">Branch Name</label>
          <input
            name="branchName"
            value={form.branchName}
            onChange={handleChange}
            placeholder="Enter branch name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-pink-600 font-medium mb-1">Complaint No</label>
          <input
            name="complaintNo"
            value={form.complaintNo}
            onChange={handleChange}
            placeholder="Enter complaint number"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

      </div>
    </div>
  );
};

export default EstimateCustomerInfo;
