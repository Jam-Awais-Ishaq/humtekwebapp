import { useContext, useState } from "react";
import { Context } from "../../../../Context/ContextProvider";

const CustomerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    bankName: "",
    headOffice: "",
    contractStart: "",
    ntn: "",
  });

  const { showStatusModal } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      contractStart: new Date(formData.contractStart).toLocaleDateString(
        "en-GB",
        { day: "2-digit", month: "short", year: "numeric" }
      ),
      id: Date.now(),
    };

    onSubmit(formattedData);

    showStatusModal({
      type: "success",
      title: "Success",
      message: "Customer details saved successfully!",
      primaryButtonText: "OK",
    });

    setFormData({
      bankName: "",
      headOffice: "",
      contractStart: "",
      ntn: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Customer / Bank Information
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
        
        {/* Bank Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Bank Name
          </label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-300"
            required
          />
        </div>

        {/* Head Office */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Head Office
          </label>
          <input
            type="text"
            name="headOffice"
            value={formData.headOffice}
            onChange={handleChange}
            className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-300"
            required
          />
        </div>

        {/* NTN */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            NTN
          </label>
          <input
            type="text"
            name="ntn"
            value={formData.ntn}
            onChange={handleChange}
            placeholder="e.g. 1234567-8"
            className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-300"
            required
          />
        </div>

        {/* Contract Start */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Contract Start Date
          </label>
          <input
            type="date"
            name="contractStart"
            value={formData.contractStart}
            onChange={handleChange}
            className="w-full border border-gray-300 shadow rounded-lg px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-blue-950 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Save Customer Details
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;