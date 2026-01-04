import React, { useContext, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../../common/Modal";
import InvoiceView from "./InvoiceView";
import { Context } from "../../../Context/ContextProvider";
import BankServiceInvoiceForm from "./ProductPage/BankServiceInvoiceForm";

const InvoicesPage = () => {

  const { invoices, setInvoices, openModal, setOpenModal, showStatusModal, editInvoice, setEditInvoice, isEditMode, setIsEditMode } = useContext(Context);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [search, setSearch] = useState("");

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.branch.toLowerCase().includes(search.toLowerCase()) ||
      inv.bankName.toLowerCase().includes(search.toLowerCase()) ||
      inv.product.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this invoice?")) {
      setInvoices(invoices.filter((inv) => inv.id !== id));
    }
  };

  const handleEditsInvoice = (invoice) => {
    // Navigate to edit page

    setEditInvoice(invoice);
    setIsEditMode(true);
    setOpenModal(true);
  }

  return (
    <>
      <div className="p-6 space-y-6">
        {/* 🔹 HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
            <p className="text-sm text-gray-500">
              Manage all banking service invoices
            </p>
          </div>

          {/* 🔍 SEARCH */}
          <input
            type="text"
            placeholder="Search by bank, branch or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2.5 border rounded-lg
          focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        {/* 🔹 TABLE CARD */}
        <div className="bg-white rounded-lg pb-0.5 shadow-lg border border-gray-300 overflow-hidden">
          {/* TABLE SCROLL */}
          <div className="max-h-105 overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">Bank</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Branch</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">
                    Branch Code
                  </th>
                  <th className="px-2 py-3 font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-700">
                    Service
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="px-4 py-3 font-semibold text-gray-700 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredInvoices.length ? (
                  filteredInvoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium">
                        {inv.bankName}
                      </td>
                      <td className="px-4 py-3">{inv.branch}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {inv.branchCode}
                      </td>
                      <td className="px-4 py-3">{inv.product}</td>

                      {/* SERVICE BADGE */}
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold
                      bg-blue-100 text-blue-700">
                          {inv.serviceType}
                        </span>
                      </td>

                      {/* AMOUNT */}
                      <td className="px-4 py-3 font-semibold text-green-600">
                        Rs. {inv.amount.toLocaleString(inv)}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleView(inv)}
                            className="p-2 rounded-full hover:bg-blue-100 text-blue-600 cursor-pointer transition"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleEditsInvoice(inv)}
                            className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600 cursor-pointer transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(inv.id)}
                            className="p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-6 text-gray-500"
                    >
                      No invoices found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={openModal} onClose={() => { setOpenModal(false); setIsEditMode(false); setEditInvoice(null); }}>
        {isEditMode ? (

          <BankServiceInvoiceForm
            editInvoice={editInvoice}
            onClose={() => {
              setOpenModal(false);
              setIsEditMode(false);
              setEditInvoice(null);
            }}
          />) : (

          <InvoiceView
            invoice={selectedInvoice}
            onClose={() => setOpenModal(false)}
          />)}
      </Modal>
    </>
  );
};

export default InvoicesPage;