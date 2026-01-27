
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/PDFLogo.png";
import stamp from "../assets/stamp.png";


function numberToWords(num) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const convert = (n) => {
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
    if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
    if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
    return "";
  };

  return convert(Math.floor(num)) + " Rupees Only";
}

export const generateEstimatePDF = (estimate, preview = false) => {

  // PDF document create
  const doc = new jsPDF();

  // =================================================
  // ================= HEADER SECTION =================
  // =================================================

  // ---- Logo add (top-left) ----
  // x=10, y=18, width=20, height=20
  doc.addImage(logo, "PNG", 10, 18, 20, 20);

  // ---- Company Name Font ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(40);
  doc.setTextColor(30, 30, 30);

  // ---- Company Name Text ----
  const text = "HUMTEK SOLUTIONS";
  const x = 105; // page ka center (A4 width ≈ 210)
  const y = 32;

  // Center aligned company name
  doc.text(text, x, y, { align: "center" });

  // ---- Underline sirf company name ke neechay ----
  const textWidth = doc.getTextWidth(text); // text ki width calculate

  doc.setDrawColor(0, 0, 0); // black line
  doc.setLineWidth(1);       // line thickness

  doc.line(
    x - textWidth / 2, // start X
    y + 2,             // thora neeche
    x + textWidth / 2, // end X
    y + 2
  );

  // =================================================
  // ================= TOP META INFO =================
  // =================================================

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(50, 50, 50);

  const leftX = 14;   // left column start
  const rightX = 120; // right column start
  const startY = 45; // common Y start

  // ---------------- LEFT SIDE ----------------
  doc.setFont("helvetica", "bold");
  doc.text("Bank Name", leftX, startY);

  doc.setFont("helvetica", "normal");
  doc.text(estimate.bankName || "-", leftX, startY + 7);

  doc.setFont("helvetica", "bold");
  doc.text("Branch Name", leftX, startY + 18);

  doc.setFont("helvetica", "normal");
  doc.text(estimate.branchName || "-", leftX, startY + 25);

  doc.setFont("helvetica", "bold");
  doc.text("Complaint No", leftX, startY + 36);

  doc.setFont("helvetica", "normal");
  doc.text(estimate.complaintNo || "-", leftX, startY + 43);

  // ---------------- RIGHT SIDE ----------------

  // ===== Part / Estimate # =====
  const lineGap = 6;  // har line ka vertical gap

  // ===== Part / Estimate # =====
  doc.setFont("helvetica", "bold");
  doc.text(`Part / Estimate # : ${estimate.estimateNo || "-"}`, rightX, startY);

  // ===== Estimate Date =====
  doc.setFont("helvetica", "bold");
  doc.text(`Estimate Date : ${estimate.estimateDate || "-"}`, rightX, startY + 1 * lineGap);

  // ===== NTN # =====
  doc.setFont("helvetica", "bold");
  doc.text("NTN # : 9731807-8", rightX, startY + 2 * lineGap);

  // ===== Machine =====
  doc.setFont("helvetica", "bold");
  doc.text("Machine Name:", rightX, startY + 3 * lineGap);

  doc.setFont("helvetica", "normal");
  doc.text(`${estimate.machine || "-"}`, rightX + 13, startY + 4 * lineGap);

  // ===== Model =====
  doc.setFont("helvetica", "bold");
  doc.text("Model :", rightX, startY + 5 * lineGap);

  doc.setFont("helvetica", "normal");
  doc.text(`${estimate.model || "-"}`, rightX + 13, startY + 6 * lineGap);


  // ===== SPACE AFTER LEFT & RIGHT SECTIONS =====
  let currentY = startY + 50;
  currentY += 10; // company ke neeche gap (adjust 12–20)

  // ===== ESTIMATE HEADING =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("Estimate", 105, currentY, { align: "center" });
  // 👇 Estimate ke neeche space
  currentY += 8;

  // ===== DESCRIPTION =====
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setLineHeightFactor(1.6);
  // ===== BORDER START POINT =====
  const borderStartY = currentY;

  const descText = "Dear Sir, \n After detail inspection of machine, the engineer has suggested the following parts/consumable need to be replaced";

  const descLines = doc.splitTextToSize(descText, 180);

  doc.text(descLines, 105, currentY, { align: "center" });

  // description ke neeche space
  currentY += descLines.length * 7;


  // =================================================
  // ================= PARTS TABLE ===================
  // =================================================

  // ================= GRAND TOTAL =================
  // let grandTotal = 0;
  const grandTotal = (estimate.items || []).reduce((sum, item) => {
    const qty = Number(item.qty) || 0;
    const price = Number(item.price) || 0;
    const tax = Number(item.tax) || 0;

    const subTotal = qty * price;
    const taxAmount = (subTotal * tax) / 100;

    return sum + subTotal + taxAmount;
  }, 0);

  autoTable(doc, {
    startY: currentY,

    margin: { left: 12, right: 12 },
    tableWidth: 186,

    head: [["Sr#", "PARTS/CONSUMABLES", "QTY", "UNIT PRICE", "Tax", "TOTAL PRICE"]],

    body: (estimate.items || []).map((item, index) => {
      const qty = Number(item.qty) || 0;
      const price = Number(item.price) || 0;
      const tax = Number(item.tax) || 0;

      const subTotal = qty * price;
      const taxAmount = (subTotal * tax) / 100;
      const total = subTotal + taxAmount;
      return [
        index + 1,
        item.partName || "-",   // ✅ FIXED
        qty,
        price,
        tax,
        total.toFixed(2),       // ✅ FIXED
      ];
    }),


    theme: "plain", // default borders remove
    styles: {
      fillColor: false,
      textColor: 50,
      fontSize: 10,
      halign: "center",
      valign: "middle",
      cellPadding: 3,
      overflow: "linebreak", // long text wrap
    },
    headStyles: {
      fillColor: false,
      textColor: 0,
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
      lineWidth: 0.5,
    },

    columnStyles: {
      0: { cellWidth: 12 },   // Sr#
      1: { cellWidth: 80 },   // PARTS/CONSUMABLES (wide)
      2: { cellWidth: 18 },   // QTY
      3: { cellWidth: 26 },   // UNIT PRICE
      4: { cellWidth: 18 },   // TAX
      5: { cellWidth: 32 },   // TOTAL PRICE
    },

    didDrawCell: function (data) {
      const { cell, column, row } = data;

      doc.setDrawColor(0);
      doc.setLineWidth(0.5);

      // Left border of each cell
      doc.line(cell.x, cell.y, cell.x, cell.y + cell.height);

      // Right border for last column
      if (column.index === data.table.columns.length - 1) {
        doc.line(cell.x + cell.width, cell.y, cell.x + cell.width, cell.y + cell.height);
      }

      // Horizontal lines for header
      if (data.section === "head") {
        doc.line(cell.x, cell.y, cell.x + cell.width, cell.y); // top
        doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height); // bottom
      }

      // Bottom line for last row
      if (data.section === "body" && row.index === data.table.body.length - 1) {
        doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
      }
    }
  });

  // ================= NET PAYABLE ROW =================

  const rowY = doc.lastAutoTable.finalY + 0;
  const rowHeight = 8;
  const pageLeft = 12;
  const pageWidth = 186;

  // column widths
  const pkrColWidth = 14.5;
  const amountTextWidth = 89;
  const netPayLabelWidth = 46.5;

  // OUTER BORDER
  doc.setDrawColor(0);
  doc.setLineWidth(0.6);
  doc.rect(pageLeft, rowY, pageWidth, rowHeight);

  // PKR COLUMN (LEFT)
  doc.line(
    pageLeft + pkrColWidth,
    rowY,
    pageLeft + pkrColWidth,
    rowY + rowHeight
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("PKR", pageLeft + 2, rowY + 5);

  // AMOUNT IN WORDS COLUMN
  doc.line(
    pageLeft + pkrColWidth + amountTextWidth,
    rowY,
    pageLeft + pkrColWidth + amountTextWidth,
    rowY + rowHeight
  );

  const amountInWords = numberToWords(grandTotal);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.text(
    amountInWords,
    pageLeft + pkrColWidth + 9,
    rowY + 5
  );



  // NET PAYABLE LABEL COLUMN
  doc.line(
    pageLeft + pkrColWidth + amountTextWidth + netPayLabelWidth,
    rowY,
    pageLeft + pkrColWidth + amountTextWidth + netPayLabelWidth,
    rowY + rowHeight
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(
    "NET PAYABLE AMOUNT",
    pageLeft + pkrColWidth + amountTextWidth + 4,
    rowY + 5
  );
  // TOTAL AMOUNT (RIGHT ALIGN)

  doc.setFont("helvetica", "normal");
  doc.text(
    grandTotal.toFixed(2),
    pageLeft + pageWidth - 4,
    rowY + 5,
    { align: "right" }
  );



  // ===== BORDER END POINT =====
  const borderEndY = doc.lastAutoTable.finalY + 6;

  // ===== DRAW BORDER (360 DEG) =====
  doc.setDrawColor(0, 0, 0); // black border
  doc.setLineWidth(0.6);

  doc.rect(
    12,                    // X (left margin)
    borderStartY - 6,      // Y (thora upar)
    186,                   // Width (A4 - margins)
    borderEndY - borderStartY + 0 // Height (auto)
  );

  // Customer Approvale 

  const tableLeft = 12;
  const tableRight = 12 + 186;
  const approvalY = rowY + rowHeight + 30;
  const lineY = approvalY + 15;
  // Customer Approval — LEFT aligned

  doc.text("Customer Approval", tableLeft, approvalY);

  // Company Stamp — RIGHT aligned
  // doc.addImage(stamp, "PNG", 170, 180, 25, 25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(
    "Company Stamp",
    tableRight,
    approvalY,
    { align: "right" }
  );

  // ===== SYSTEM GENERATED NOTE (GRAY BACKGROUND) =====
  const noteText = "This is a system generated estimate & does not require signature";

  const noteHeight = 8;
  const noteY = lineY - noteHeight - 0; // line se thora upar

  // Light gray background
  doc.setFillColor(230, 230, 200); // light gray
  doc.rect(
    tableLeft,
    noteY,
    pageWidth,
    noteHeight,
    "F"
  );

  // Text
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(80);
  doc.text(
    noteText,
    tableLeft + pageWidth / 2,
    noteY + 5.5,
    { align: "center" }
  );


  // 1️⃣ Draw the horizontal line (full width)
  doc.setLineWidth(0.5);
  doc.line(tableLeft, lineY, tableLeft + pageWidth, lineY);

  // 2️⃣ Add centered text below the line
  const addressText = "A-396, Block-7, K.A.E.C.H.S KARACHI";
  const textY = lineY + 10; // thoda gap line ke neeche

  doc.setFont("Impact", "normal");
  doc.setFontSize(15);
  doc.text(addressText, tableLeft + pageWidth / 2, textY, { align: "center" });
  // ================= SAVE / PREVIEW =================
  if (preview) return doc;
  doc.save(`estimate_${estimate.id || "file"}.pdf`);
};