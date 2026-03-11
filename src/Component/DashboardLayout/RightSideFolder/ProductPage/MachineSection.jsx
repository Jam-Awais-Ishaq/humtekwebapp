import { useState, useRef, useEffect, useMemo } from "react";

const MachineSection = ({ invoice, setInvoice, machines }) => {
  const [searchCategory, setSearchCategory] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const categoryRef = useRef(null);
  const modelRef = useRef(null);

  // Debug: Check machines data
  useEffect(() => {
  }, [machines]);

  // ===== derive categories dynamically =====
  const categories = useMemo(() => {
    if (!machines || machines.length === 0) {
      return [];
    }
    const cats = [...new Set(machines.map(m => m.category))];
    return cats;
  }, [machines]);

  // ===== 🔥 FIXED: Get models for selected category =====
  const getModelsForCategory = () => {
    if (!invoice.category || !machines || machines.length === 0) {
      return [];
    }

    // Find the category object (case insensitive)
    const selectedCategory = machines.find(
      m => m.category.toLowerCase().trim() === invoice.category.toLowerCase().trim()
    );


    if (!selectedCategory) {
      return [];
    }

    return selectedCategory.models || [];
  };

  // ===== filtered models with search =====
  const filteredModels = useMemo(() => {
    const allModels = getModelsForCategory();

    if (!searchModel) {
      return allModels;
    }

    return allModels.filter(mod =>
      mod.toLowerCase().includes(searchModel.toLowerCase())
    );
  }, [machines, invoice.category, searchModel]);

  // ===== Close dropdowns if clicked outside =====
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShowCategoryDropdown(false);
      }
      if (modelRef.current && !modelRef.current.contains(e.target)) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ===== Sync category and model input on edit =====
  useEffect(() => {
    setSearchCategory(invoice.category || "");
  }, [invoice.category]);

  useEffect(() => {
    setSearchModel(invoice.machineModel || "");
  }, [invoice.machineModel]);

  // ===== Select category =====
  const selectCategory = (cat) => {
    setInvoice({
      ...invoice,
      category: cat,
      machineModel: "", // reset model when category changes
    });
    setSearchCategory(cat);
    setShowCategoryDropdown(false);
    setSearchModel(""); // reset search model
  };

  // ===== Select model =====
  const selectModel = (mod) => {
    setInvoice({
      ...invoice,
      machineModel: mod,
    });
    setSearchModel(mod);
    setShowModelDropdown(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ===== GROUP 1: CATEGORY + MODEL ===== */}
      <div className="flex gap-6">
        {/* CATEGORY */}
        <div className="relative flex-1" ref={categoryRef}>
          <label className="font-semibold block mb-1">Category</label>
          <input
            type="text"
            placeholder="Search category..."
            value={searchCategory}
            onChange={(e) => {
              setSearchCategory(e.target.value);
              setShowCategoryDropdown(true);
            }}
            onFocus={() => setShowCategoryDropdown(true)}
            className="w-full px-3 py-3.5 border border-gray-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-500"
          />

          {showCategoryDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded mt-1 shadow max-h-48 overflow-y-auto z-50">
              {categories.length === 0 && (
                <div className="px-4 py-2 text-gray-500 italic">No category added</div>
              )}
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="px-4 py-2 cursor-pointer hover:bg-green-300"
                  onClick={() => selectCategory(cat)}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODEL */}
        <div className="relative flex-1" ref={modelRef}>
          <label className="font-semibold block mb-1">Machine Model</label>
          <input
            type="text"
            placeholder="Type or search model..."
            value={searchModel}
            onChange={(e) => {
              setSearchModel(e.target.value);
              setShowModelDropdown(true);
            }}
            onFocus={() => setShowModelDropdown(true)}
            className="w-full px-3 py-3 border border-gray-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-500"
          />

          {showModelDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded mt-1 shadow max-h-48 overflow-y-auto z-50">
              {filteredModels.length === 0 && (
                <div className="px-4 py-2 text-gray-500 italic">
                  {invoice.category
                    ? "No model added for this category"
                    : "Select a category first"}
                </div>
              )}
              {filteredModels.map((mod) => (
                <div
                  key={mod}
                  className="px-4 py-2 cursor-pointer hover:bg-green-300"
                  onClick={() => selectModel(mod)}
                >
                  {mod}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== GROUP 2: SERIAL ===== */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-1">Discount</label>
          <input
            type="number"
            name="discount"
            placeholder="ATM-45872"
            value={invoice.discount}
            onChange={(e) =>
              setInvoice({ ...invoice, discount: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
        </div>
      </div>
    </div>
  );
};
export default MachineSection;