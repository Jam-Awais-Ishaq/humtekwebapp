import { useContext } from "react";
import { Context } from "../../../../Context/ContextProvider";

const BankInfoSection = ({ invoice, handleChange }) => {

  const { banks } = useContext(Context);
  return (
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
          <option value="">Made Custormer before creating invoice</option>

          {banks.map((bank, index) => (
            <option key={index} value={bank}>
              {bank}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Branch Code / Address</label>
        <input
          type="text"
          name="branchCode"
          placeholder="branch Code"
          value={invoice.branchCode}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        />
      </div>
    </div>
  );
};

export default BankInfoSection;