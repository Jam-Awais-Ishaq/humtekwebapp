const ServiceSection = ({ invoice, handleChange, totalAmount, isEditMode }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-1 ml-1">Service Type</label>
          <select
            name="serviceType"
            value={invoice.serviceType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          >
            <option>Maintenance</option>
            <option>Repair</option>
            <option>Installation</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1 ml-1">Service Date</label>
          <input
            type="date"
            name="serviceDate"
            value={invoice.serviceDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1 ml-1">Description</label>
        <textarea
          name="serviceDescription"
          rows="3"
          placeholder="SL45 ATM routine maintenance & calibration"
          value={invoice.serviceDescription}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Service Charges</label>
          <input
            type="number"
            name="amount"
            placeholder="50000"
            value={invoice.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Tax (%)</label>
          <input
            type="number"
            name="tax"
            placeholder="16"
            value={invoice.tax}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300  focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Total Amount</label>
          <input
            type="text"
            value={`Rs. ${totalAmount || 0}`}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 font-semibold cursor-not-allowed"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Invoice Date</label>
          <input
            type="date"
            name="invoiceDate"
            value={invoice.invoiceDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border cursor-pointer border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={invoice.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>
      </div>

      <div className={`w-full ${isEditMode ? "flex justify-end" : ""}`}>
        <button
          type="submit"
          className={` ${
            isEditMode ? "w-fit px-4 mr-1" : "w-full"
          } bg-blue-600 text-white cursor-pointer py-3 rounded-md font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg`}
        >
          {isEditMode ? "Update" : "Create Invoice"}
        </button>
      </div>
    </>
  );
};

export default ServiceSection;