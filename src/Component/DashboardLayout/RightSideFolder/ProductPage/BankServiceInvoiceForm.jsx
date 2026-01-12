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
      // branch: "",
      branchCode: "",
      machineModel: "",
      machineSerial: "",
      serviceType: "Maintenance",
      serviceDescription: "",
      serviceDate: "",
      invoiceDate: "",
      dueDate: "",
      amount: "",
      tax: 0,
      status: "Pending",
      category: "",
      selectedMachines: [],
      parts: [],
      partsInput: "",
    }
  );

  const categories = {
    "Cash Deposit": ["CDM-200", "CDM-500", "CDM-Pro"],
    "ATM Machines": ["SL45", "SL60", "Hyosung MX280", "SL50"],
    "Cheque Machines": ["Cheque-Scan-100", "Cheque-Max"],
  };

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const totalAmount =
    Number(invoice.amount) + (Number(invoice.amount) * Number(invoice.tax)) / 100;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInvoice = {
      ...invoice,
      id: editInvoice ? editInvoice.id : Date.now(),
      totalAmount,
      product: invoice.selectedMachines.join(", "),
      // branch: invoice.branch,
      branchCode: invoice.branchCode,
      category: invoice.category,  // ← add this
      parts: invoice.parts,
    };

    if (editInvoice) {
      setInvoices(
        invoices.map((inv) => (inv.id === editInvoice.id ? newInvoice : inv))
      );
      showStatusModal({
        type: "success",
        title: "Invoice Updated",
        message: "Invoice successfully update ho gaya",
      });
    } else {
      setInvoices([...invoices, newInvoice]);
      showStatusModal({
        type: "success",
        title: "Invoice Created",
        message: "Invoice successfully create ho gaya",
      });
    }

    onClose();
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Banking Machine Service Invoice
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* BANK INFO */}
        <BankInfoSection invoice={invoice} handleChange={handleChange} />

        {/* MACHINE INFO */}
        <MachineSection
          invoice={invoice}
          setInvoice={setInvoice}
          categories={categories}
        />

        {/* SERVICE INFO */}
        <ServiceSection invoice={invoice} handleChange={handleChange} totalAmount={totalAmount} isEditMode={isEditMode} />
      </form>
    </div>
  );
};

export default BankServiceInvoiceForm;
