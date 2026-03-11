import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { createRoot } from 'react-dom/client';
import InvoiceLayout from "../pdfHtmlLayout/InvoiceLayout"; // 🔹 NEW CODE

export const generateInvoicePDF = (invoice,customer) => {
  return new Promise((resolve, reject) => {
    let root = null;
    let container = null;

    try {
      container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = "794px"; 
      document.body.appendChild(container);

      root = createRoot(container);
      root.render(<InvoiceLayout invoice={invoice}  />);

      setTimeout(async () => {
        try {
          // 🔹 Wait for images to load
          const images = container.querySelectorAll("img");
          const imagePromises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(res => {
              img.onload = res;
              img.onerror = res;
            });
          });
          await Promise.all(imagePromises);

          // 🔹 Capture as canvas
          const canvas = await html2canvas(container, {
            scale: 2,       // High resolution for print
            useCORS: true,
            allowTaint: true,
            logging: false,
          });

          const imgData = canvas.toDataURL("image/png");

          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

          pdf.save(`invoice_${invoice.id}.pdf`);
          resolve();
        } catch (err) {
          console.error("Error generating PDF:", err);
          reject(err);
        } finally {
          // 🔹 Cleanup
          try {
            if (root) root.unmount();
            if (container && document.body.contains(container)) {
              document.body.removeChild(container);
            }
          } catch (e) {
            console.warn("Cleanup failed:", e);
          }
        }
      }, 1500); // Give time for layout/images
    } catch (err) {
      console.error("Error setting up PDF generation:", err);
      try {
        if (root) root.unmount();
        if (container && document.body.contains(container)) {
          document.body.removeChild(container);
        }
      } catch (e) {}
      reject(err);
    }
  });
};
