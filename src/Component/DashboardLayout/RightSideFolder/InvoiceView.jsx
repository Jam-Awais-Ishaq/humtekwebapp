// InvoiceView.jsx
import React, { useContext } from "react";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import { Context } from "../../../Context/ContextProvider";
import { generateInvoicePDF } from "../../../utils/invoicePDF";


const InvoiceView = ({ invoice, onClose }) => {
    if (!invoice) return null;
    const { showStatusModal } = useContext(Context);

    const handleGenericAlert = async () => {
        await generateInvoicePDF(invoice);

        if (typeof showStatusModal === "function") {
            showStatusModal({
                type: "info",
                title: "Download Complete",
                message: "PDF downloaded Successfully.",
                primaryButtonText: "OK",
            });
        }
    };
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2 text-sm">
                <Info label="Bank Name" value={invoice.bankName} />
                <Info label="Branch Code" value={invoice.branchCode} />
                <Info label="Category" value={invoice.category} />
                <Info label="Product Model" value={invoice.productModel} />
                <Info label="Machine Serial" value={invoice.machineSerial} />
                <Info label="Invoice Date" value={invoice.invoiceDate || "-"} />
                <Info label="Service Charges Amount" value={`Rs. ${invoice.amount?.toLocaleString() || 0}`} />
                <Info label="Total Amount" value={`Rs. ${invoice.totalAmount?.toLocaleString() || 0}`} />
            </div>
            <Info label="Status" value={invoice.status || "Pending"} />

            {/* ===== PARTS TABLE ===== */}
            {invoice.parts?.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">Parts Details</h3>

                    <table className="w-full border text-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Qty</th>
                                <th className="border p-2">HS Code</th>
                                <th className="border p-2">Unit Price</th>
                                <th className="border p-2">Tax %</th>
                                <th className="border p-2">Total per Unit</th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoice.parts.map((part, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{part.name}</td>
                                    <td className="border p-2">{part.qty}</td>
                                    <td className="border p-2">{part.hsCode || "-"}</td>
                                    <td className="border p-2">Rs. {part.unitPrice}</td>
                                    <td className="border p-2">{part.tax}%</td>
                                    <td className="border p-2 font-semibold">Rs. {part.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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