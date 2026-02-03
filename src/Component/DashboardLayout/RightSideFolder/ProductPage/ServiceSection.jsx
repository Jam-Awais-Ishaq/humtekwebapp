import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const ServiceSection = ({ invoice, setInvoice, handleChange, isEditMode }) => {
  // === STATE FOR PART PANELS ===
  const [parts, setParts] = useState(invoice.parts || []);

  // 🔹 NEW: Add new item/part
  const addPart = () => {
    setParts(prev => [
      ...prev,
      { name: "", qty: 1, unitPrice: 0, tax: 0, total: 0 },
    ]);
  };

  // 🔹 NEW: Update single part & calculate its total
  const updatePart = (index, field, value) => {
    const updated = [...parts];
    updated[index][field] = value;

    // 🔸 total calculation
    const qty = Number(updated[index].qty || 0);
    const price = Number(updated[index].unitPrice || 0);
    const tax = Number(updated[index].tax || 0);

    const subTotal = qty * price;
    updated[index].total = subTotal + (subTotal * tax) / 100;

    setParts(updated);
  };

  // 🔹 NEW: REMOVE PART (BUG FIX)
  // ❗ pehle tum invoice.parts use kar rahe the — is liye remove work nahi kar raha tha
  const removePart = (index) => {
    setParts(prev => prev.filter((_, i) => i !== index));
  };

  // 🔹 NEW: parts ko parent invoice ke sath sync karna
  useEffect(() => {
    setInvoice(prev => ({
      ...prev,
      parts,
    }));
  }, [parts]);

  // 🔹 Grand total (service + parts)
  const grandTotal =
    parts.reduce((sum, p) => sum + Number(p.total || 0), 0) +
    Number(invoice.amount || 0) +
    (Number(invoice.amount || 0) * Number(invoice.tax || 0)) / 100;

  return (
    <div className="space-y-6">
      {/* ===== INVOICE DATE & QTY ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Service Charges</label>
          <input
            type="number"
            name="amount"
            value={invoice.amount}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Invoice Date</label>
          <input
            type="date"
            name="invoiceDate"
            value={invoice.invoiceDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      {/* ===== ADD PART BUTTON ===== */}
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={addPart}
          className="bg-green-600 text-white px-4 py-3  rounded-md font-semibold hover:bg-green-700"
        >
          Add Item
        </button>
      </div>

      {/* === PART penal == */}
      <div className="grid grid-cols-6 gap-3 font-semibold text-gray-700 bg-gray-300 p-3 rounded-t-lg">
        <span>Part Name</span>
        <span>QTY</span>
        <span>Unit Price</span>
        <span>Tax %</span>
        <span>Total</span>
        <span className="text-center">Action</span>
      </div>

      {parts.map((part, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-3 bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
            <input
              type="text"
              placeholder="Part Name"
              value={part.name}
              onChange={(e) => updatePart(index, "name", e.target.value)}
              className="px-3 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="QTY"
              value={part.qty}
              onChange={(e) => updatePart(index, "qty", e.target.value)}
              className="px-3 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Unit Price"
              value={part.unitPrice}
              onChange={(e) =>
                updatePart(index, "unitPrice", e.target.value)
              }
              className="px-3 py-2 border rounded"
            />
            <input
              type="number"
              placeholder="Tax %"
              value={part.tax}
              onChange={(e) => updatePart(index, "tax", e.target.value)}
              className="px-3 py-2 border rounded"
            />
            <input
              disabled
              value={`Rs. ${part.total.toLocaleString()}`}
              className="px-3 py-2 border rounded bg-gray-200 font-semibold"
            />
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => removePart(index)}
                className=" text-red-500 rounded text-right text-sm cursor-pointer">
                <FaTrash />
              </button>
            </div>

          </div>
        </div>
      ))}

      <div className="w-full flex justify-between px-4">
        <h3 className="text-lg font-[Times-new-Roman]">Grand total of this invoice</h3>
        <p className="md:w-32 w-full text-center">Rs. {grandTotal.toLocaleString()}</p>
      </div>

      {/* ===== SUBMIT BUTTON ===== */}
      <div className={`w-full ${isEditMode ? "flex justify-end" : ""}`}>
        <button
          type="submit"
          className={`${isEditMode ? "px-4 w-fit" : "w-full"} bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700`}
        >
          {isEditMode ? "Update" : "Create Invoice"}
        </button>
      </div>
    </div>
  );
};

export default ServiceSection;
