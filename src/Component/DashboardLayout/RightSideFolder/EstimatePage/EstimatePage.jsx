import { useContext, useEffect, useMemo, useState } from "react";
import EstimateCustomerInfo from "./EstimateCustomerInfo";
import EstimateMachineInfo from "./EstimateMachineInfo";
import PartsTable from "./PartsTable";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Context } from "../../../../Context/ContextProvider";
import { ViewEstimate } from "./ViewEstimate";
import { Download } from "lucide-react";
import Modal from "../../../common/Modal";
import { generateEstimatePDF } from "../../../../utils/estimatePDF";
import { createEstimate, deleteEstimate, getEstimates, getMachines, updateEstimate } from "../../../../api/AuthApi";

export default function EstimatePage() {
  // --- Separate states for create & edit ---
  const [createForm, setCreateForm] = useState({
    bankName: "",
    branchName: "",
    machineName: "",
    machineModel: "",
    complaintNo: "",
    estimateNo: "",
    estimateDate: "",
    parts: [],
  });

  const [editForm, setEditForm] = useState({
    bankName: "",
    branchName: "",
    machineName: "",
    machineModel: "",
    complaintNo: "",
    estimateNo: "",
    estimateDate: "",
    parts: [],
  });

  const [estimates, setEstimates] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { openModal, setOpenModal, machines, setMachines } = useContext(Context);

  // --- Handlers for create & edit separately ---
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPart = (forEdit = false) => {
    if (forEdit) {
      setEditForm(prev => ({
        ...prev,
        parts: [...prev.parts, { partName: "", qty: 1, tax: 0, price: 0 }]
      }));
    } else {
      setCreateForm(prev => ({
        ...prev,
        parts: [...prev.parts, { partName: "", qty: 1, tax: 0, price: 0 }]
      }));
    }
  };

  const handlePartChange = (index, field, value, forEdit = false) => {
  const form = forEdit ? editForm : createForm;
  const setForm = forEdit ? setEditForm : setCreateForm;

  const updated = [...form.parts];
  updated[index][field] = ["qty","price","tax"].includes(field) ? value : value;

  setForm(prev => ({ ...prev, parts: updated }));
};

  const handlePartsChange = (parts, forEdit = false) => {
    if (forEdit) {
      setEditForm((prev) => ({ ...prev, parts }));
    } else {
      setCreateForm((prev) => ({ ...prev, parts }));
    }
  };

  // --- Submit handlers ---
  const handleCreateSubmit = async () => {
    try {
      const newFromApi = await createEstimate(createForm);
      const newEstimate = {
        ...newFromApi,
        machine: newFromApi.machine_name,
        model: newFromApi.machine_model,
        bankName: newFromApi.bank_name,
        branchName: newFromApi.branch_name,
        complaintNo: newFromApi.complaint_no,
        estimateNo: newFromApi.estimate_no,
        estimateDate: newFromApi.estimate_date
          ? newFromApi.estimate_date.split("T")[0]
          : "",
      };
      setEstimates((prev) => [...prev, newEstimate]);

      setOpenModal({
        open: true,
        type: "success",
        title: "Created",
        message: "Estimate created successfully.",
        primaryButtonText: "OK",
      });

      // Reset create form
      setCreateForm({
        bankName: "",
        branchName: "",
        machineName: "",
        machineModel: "",
        complaintNo: "",
        estimateNo: "",
        estimateDate: "",
        items: [],
        parts: [],
      });
    } catch (err) {
      console.error("Error creating estimate:", err);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const updatedFromApi = await updateEstimate(selected.id, editForm);
      const updatedItem = {
        ...selected,
        ...editForm,
        machine: editForm.machineName,
        model: editForm.machineModel,
        bankName: updatedFromApi.bank_name,
        branchName: updatedFromApi.branch_name,
        complaintNo: updatedFromApi.complaint_no,
        estimateNo: updatedFromApi.estimate_no,
        estimateDate: updatedFromApi.estimate_date
          ? updatedFromApi.estimate_date.split("T")[0]
          : "",
      };

      setEstimates((prev) =>
        prev.map((e) => (e.id === selected.id ? updatedItem : e))
      );

      setSelected(updatedItem);

      setOpenModal({
        open: true,
        type: "success",
        title: "Updated",
        message: "Estimate updated successfully.",
        primaryButtonText: "OK",
      });

      // Reset edit form
      setEditForm({
        bankName: "",
        branchName: "",
        machineName: "",
        machineModel: "",
        complaintNo: "",
        estimateNo: "",
        estimateDate: "",
        parts: [],
      });

      setIsEditing(false);
      setSelected(null);
    } catch (err) {
      console.error("Error updating estimate:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEstimate(id);
      setEstimates((prev) => prev.filter((est) => est.id !== id));
      setOpenModal({
        open: true,
        type: "success",
        title: "Deleted",
        message: "Estimate deleted successfully.",
        primaryButtonText: "OK",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // --- Open edit modal ---
  const handleEdit = (item) => {
    setIsEditing(true);
    setSelected(item);

    setEditForm({
      bankName: item.bankName,
      branchName: item.branchName,
      machineName: item.machine,
      machineModel: item.model,
      complaintNo: item.complaintNo,
      estimateNo: item.estimateNo,
      estimateDate: item.estimateDate,
      parts: [...item.parts],
    });

    setOpenModal(true);
  };

  const searchText = (search || "").toLowerCase();
  const filteredEstimates = useMemo(() => {
    return estimates.filter(
      (e) =>
        e.bankName?.toLowerCase().includes(searchText) ||
        e.branchName?.toLowerCase().includes(searchText) ||
        e.complaintNo?.toLowerCase().includes(searchText)
    );
  }, [estimates, searchText]);

  const handleOpenModal = (item) => {
    setSelected(item);
    setOpenModal({
      open: true,
      type: "view",
      title: `Estimate for Complaint #${item.complaintNo}`,
      message: "",
      primaryButtonText: "Close",
    });
  };

  // Fetch machines
  useEffect(() => {
    const fetchMachines = async () => {
      const machinesFromBackend = await getMachines();
      setMachines(machinesFromBackend);
    };
    fetchMachines();
  }, [setMachines]);

  // Fetch estimates
  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const data = await getEstimates();
        const formatted = data.map((e) => ({
          ...e,
          machine: e.machine_name,
          model: e.machine_model,
          bankName: e.bank_name,
          branchName: e.branch_name,
          complaintNo: e.complaint_no,
          estimateNo: e.estimate_no,
          estimateDate: e.estimate_date ? e.estimate_date.split("T")[0] : "",
        }));
        setEstimates(formatted);
      } catch (err) {
        console.error("Error fetching estimates:", err);
      }
    };
    fetchEstimates();
  }, []);

  return (
    <>
      {/* --- Create Form Section --- */}
      <div className="max-w-6xl mx-auto p-6 md:p-6 bg-gray-50 min-h-screen space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Create Estimate</h1>
        <div className="space-y-8">
          <EstimateCustomerInfo form={createForm} handleChange={handleCreateChange} />
          <EstimateMachineInfo machines={machines} form={createForm} handleChange={handleCreateChange} handlePartsChange={(parts) => handlePartsChange(parts, false)} />
          <PartsTable items={createForm.parts} handleAddItem={() => handleAddPart(false)} handleItemChange={(i,f,v) => handlePartChange(i,f,v,false)} />
        </div>
        <button
          onClick={handleCreateSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all w-full md:w-auto"
        >
          Generate Estimate
        </button>
      </div>

      {/* --- Estimates Table --- */}
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
        <div className="border rounded-xl shadow-sm">
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
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Branch Name</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Category</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Model</th>
                    <th className="px-4 py-3 text-center font-medium whitespace-nowrap">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredEstimates.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 font-medium text-gray-800">{item.complaintNo}</td>
                      <td className="px-4 py-3 text-gray-700">{item.bankName}</td>
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

      {/* --- Modal --- */}
      <Modal isOpen={openModal} onClose={() => { setOpenModal(false); setIsEditing(false); setSelected(null); }}>
        {isEditing ? (
          <>
            <EstimateCustomerInfo form={editForm} handleChange={handleEditChange} />
            <EstimateMachineInfo machines={machines} form={editForm} handleChange={handleEditChange} handlePartsChange={(parts) => handlePartsChange(parts, true)} />
            <PartsTable items={editForm.parts} handleAddItem={() => handleAddPart(true)} handleItemChange={(i,f,v) => handlePartChange(i,f,v,true)} />
            <button onClick={handleEditSubmit} className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full md:w-auto">
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