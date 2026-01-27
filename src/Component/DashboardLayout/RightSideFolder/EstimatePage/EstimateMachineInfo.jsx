import { useState, useRef, useEffect } from "react";
const EstimateMachineInfo = ({ form, handleChange, allMachineNames = [] }) => {
  const [machineInput, setMachineInput] = useState("");
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  
  // Filter dropdown based on input
  useEffect(() => {
    if (!machineInput.trim()) {
      setFilteredMachines(allMachineNames);
      setShowDropdown(false);
      return;
    }

    const filtered = (allMachineNames || []).filter(
      (m) =>
        m.toLowerCase().includes(machineInput.toLowerCase()) &&
        !((form.parts ?? []).includes(m))
    );

    setFilteredMachines(filtered);
    setHighlightIndex(0);
     setShowDropdown(filtered.length > 0);
  }, [machineInput, allMachineNames, form.parts]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % filteredMachines.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + filteredMachines.length) % filteredMachines.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredMachines[highlightIndex]) {
        handleChange({ target: { name: "machineName", value: filteredMachines[highlightIndex] } });
        setShowDropdown(false);
      }
    }
  };

  const selectMachine = (name) => {
    handleChange({ target: { name: "machineName", value: name } });

    // NEW — reset model for new machine
    handleChange({ target: { name: "machineModel", value: "" } });

    setShowDropdown(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Machine Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Machine Name */}
        <div className="flex flex-col relative">
          <label className="text-green-600 font-medium mb-1">Machine Name</label>
          <input
            name="machineName"
            value={form.machineName}
            onChange={(e) => {
              handleChange(e);
              setMachineInput(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            placeholder="e.g Counting Machine"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Dropdown */}
          {showDropdown && (filteredMachines?.length || 0) > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded-md max-h-40 overflow-y-auto bg-white shadow-lg z-50">
              {filteredMachines.map((m, idx) => (
                <div
                  key={m}
                  onClick={() => selectMachine(m)}
                  className={`px-4 py-2 cursor-pointer ${idx === highlightIndex ? "bg-blue-100" : "hover:bg-gray-100"
                    }`}
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Model */}
        <div className="flex flex-col">
          <label className="text-red-600 font-medium mb-1">Model</label>
          <input
            name="machineModel"
            value={form.machineModel}
            onChange={handleChange}
            placeholder="e.g GNC-275"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Date and Parts Row */}
        <div className="flex flex-col md:flex-row md:items-start md:space-x-4 col-span-1 md:col-span-2 gap-4">

          {/* Date */}
          <div className="flex-1 flex flex-col">
            <label className="text-pink-600 font-medium mb-1">Estimate Date</label>
            <input
              type="date"
              name="estimateDate"
              value={form.estimateDate}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Parts Multi-select */}
          <div className="flex-1 flex flex-col relative">
            <label className="text-purple-600 font-medium mb-1">Parts / Estimate NO</label>
            <input
              type="text"
              name="estimateNo"
              value={form.estimateNo}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default EstimateMachineInfo