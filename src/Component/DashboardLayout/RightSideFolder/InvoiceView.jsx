// InvoiceView.jsx
import React, { useContext } from "react";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import { Context } from "../../../Context/ContextProvider";
import { generateInvoicePDF } from "../../../utils/invoicePDF";
const InvoiceView = ({ invoice, onClose }) => {
    if (!invoice) return null;
    const { showStatusModal } = useContext(Context);

    const handleGenericAlert = () => {

        generateInvoicePDF(invoice)

        showStatusModal({
            type: "info",
            title: "Download Complete",
            message: "PDF downloaded SuccessFully.",
            primaryButtonText: "OK",
        })
    }
    return (
        <div className="w-full max-w-3xl bg-white p-6  animate-fadeIn">

            {/* HEADER */}
            <div className="fl border-b pb-3 mb-6">
                <div className="w-full">
                    <h2 className="text-3xl text-center font-bold text-gray-800">Invoice Details</h2>
                    <p className="text-sm text-gray-500 text-center">Banking Machine Service Invoice</p>
                </div>
            </div>

            {/* INFO GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Info label="Bank Name" value={invoice.bankName} />
                <Info label="Branch Code" value={invoice.branch} />
                <Info label="Category" value={invoice.category} />
                <Info label="Machine Model" value={invoice.product} />
                <Info label="Parts" value={invoice.parts} />
                <Info label="Machine Serial" value={invoice.machineSerial} />
                <Info label="Service Type" value={invoice.serviceType} />
                <Info label="Service Date" value={invoice.serviceDate || "-"} />
                <Info label="Invoice Date" value={invoice.invoiceDate || "-"} />
                <Info label="Due Date" value={invoice.dueDate || "-"} />
                <Info label="Amount" value={`Rs. ${invoice.amount?.toLocaleString() || 0}`} />
                <Info label="Tax (%)" value={invoice.tax || 0} />
                <Info label="Total Amount" value={`Rs. ${invoice.totalAmount?.toLocaleString() || 0}`} />
                <Info label="Status" value={invoice.status || "Pending"} />
            </div>

            {/* DESCRIPTION */}
            {invoice.serviceDescription && (
                <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-700">Service Description</p>
                    <p className="text-sm text-gray-600 mt-1">{invoice.serviceDescription}</p>
                </div>
            )}

            {/* ACTIONS */}
            <div className="mt-6 flex justify-end gap-3">
                <button
                    onClick={() => handleGenericAlert()}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                     bg-red-600 text-white hover:bg-red-700 cursor-pointer transition shadow"
                >
                    <FaFilePdf />
                    Download PDF
                </button>

                <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default InvoiceView;

const Info = ({ label, value }) => (
    <div className="bg-gray-300 p-3 rounded-lg border border-gray-100">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-800 mt-1">{value}</p>
    </div>
);