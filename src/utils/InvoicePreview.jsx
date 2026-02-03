import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceLayout from "../pdfHtmlLayout/InvoiceLayout";

const InvoicePreview = ({ invoice }) => {
  const ref = useRef();

  const handlePreview = async () => {
    const canvas = await html2canvas(ref.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice_${invoice.id}.pdf`);
  };

  return (
    <div>
      <div ref={ref}>
        <InvoiceLayout invoice={invoice} />
      </div>

      <button
        onClick={handlePreview}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-4"
      >
        Preview & Download PDF
      </button>
    </div>
  );
};

export default InvoicePreview;
