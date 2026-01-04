import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (invoice) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Invoice Details", 14, 22);
  doc.setFontSize(12);
  doc.text(`Bank Name: ${invoice.bankName}`, 14, 32);
  doc.text(`Branch: ${invoice.branch}`, 14, 40);
  doc.text(`Branch Code: ${invoice.branchCode}`, 14, 48);
  doc.text(`Machine Model: ${invoice.product}`, 14, 56);
  doc.text(`Service Type: ${invoice.serviceType}`, 14, 64);
  doc.text(`Service Date: ${invoice.serviceDate || "-"}`, 14, 72);
  doc.text(`Invoice Date: ${invoice.invoiceDate || "-"}`, 14, 80);
  doc.text(`Due Date: ${invoice.dueDate || "-"}`, 14, 88);
  doc.text(`Amount: Rs. ${invoice.amount?.toLocaleString() || 0}`, 14, 96);
  doc.text(`Tax (%): ${invoice.tax || 0}`, 14, 104);
  doc.text(`Total Amount: Rs. ${invoice.totalAmount?.toLocaleString() || 0}`, 14, 112);
  doc.text(`Status: ${invoice.status || "Pending"}`, 14, 120);

  // Use autoTable function imported separately
  autoTable(doc, {
    startY: 130,
    head: [['Service Description']],
    body: [
      [invoice.serviceDescription || "N/A"]
    ],
    styles: { fontSize: 10, cellWidth: 'wrap' },
    columnStyles: {
      0: { cellWidth: 180, cellPadding: 5 }
    }
  });

  doc.save(`invoice_${invoice.id}.pdf`);
};
