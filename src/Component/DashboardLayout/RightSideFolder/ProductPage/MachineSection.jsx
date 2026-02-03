import { useEffect, useRef, useState } from "react";
const MachineSection = ({ invoice, setInvoice, categories }) => {
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Filter categories based on input
  useEffect(() => {
    if (!search) {
      setFilteredCategories(categories);
      return;
    }
    const filtered = categories.filter((cat) =>
      cat.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [search, categories]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1️⃣ Sync search input with invoice.category (for edit mode)
  useEffect(() => {
    setSearch(invoice.category || "");
  }, [invoice.category]);

  // 2️⃣ Select category function
  const selectCategory = (cat) => {
    setInvoice({
      ...invoice,
      category: cat,
      // reset machineModel ONLY if it was empty before
      machineModel: invoice.machineModel ? invoice.machineModel : "",
    });

    setSearch(cat);
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ===== GROUP 1: CATEGORY + MACHINE ===== */}
      <div className="flex gap-6">
        {/* ===== CATEGORY ===== */}
        <div className="relative flex-1" ref={dropdownRef}>
          <label className="font-semibold block mb-1">Category</label>
          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full px-3 py-3.5 border border-gray-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-500"
          />

          {showDropdown && filteredCategories.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded mt-1 shadow max-h-48 overflow-y-auto z-50">
              {filteredCategories.map((cat) => (
                <div
                  key={cat}
                  className="px-4 py-2 cursor-pointer hover:bg-green-300"
                  onClick={() => selectCategory(cat)}>
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== MACHINE MODEL (TEXT INPUT) ===== */}
        {/* <div className="flex-1">
          <label className="font-semibold block mb-1">Machine Model</label>
          <input
            type="text"
            placeholder="Type machine model..."
            value={invoice.machineModel}
            onChange={(e) =>
              setInvoice({ ...invoice, machineModel: e.target.value })
            }
            className="w-full px-3 py-3 border border-gray-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-500"
          />
        </div> */}
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

      {/* ===== GROUP 2: PARTS + SERIAL ===== */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        {/* MACHINE SERIAL */}

      </div>
    </div>
  );
};

export default MachineSection;
