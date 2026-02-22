import { useContext, useState } from "react";
import { Context } from "../../../../Context/ContextProvider";

const AddMachineForm = () => {
  const [category, setCategory] = useState("");
  const [model, setModel] = useState("");
  const { machines, setMachines } = useContext(Context);

  const handleAdd = () => {
    if (!category.trim() || !model.trim()) {
      alert("Please enter both category and model");
      return;
    }
    const currentMachines = machines || [];

    // Case insensitive search
    const existingCategoryIndex = currentMachines.findIndex(
      (m) => m.category.toLowerCase().trim() === category.toLowerCase().trim()
    );

    let updatedMachines;

    if (existingCategoryIndex !== -1) {
      // Category exists - add model if not exists
      const existingCategory = currentMachines[existingCategoryIndex];
      
      if (!existingCategory.models.some(m => m.toLowerCase().trim() === model.toLowerCase().trim())) {
        updatedMachines = [...currentMachines];
        updatedMachines[existingCategoryIndex] = {
          ...existingCategory,
          models: [...existingCategory.models, model]
        };
        setMachines(updatedMachines);
        alert(`Model "${model}" added successfully!`);
      } else {
        alert(`Model "${model}" already exists in this category!`);
        return;
      }
    } else {
      // Create new category
      updatedMachines = [...currentMachines, { 
        category: category.trim(), 
        models: [model.trim()] 
      }];
      setMachines(updatedMachines);
      alert(`New category "${category}" created with model "${model}"!`);
    }

    setCategory("");
    setModel("");
  };

  return (
    <div className="p-4 mb-6 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-3">Add Machine Category & Model</h3>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Machine Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Machine Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-3 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Add Machine
      </button>
    </div>
  );
};

export default AddMachineForm;