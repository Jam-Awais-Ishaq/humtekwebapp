import React from "react";
import { motion } from "framer-motion";
import { Eye, Download } from "lucide-react";

export const RecentInvoices = () => {
  const invoices = [
    {
      id: "INV-1001",
      client: "Alpha Traders",
      date: "12 Sep 2025",
      amount: "$1,200",
      status: "Paid",
    },
    {
      id: "INV-1002",
      client: "Beta Solutions",
      date: "15 Sep 2025",
      amount: "$860",
      status: "Pending",
    },
    {
      id: "INV-1003",
      client: "Gamma Corp",
      date: "18 Sep 2025",
      amount: "$2,450",
      status: "Paid",
    },
    {
      id: "INV-1004",
      client: "Delta Agency",
      date: "20 Sep 2025",
      amount: "$640",
      status: "Pending",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-0 p-4"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-3xl font-bold text-gray-600">
          Recent Invoices
        </h2>
        <button className="text-sm text-purple-600 hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="py-3">Invoice</th>
              <th>Client</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice, index) => (
              <motion.tr
                key={invoice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ backgroundColor: "#a6a5a2" }}
                className="border-b last:border-none"
              >
                <td className="py-3 font-medium">
                  {invoice.id}
                </td>
                <td>{invoice.client}</td>
                <td>{invoice.date}</td>
                <td className="font-semibold">
                  {invoice.amount}
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="text-right space-x-3">
                  <button className="text-gray-500 hover:text-purple-600 transition">
                    <Eye size={18} />
                  </button>
                  <button className="text-gray-500 hover:text-green-600 transition">
                    <Download size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};