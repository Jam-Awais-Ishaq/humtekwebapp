import { useContext, useState } from "react";
import { Context } from "../../../../Context/ContextProvider";
import BankInfoSection from "./BankInfoSection";
import MachineSection from "./MachineSection";
import ServiceSection from "./ServiceSection";
const BankServiceInvoiceForm = ({ editInvoice, onClose }) => {
  const { invoices, setInvoices, showStatusModal } = useContext(Context);
  const isEditMode = Boolean(editInvoice);
  // === SINGLE STATE ===
  const [invoice, setInvoice] = useState(
    editInvoice || {
      bankName: "",
      branchCode: "",
      machineModel: "",
      machineSerial: "",
      qty: 0,
      invoiceDate: "",
      amount: "",
      tax: 0,
      status: "Pending",
      category: "",
      selectedMachines: [],
      parts: [],
    }
  );
  const categories = ["Counting Machine", "Bundle Binding Machines", "Shrink Wraping Machines", "Stuffing Machines",];
  const handleChange = (e) => { setInvoice({ ...invoice, [e.target.name]: e.target.value }); };
  const totalAmount = Number(invoice.amount) + (Number(invoice.amount) * Number(invoice.tax)) / 100;
  const partsTotal = invoice.parts.reduce((sum, p) => sum + Number(p.total || 0), 0);
  const serviceTotal = Number(invoice.amount) + (Number(invoice.amount) * Number(invoice.tax)) / 100;
  const finalTotal = serviceTotal + partsTotal;
  const generateInvoiceNumber = () => {
    const last = Number(localStorage.getItem("lastInvoiceNo")) || 0;
    const next = last + 1;
    localStorage.setItem("lastInvoiceNo", next);
    return `HS${String(next).padStart(3, "0")}`;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newInvoice = {
      ...invoice,
      id: editInvoice ? editInvoice.id : Date.now(),
      totalAmount: finalTotal,
      invoiceNumber: editInvoice
        ? editInvoice.invoiceNumber
        : generateInvoiceNumber(),
      productModel: invoice.machineModel,
      branchCode: invoice.branchCode,
      qty: invoice.qty,
      category: invoice.category,
      parts: invoice.parts,
    };
    if (editInvoice) {
      setInvoices(
        invoices.map((inv) => (inv.id === editInvoice.id ? newInvoice : inv))
      );
    } else {
      setInvoices([...invoices, newInvoice]);
      if (typeof showStatusModal === "function") {
        showStatusModal({
          type: "success",
          title: editInvoice ? "Invoice Updated" : "Invoice Created",
          message: editInvoice ? "Invoice updated successfully." : "Invoice created successfully.",
        });
      };
    }
    if (typeof onClose === "function") { onClose(); }
  };
  return (
    <div className="max-w-5xl mx-auto bg-white p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Banking Machine Service Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* BANK INFO */}
        <BankInfoSection invoice={invoice} handleChange={handleChange} />
        {/* MACHINE INFO */}
        <MachineSection invoice={invoice} setInvoice={setInvoice} categories={categories}/>
        {/* SERVICE INFO */}
        <ServiceSection invoice={invoice} setInvoice={setInvoice} handleChange={handleChange} totalAmount={totalAmount} isEditMode={isEditMode} />
      </form>
    </div>
  );
};
export default BankServiceInvoiceForm;