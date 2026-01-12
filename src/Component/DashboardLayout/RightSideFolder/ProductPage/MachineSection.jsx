const MachineSection = ({ invoice, setInvoice, categories }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* ===== GROUP 1: CATEGORY + MACHINE ===== */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        {/* CATEGORY */}
        <div className="flex-1">
          <label className="font-semibold block mb-1">Category</label>
          <select
            className="w-full cursor-pointer px-3 py-3.5 border border-gray-300 focus:border-green-600 rounded transition duration-300 ease-in-out"
            value={invoice.category}
            onChange={(e) =>
              setInvoice({ ...invoice, category: e.target.value, selectedMachines: [] })
            }
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* MACHINE MODEL */}
        <div className="flex-1">
          <label className="font-semibold block mb-1">Machine Model</label>
          <div className="border rounded p-2 flex gap-2 items-center transition-all duration-300 ease-in-out
                  flex-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {invoice.selectedMachines.map((m) => (
              <span
                key={m}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer select-none flex-shrink-0"
                onClick={() =>
                  setInvoice({
                    ...invoice,
                    selectedMachines: invoice.selectedMachines.filter((x) => x !== m),
                  })
                }
              >
                {m} ✕
              </span>
            ))}

            <select
              className="px-2 py-1 rounded border flex-shrink-0 cursor-pointer"
              onChange={(e) => {
                const val = e.target.value;
                if (val && !invoice.selectedMachines.includes(val)) {
                  setInvoice({
                    ...invoice,
                    selectedMachines: [...invoice.selectedMachines, val],
                  });
                }
              }}
            >
              <option value="">Select Machine</option>
              {invoice.category &&
                categories[invoice.category].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* ===== GROUP 2: PARTS + SERIAL ===== */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        {/* MACHINE PARTS */}
        <div className="flex-1">
          <label className="font-semibold block mb-1">Machine Parts</label>
          <div className="border rounded p-2 flex flex-wrap gap-2 items-center transition-all duration-300 ease-in-out">
            {invoice.parts.map((p, i) => (
              <span
                key={i}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm cursor-pointer select-none"
                onClick={() =>
                  setInvoice({
                    ...invoice,
                    parts: invoice.parts.filter((_, idx) => idx !== i),
                  })
                }
              >
                {p} ✕
              </span>
            ))}

            <input
              className="flex-grow px-2 py-1 outline-none"
              placeholder="write name here and press Enter"
              value={invoice.partsInput}
              onChange={(e) => setInvoice({ ...invoice, partsInput: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter" && invoice.partsInput.trim() !== "") {
                  setInvoice({
                    ...invoice,
                    parts: [...invoice.parts, invoice.partsInput.trim()],
                    partsInput: "",
                  });
                }
              }}
            />
          </div>
        </div>

        {/* MACHINE SERIAL */}
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">Machine Serial No</label>
          <input
            type="text"
            name="machineSerial"
            placeholder="ATM-45872"
            value={invoice.machineSerial}
            onChange={(e) =>
              setInvoice({ ...invoice, machineSerial: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default MachineSection;
