import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateEstimatePDF = (estimate) => {
  const doc = new jsPDF();

  // --- HEADER FIELDS (plain text) ---
  doc.setFontSize(14);
  doc.text("ESTIMATE", 14, 18);

  doc.setFontSize(11);
  doc.text(`Company: HUMTEK SOLUTIONS`, 14, 28);
  doc.text(`Estimate No: ${estimate.estimateNo || "-"}`, 14, 36);
  doc.text(`Estimate Date: ${estimate.estimateDate || "-"}`, 14, 44);
  doc.text(`Valid Till: ${estimate.validTill || "-"}`, 14, 52);

  // --- CUSTOMER / JOB FIELDS ---
  doc.text(`Bank Name: ${estimate.bankName || "-"}`, 14, 64);
  doc.text(`Branch Name: ${estimate.branchName || "-"}`, 14, 72);
  doc.text(`Branch Address: ${estimate.branchAddress || "-"}`, 14, 80);
  doc.text(`Complaint No: ${estimate.complaintNo || "-"}`, 14, 88);
  doc.text(`Machine: ${estimate.machine || "-"}`, 14, 96);
  doc.text(`Model: ${estimate.model || "-"}`, 14, 104);

  // --- PARTS TABLE ---
  autoTable(doc, {
    startY: 114,
    head: [['Part Name', 'Qty', 'Price', 'Total']],
    body: (estimate.items || []).map(item => [
      item.name || "-",
      item.qty || 0,
      item.price || 0,
      item.total || 0,
    ]),
  });

  // --- TOTAL CALCULATION SECTION ---
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.text(`Subtotal: Rs. ${estimate.subtotal || 0}`, 14, finalY);
  doc.text(`Tax (${estimate.tax || 0}%): Rs. ${estimate.taxAmount || 0}`, 14, finalY + 8);
  doc.text(`Grand Total: Rs. ${estimate.total || 0}`, 14, finalY + 16);

  // --- FOOTER NOTES ---
  const footerY = finalY + 32;
  doc.text(`Note: ${estimate.note || "-"}`, 14, footerY);
  doc.text(`Terms: ${estimate.terms || "-"}`, 14, footerY + 8);

  doc.save(`estimate_${estimate.id || "file"}.pdf`);
};
