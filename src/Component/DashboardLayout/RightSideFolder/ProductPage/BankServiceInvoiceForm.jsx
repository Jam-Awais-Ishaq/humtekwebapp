import { useContext, useEffect, useState } from "react";
import { Context } from "../../../../Context/ContextProvider";
import BankInfoSection from "./BankInfoSection";
import MachineSection from "./MachineSection";
import ServiceSection from "./ServiceSection";
import { getMachines, createInvoice, updateInvoice } from "../../../../api/AuthApi";
const BankServiceInvoiceForm = ({ editInvoice, onClose }) => {
  const { invoices, setInvoices, showStatusModal, machines, setMachines } = useContext(Context);
  const isEditMode = Boolean(editInvoice);

  const [invoice, setInvoice] = useState(
    editInvoice
      ? { ...editInvoice, parts: editInvoice.parts || [], selectedMachines: editInvoice.selectedMachines || [], invoiceDate: editInvoice.invoiceDate ? editInvoice.invoiceDate.split("T")[0] : "" }
      : {
        bankName: "",
        branchCode: "",
        machineModel: "",
        discount: 0,
        qty: 0,
        invoiceDate: "",
        amount: 0,
        tax: 0,
        status: "Pending",
        category: "",
        selectedMachines: [],
        parts: [],
      }
  );
  const handleChange = (e) => { setInvoice({ ...invoice, [e.target.name]: e.target.value }); };
  const totalAmount = Number(invoice.amount) + (Number(invoice.amount) * Number(invoice.tax)) / 100;
  const partsTotal = (invoice.parts || []).reduce((sum, p) => sum + Number(p.total || 0), 0);
  const serviceTotal = Number(invoice.amount) + (Number(invoice.amount) * Number(invoice.tax)) / 100;
  const finalTotal = serviceTotal + partsTotal;
  const generateInvoiceNumber = () => {
    const last = Number(localStorage.getItem("lastInvoiceNo")) || 0;
    const next = last + 1;
    localStorage.setItem("lastInvoiceNo", next);
    return `HS${String(next).padStart(3, "0")}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        ...invoice,
        totalAmount: finalTotal,
      };
      if (editInvoice) {
        const updated = await updateInvoice(editInvoice.id, payload);
        setInvoices(prev =>
          prev.map(inv => inv.id === editInvoice.id ? updated : inv)
        );

      } else {

        const created = await createInvoice(payload);

        setInvoices(prev => [created, ...prev]);

      }

      if (typeof showStatusModal === "function") {
        showStatusModal({
          type: "success",
          title: editInvoice ? "Invoice Updated" : "Invoice Created",
          message: editInvoice
            ? "Invoice updated successfully."
            : "Invoice created successfully.",
        });
      }

      if (typeof onClose === "function") {
        onClose();
      }

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchMachines = async () => {
      const machinesFromBackend = await getMachines();
      setMachines(machinesFromBackend);
    };
    fetchMachines();
  }, []);
  return (
    <div className="max-w-5xl mx-auto bg-white p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Banking Machine Service Invoice</h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* BANK INFO */}
        <BankInfoSection invoice={invoice} handleChange={handleChange} />
        {/* MACHINE INFO */}
        <MachineSection invoice={invoice} setInvoice={setInvoice} machines={machines} />
        {/* SERVICE INFO */}
        <ServiceSection invoice={invoice} setInvoice={setInvoice} handleChange={handleChange} totalAmount={totalAmount} isEditMode={isEditMode} />
      </form>
    </div>
  );
};
export default BankServiceInvoiceForm;