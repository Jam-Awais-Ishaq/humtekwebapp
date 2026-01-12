import { useState } from "react";
import EstimateCustomerInfo from "./EstimateCustomerInfo";
import EstimateMachineInfo from "./EstimateMachineInfo";
import PartsTable from "./PartsTable";

export default function EstimatePage() {
  const [form, setForm] = useState({
    customerName: "",
    branchName: "",
    branchAddress: "",
    machineName: "",
    machineModel: "",
    complaintNo: "",
    complaintDate: "",
    estimateNo: "",
    estimateDate: "",
    items: [],
    parts: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { partName: "", legend1: "", legend2: "", qty: 1, price: 0 },
      ],
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...form.items];
    updated[index][field] = value;
    setForm((p) => ({ ...p, items: updated }));
  };

  const handleSubmit = () => {
    console.log("Payload:", form);
    alert("Form submitted (check console)");
  };

  const handlePartsChange = (parts) => {
    setForm((prev) => ({ ...prev, parts }))
  }
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-6 bg-gray-50 min-h-screen space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Create Estimate</h1>

      <div className="space-y-8">
        <EstimateCustomerInfo form={form} handleChange={handleChange} />
        <EstimateMachineInfo form={form} handleChange={handleChange} handlePartsChange={handlePartsChange} />
        <PartsTable
          items={form.items}
          handleAddItem={handleAddItem}
          handleItemChange={handleItemChange}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all w-full md:w-auto"
      >
        Generate Estimate
      </button>
    </div>
  );
}
