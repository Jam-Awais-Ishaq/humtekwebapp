import { useContext, useState } from "react";
import { Context } from "../../../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const BankServiceInvoiceForm = ({ editInvoice, onClose }) => {
  const { invoices, setInvoices, showStatusModal } = useContext(Context);

  const isEditMode = Boolean(editInvoice);
  const [invoice, setInvoice] = useState(
    editInvoice || {
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
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const totalAmount =
    Number(invoice.amount) + (Number(invoice.amount) * Number(invoice.tax)) / 100;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInvoice = {
      ...invoice,
      id: editInvoice ? editInvoice.id : Date.now(), // unique id
      totalAmount,
      product: invoice.machineModel, // map product field
      branchCode: invoice.machineSerial, // map branch code
    };

    if (editInvoice) {
      setInvoices(invoices.map((inv) => inv.id === editInvoice.id ? newInvoice : inv));

      showStatusModal({
        type: "success",
        title: "Invoice Updated",
        message: "Invoice successfully update ho gaya",
      });
    }
    else {
      setInvoices([...invoices, newInvoice]);
      showStatusModal({
        type: "success",
        title: "Invoice Created",
        message: "Invoice successfully create ho gaya",
      });
    }
    onClose();
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
              value={invoice.branch}
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
              value={invoice.machineModel}
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
              value={invoice.machineSerial}
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

        {/* ===== CHARGES ===== */}
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

        {/* ===== INVOICE DATES ===== */}
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

        {/* ===== SUBMIT BUTTON ===== */}
        <div className={`w-full ${isEditMode ? "flex justify-end" : ""}`}>
          <button
            type="submit"
            className={` ${isEditMode ? "w-fit px-4 mr-1" : "w-full"} bg-blue-600 text-white cursor-pointer py-3 rounded-md font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg`}
          >
            {isEditMode ? "Update" : "Create Invoice"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankServiceInvoiceForm;