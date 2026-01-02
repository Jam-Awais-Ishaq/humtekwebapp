import { useState } from "react";

const BankServiceInvoiceForm = () => {
  const [invoice, setInvoice] = useState({
    bankName: "",
    branch: "",
    machineModel: "",
    machineSerial: "",
    serviceType: "Maintenance",
    serviceDescription: "",
    serviceDate: "",
    invoiceDate: "",
    dueDate: "",
    amount: "",
    tax: 0,
    status: "Pending",
  });

  const handleChange = (e) => {
    setInvoice({
      ...invoice,
      [e.target.name]: e.target.value,
    });
  };

  const totalAmount =
    Number(invoice.amount) +
    (Number(invoice.amount) * Number(invoice.tax)) / 100;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Invoice Created:", { ...invoice, totalAmount });
    // 🔴 backend API call yahan hoga
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Banking Machine Service Invoice
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ===== BANK INFO ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Bank Name</label>
            <select
              name="bankName"
              value={invoice.bankName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="">Select Bank</option>
              <option value="Bank Islami">Bank Islami</option>
              <option value="Meezan Bank">Meezan Bank</option>
              <option value="UBL">UBL</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Branch / Location</label>
            <input
              type="text"
              name="branch"
              placeholder="Bahawalpur Branch"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* ===== MACHINE INFO ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Machine Model</label>
            <input
              type="text"
              name="machineModel"
              placeholder="SL45"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Machine Serial No</label>
            <input
              type="text"
              name="machineSerial"
              placeholder="ATM-45872"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
        </div>

        {/* ===== SERVICE DETAILS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Service Type</label>
            <select
              name="serviceType"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
            >
              <option>Maintenance</option>
              <option>Repair</option>
              <option>Installation</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Service Date</label>
            <input
              type="date"
              name="serviceDate"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Service Description</label>
          <textarea
            name="serviceDescription"
            rows="3"
            placeholder="SL45 ATM routine maintenance & calibration"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />
        </div>

        {/* ===== CHARGES ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Service Charges</label>
            <input
              type="number"
              name="amount"
              placeholder="50000"
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Tax (%)</label>
            <input
              type="number"
              name="tax"
              placeholder="16"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
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

        {/* ===== INVOICE DATES ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Invoice Date</label>
            <input
              type="date"
              name="invoiceDate"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
          </div>
        </div>

        {/* ===== SUBMIT BUTTON ===== */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default BankServiceInvoiceForm;