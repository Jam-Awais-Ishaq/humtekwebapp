import { useContext, useState } from "react";
import EstimateCustomerInfo from "./EstimateCustomerInfo";
import EstimateMachineInfo from "./EstimateMachineInfo";
import PartsTable from "./PartsTable";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Context } from "../../../../Context/ContextProvider";
import { ViewEstimate } from "./ViewEstimate";
import { Download } from "lucide-react";
import Modal from "../../../common/Modal";
import { generateEstimatePDF } from "../../../../utils/estimatePDF";

export default function EstimatePage() {
  const [form, setForm] = useState({
    bankName: "",
    branchName: "",
    branchAddress: "",
    machineName: "",
    machineModel: "",
    complaintNo: "",
    estimateNo: "",
    estimateDate: "",
    items: [],
    parts: [],
  });

  const [estimates, setEstimates] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const { openModal, setOpenModal } = useContext(Context)



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

    // convert qty and price to number
    if (field === "qty" || field === "price" || field === "tax") {
      updated[index][field] = Number(value) || 0;
    } else {
      updated[index][field] = value;
    }

    setForm((p) => ({ ...p, items: updated }));
  };


  const handlePartsChange = (parts) => {
    setForm((prev) => ({ ...prev, parts }));
  };

  const handleSubmit = () => {
    if (isEditing && selected) {
      // UPDATE MODE
      setEstimates(prev =>
        prev.map(e =>
          e.id === selected.id
            ? { ...selected, ...form }
            : e
        )
      );
    } else {
      // CREATE MODE
      const newEstimate = {
        id: Date.now(),
        ...form,
        machine: form.machineName,
        model: form.machineModel
      };

      setEstimates(prev => [...prev, newEstimate]);
    }

    // Close + Reset
    setOpenModal(false);
    setIsEditing(false);
    setSelected(null);

    setForm({
      bankName: "",
      branchName: "",
      branchAddress: "",
      machineName: "",
      machineModel: "",
      complaintNo: "",
      estimateNo: "",
      estimateDate: "",
      items: [],
      parts: [],
    });
  };


  const handleDelete = (id) => {
    setEstimates(prev => prev.filter(e => e.id !== id));
  }

  const handleEdit = (item) => {
    setIsEditing(true);
    setSelected(item);

    // prefill form
    setForm({
      bankName: item.bankName,
      branchName: item.branchName,
      branchAddress: item.branchAddress,
      machineName: item.machine,
      machineModel: item.model,
      complaintNo: item.complaintNo,
      estimateNo: item.estimateNo,
      estimateDate: item.estimateDate,
      items: item.items,
      parts: item.parts,
    });

    setOpenModal(true);
  };


  const filteredEstimates = estimates.filter(e => {
    const q = search.toLowerCase();
    return (
      String(e.complaintNo || "").toLowerCase().includes(q) ||
      String(e.bankName || "").toLowerCase().includes(q) ||
      String(e.branchName || "").toLowerCase().includes(q) ||
      String(e.machine || "").toLowerCase().includes(q) || // ✔ corrected
      String(e.model || "").toLowerCase().includes(q)
    );
  });


  const handleOpenModal = (item) => {
    setSelected(item);
    setOpenModal(true);
  }
  return (
    <>
      <div className="max-w-6xl mx-auto p-6 md:p-6 bg-gray-50 min-h-screen space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Create Estimate</h1>

        <div className="space-y-8">
          <EstimateCustomerInfo form={form} handleChange={handleChange} />
          <EstimateMachineInfo form={form} handleChange={handleChange} allMachineNames={["Counting Machine", "Shrink Wraping Machine", "Bundle Binding Machine", "Hitachi"]} handlePartsChange={handlePartsChange} />
          <PartsTable items={form.items} handleAddItem={handleAddItem} handleItemChange={handleItemChange} />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all w-full md:w-auto"
        >
          Generate Estimate
        </button>
      </div>

      {/* --- ESTIMATE PAGES SECTION --- */}
      <div className="max-w-6xl mx-auto p-6 space-y-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Estimates</h2>
          <span className="text-sm text-gray-500">{filteredEstimates.length} records</span>
        </div>

        {/* Search Input */}
        <div>
          <input
            type="text"
            placeholder="Search estimates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-72 px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Table Wrapper */}
        <div className="border rounded-xl  shadow-sm">
          {filteredEstimates.length === 0 ? (
            <div className="p-10 text-center text-gray-500 text-sm">
              No estimates Data found.
            </div>
          ) : (
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100/80 text-gray-700 border-b">
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Complaint #</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Bank Name</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Category</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Model</th>
                    <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredEstimates.map((item, index) => (
                    <tr key={index} className="">
                      <td className="px-4 py-3 font-medium text-gray-800">{item.complaintNo}</td>
                      <td className="px-4 py-3 text-gray-700">{item.branchName}</td>
                      <td className="px-4 py-3 text-gray-700">{item.machine}</td>
                      <td className="px-4 py-3 text-gray-700">{item.model}</td>

                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => handleOpenModal(item)} title="View" className="p-2 rounded-md cursor-pointer hover:bg-gray-200 text-gray-700 transition">
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleEdit(item)} title="Edit" className="p-2 rounded-md cursor-pointer hover:bg-blue-100 text-blue-600 transition">
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(item.id)} title="Delete" className="p-2 rounded-md cursor-pointer hover:bg-red-100 text-red-600 transition">
                            <FaTrash className="w-4 h-4" />
                          </button>
                          <button onClick={() => generateEstimatePDF(item)} title="download" className="p-2 rounded-md cursor-pointer hover:bg-red-100 text-red-600 transition">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>


      <Modal isOpen={openModal} onClose={() => {
        setOpenModal(false);
        setIsEditing(false);
        setSelected(null);
      }}>
        {isEditing ? (
          <>
            <EstimateCustomerInfo form={form} handleChange={handleChange} />
            <EstimateMachineInfo form={form} handleChange={handleChange} handlePartsChange={handlePartsChange} />
            <PartsTable items={form.items} handleAddItem={handleAddItem} handleItemChange={handleItemChange} />

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full md:w-auto"
            >
              Update Estimate
            </button>
          </>
        ) : (
          <ViewEstimate data={selected} />
        )}
      </Modal>

    </>
  );
}