import { useContext, useState } from "react";
import { Context } from "../../../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const BankServiceInvoiceForm = () => {
  const { invoices, setInvoices, showStatusModal } = useContext(Context);
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

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const totalAmount =
    Number(invoice.amount) + (Number(invoice.amount) * Number(invoice.tax)) / 100;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInvoice = {
      ...invoice,
      id: Date.now(), // unique id
      totalAmount,
      product: invoice.machineModel, // map product field
      branchCode: invoice.machineSerial, // map branch code
    };

    setInvoices([...invoices, newInvoice]);
    setInvoice({
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

    showStatusModal({
      type: "success",
      title: "Invoice Created",
      message: "The bank service invoice has been created successfully.",
      primaryButtonText: "Great!",
      onprimaryAction: () => { navigate('/dashboard/invoices') }
    })
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-4">
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
              className="w-full px-4 py-3 rounded-lg border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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
            <label className="block text-gray-700 font-semibold mb-1 ml-1">Service Type</label>
            <select
              name="serviceType"
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
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Tax (%)</label>
            <input
              type="number"
              name="tax"
              placeholder="16"
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

        {/* ===== INVOICE DATES ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Invoice Date</label>
            <input
              type="date"
              name="invoiceDate"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border cursor-pointer border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>
        </div>

        {/* ===== SUBMIT BUTTON ===== */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white cursor-pointer py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default BankServiceInvoiceForm;