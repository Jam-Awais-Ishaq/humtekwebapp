// src/components/EstimatePreview.jsx
import React from "react";
import { generateEstimatePDF } from "../utils/estimatePDF";

const EstimatePreview = ({ estimate }) => {
  const handlePreview = () => {
    const doc = generateEstimatePDF(estimate, true); // true = preview mode
    window.open(doc.output("bloburl")); // Open in new tab
  };

  return (
    <div className="p-4">
      <button
        onClick={handlePreview}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Preview PDF
      </button>
    </div>
  );
};

export default EstimatePreview;
