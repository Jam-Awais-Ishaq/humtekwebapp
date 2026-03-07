import { useState, useRef, useEffect, useMemo } from "react";

const EstimateMachineInfo = ({ form, handleChange, allMachineNames = [], machines = [] }) => {
  const [machineInput, setMachineInput] = useState("");
  const [modelInput, setModelInput] = useState("");
  const [showMachineDropdown, setShowMachineDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [machineHighlightIndex, setMachineHighlightIndex] = useState(0);
  const [modelHighlightIndex, setModelHighlightIndex] = useState(0);

  const machineRef = useRef(null);
  const modelRef = useRef(null);

  // ===== Get all unique machine names from machines array =====
  const machineNamesFromData = useMemo(() => {
    return machines.map(m => m.category);
  }, [machines]);

  // ===== Combine with allMachineNames prop =====
  const allMachineOptions = useMemo(() => {
    // Remove duplicates
    const combined = [...new Set([...allMachineNames, ...machineNamesFromData])];
    return combined;
  }, [allMachineNames, machineNamesFromData]);

  // ===== FILTERED MACHINES =====
  const filteredMachines = useMemo(() => {
    if (!machineInput.trim()) {
      return allMachineOptions;
    }
    return allMachineOptions.filter(
      (m) => m.toLowerCase().includes(machineInput.toLowerCase())
    );
  }, [machineInput, allMachineOptions]);

  // ===== GET MODELS FOR SELECTED MACHINE =====
  const allModels = useMemo(() => {
    if (!form.machineName || !machines || machines.length === 0) {
      console.log(" No machine selected or machines empty");
      return [];
    }

    // Find the machine in our data
    const selectedMachine = machines.find(m =>
      m.category?.toLowerCase().trim() === form.machineName.toLowerCase().trim()
    );

    if (!selectedMachine) {
      console.log("No matching machine found for:", form.machineName);
      return [];
    }

    return selectedMachine.models || [];
  }, [form.machineName, machines]);

  // ===== FILTERED MODELS =====
  const filteredModels = useMemo(() => {

    if (!modelInput.trim()) {
      return allModels;
    }
    return allModels.filter(mod =>
      mod.toLowerCase().includes(modelInput.toLowerCase())
    );
  }, [modelInput, allModels]);

  // ===== CLICK OUTSIDE =====
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (machineRef.current && !machineRef.current.contains(e.target)) {
        setShowMachineDropdown(false);
      }
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===== Reset highlight =====
  useEffect(() => {
    setMachineHighlightIndex(0);
  }, [filteredMachines]);

  useEffect(() => {
    setModelHighlightIndex(0);
  }, [filteredModels]);

  // ===== Update input when form.machineName changes =====
  useEffect(() => {
    if (form.machineName) {
      setMachineInput(form.machineName);
    }
  }, [form.machineName]);

  useEffect(() => {
    if (form.machineModel) {
      setModelInput(form.machineModel);
    }
  }, [form.machineModel]);

  // ===== MACHINE KEYBOARD =====
  const handleMachineKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setMachineHighlightIndex((prev) => (prev + 1) % filteredMachines.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setMachineHighlightIndex((prev) =>
        (prev - 1 + filteredMachines.length) % filteredMachines.length
      );
    } else if (e.key === "Enter" && filteredMachines[machineHighlightIndex]) {
      e.preventDefault();
      selectMachine(filteredMachines[machineHighlightIndex]);
    }
  };

  // ===== MODEL KEYBOARD =====
  const handleModelKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setModelHighlightIndex((prev) => (prev + 1) % filteredModels.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setModelHighlightIndex((prev) =>
        (prev - 1 + filteredModels.length) % filteredModels.length
      );
    } else if (e.key === "Enter" && filteredModels[modelHighlightIndex]) {
      e.preventDefault();
      selectModel(filteredModels[modelHighlightIndex]);
    }
  };

  // ===== SELECT MACHINE =====
  const selectMachine = (name) => {
    handleChange({ target: { name: "machineName", value: name } });
    handleChange({ target: { name: "machineModel", value: "" } });
    setMachineInput(name);
    setShowMachineDropdown(false);
    setModelInput("");

    // Auto-show model dropdown
    setTimeout(() => {
      setShowModelDropdown(true);
    }, 100);
  };

  // ===== SELECT MODEL =====
  const selectModel = (mod) => {
    handleChange({ target: { name: "machineModel", value: mod } });
    setModelInput(mod);
    setShowModelDropdown(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-semibold text-gray-700">Machine Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ===== MACHINE NAME ===== */}
        <div className="flex flex-col relative" ref={machineRef}>
          <label className="text-green-600 font-medium mb-1">Machine Name</label>
          <input name="machineName" value={form.machineName} onChange={(e) => { handleChange(e); setMachineInput(e.target.value); setShowMachineDropdown(true); }}
            onFocus={() => { setShowMachineDropdown(true); }}
            onKeyDown={handleMachineKeyDown}
            placeholder="Search or select machine..."
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Machine Dropdown */}
          {showMachineDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded-md max-h-40 overflow-y-auto bg-white shadow-lg z-50">
              {filteredMachines.length === 0 ? (
                <div className="px-4 py-2 text-gray-500 italic">No machine found</div>
              ) : (
                filteredMachines.map((m, idx) => (
                  <div
                    key={m}
                    onClick={() => selectMachine(m)}
                    className={`px-4 py-2 cursor-pointer ${idx === machineHighlightIndex ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                  >
                    {m}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* ===== MODEL ===== */}
        <div className="flex flex-col relative" ref={modelRef}>
          <label className="text-red-600 font-medium mb-1">Model</label>
          <input
            name="machineModel"
            value={form.machineModel}
            onChange={(e) => {
              handleChange(e);
              setModelInput(e.target.value);
              if (form.machineName) {
                setShowModelDropdown(true);
              }
            }}
            onFocus={() => {
              if (form.machineName) {
                setShowModelDropdown(true);
                console.log("📋 Showing models:", filteredModels);
              }
            }}
            onKeyDown={handleModelKeyDown}
            placeholder={form.machineName ? "Select model..." : "Select machine first"}
            disabled={!form.machineName}
            className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${!form.machineName ? "bg-gray-100 " : ""
              }`}
          />

          {/* Model Dropdown */}
          {showModelDropdown && form.machineName && (
            <div className="absolute top-full left-0 right-0 mt-1 border border-gray-300 rounded-md max-h-40 overflow-y-auto bg-white shadow-lg z-50">
              {filteredModels.length === 0 ? (
                <div className="px-4 py-2 text-gray-500 italic">No model added for {form.machineName}</div>
              ) : (
                filteredModels.map((mod, idx) => (
                  <div
                    key={mod}
                    onClick={() => selectModel(mod)}
                    className={`px-4 py-2 cursor-pointer ${idx === modelHighlightIndex ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                  >
                    {mod}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* ===== DATE AND ESTIMATE NO ===== */}
        <div className="flex flex-col md:flex-row md:items-start md:space-x-4 col-span-1 md:col-span-2 gap-4">
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

          <div className="flex-1 flex flex-col">
            <label className="text-purple-600 font-medium mb-1">Estimate No</label>
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

export default EstimateMachineInfo;