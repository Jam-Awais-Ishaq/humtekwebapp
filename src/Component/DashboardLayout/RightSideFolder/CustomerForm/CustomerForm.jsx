import { useContext, useState, useEffect } from "react";
import { Context } from "../../../../Context/ContextProvider";

const CustomerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    bankName: "",
    headOffice: "",
    contractStart: "",
    contractEnd: "",
    totalYears: "",
  });

  const { showStatusModal } = useContext(Context);

  // Calculate total years when contract dates change
  useEffect(() => {
    if (formData.contractStart && formData.contractEnd) {
      const calculateTotalYears = () => {
        const startDate = new Date(formData.contractStart);
        const endDate = new Date(formData.contractEnd);
        
        // Check if end date is after start date
        if (endDate <= startDate) {
          setFormData(prev => ({ ...prev, totalYears: "0" }));
          return;
        }
        
        // Calculate difference in years and months
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();
        
        // Adjust if months are negative
        if (months < 0) {
          years--;
          months += 12;
        }
        
        // Also consider days for more accurate month calculation
        const days = endDate.getDate() - startDate.getDate();
        if (days < 0) {
          months--;
          if (months < 0) {
            years--;
            months += 12;
          }
        }
        
        // Format the result
        let result = "";
        if (years > 0) {
          result += `${years} year${years > 1 ? 's' : ''}`;
        }
        
        if (months > 0) {
          if (result) result += " ";
          result += `${months} month${months > 1 ? 's' : ''}`;
        }
        
        // If less than 1 month, show in days
        if (years === 0 && months === 0) {
          const timeDiff = endDate.getTime() - startDate.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
          result = `${daysDiff} day${daysDiff > 1 ? 's' : ''}`;
        }
        
        // If no result (same day), show 0 days
        if (!result) {
          result = "0 days";
        }
        
        setFormData(prev => ({ ...prev, totalYears: result }));
      };
      
      calculateTotalYears();
    } else {
      // Clear total years if dates are not both selected
      setFormData(prev => ({ ...prev, totalYears: "" }));
    }
  }, [formData.contractStart, formData.contractEnd]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format dates to readable format
    const formattedData = {
      ...formData,
      contractStart: new Date(formData.contractStart).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      contractEnd: new Date(formData.contractEnd).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      id: Date.now() // Add unique ID
    };
    
    onSubmit(formattedData);

    showStatusModal({
      type: "success",
      message: "Customer details saved successfully!",
      title: "Success",
      primaryButtonText: "OK",
    });

    // Reset form
    setFormData({
      bankName: "",
      headOffice: "",
      contractStart: "",
      contractEnd: "",
      totalYears: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        Customer / Bank Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
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
            placeholder="e.g. HBL, UBL"
            className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
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
            placeholder="e.g. Karachi"
            className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full border border-gray-300 shadow cursor-pointer rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Contract End */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Contract End Date
          </label>
          <input
            type="date"
            name="contractEnd"
            value={formData.contractEnd}
            onChange={handleChange}
            className="w-full border border-gray-300 shadow cursor-pointer rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Total Years - Now auto-calculated */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Total Contract Duration (Auto-calculated)
          </label>
          <input
            type="text"
            name="totalYears"
            value={formData.totalYears}
            readOnly
            placeholder="Will be calculated from dates above"
            className="w-full border border-gray-300 shadow rounded-lg px-3 py-2 bg-gray-50 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">
            Automatically calculated based on start and end dates
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="md:col-span-2 bg-blue-950 text-white cursor-pointer py-3 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Save Customer Details
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;