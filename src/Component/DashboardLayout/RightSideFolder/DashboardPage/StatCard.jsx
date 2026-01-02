import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";

export const StatCard = () => {
  const stats = [
    {
      title: "Total Invoices",
      value: "128",
      icon: <FileText size={28} />,
      bg: "from-blue-500 to-blue-700",
    },
    {
      title: "Total Revenue",
      value: "$12,450",
      icon: <DollarSign size={28} />,
      bg: "from-purple-500 to-purple-700",
    },
    {
      title: "Pending Invoices",
      value: "23",
      icon: <Clock size={28} />,
      bg: "from-yellow-500 to-yellow-700",
    },
    {
      title: "Paid Invoices",
      value: "105",
      icon: <CheckCircle size={28} />,
      bg: "from-green-500 to-green-700",
    },
  ];

  return (
    <>
      <div className="p-2 ">
        <h1 className="text-3xl font-bold text-gray-600 mb-8">
          Invoice Overview
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`rounded-xl text-white p-4 bg-linear-to-r ${item.bg} shadow-lg cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{item.title}</p>
                  <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
                </div>
                <div className="opacity-90">{item.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </>
  );
};