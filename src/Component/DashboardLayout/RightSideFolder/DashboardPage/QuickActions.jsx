// QuickActions.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  FileText,
  Users as People,
  PieChart,
  RefreshCcw,
  Users,
} from "lucide-react";

const actions = [
  {
    title: "Add Invoice",
    icon: <PlusCircle size={24} />,
    action: () => alert("Open Add Invoice Modal"),
    color: "from-blue-500 to-blue-700",
  },
  {
    title: "View Reports",
    icon: <FileText size={24} />,
    action: () => alert("Open Reports Page"),
    color: "from-green-500 to-green-700",
  },
  {
    title: "Customers",
    icon: <Users size={24} />,
    action: () => alert("Open Customers Page"),
    color: "from-yellow-500 to-yellow-700",
  },
  {
    title: "Analytics",
    icon: <PieChart size={24} />,
    action: () => alert("Open Analytics Page"),
    color: "from-purple-500 to-purple-700",
  },
  {
    title: "Refresh",
    icon: <RefreshCcw size={24} />,
    action: () => window.location.reload(),
    color: "from-pink-500 to-red-500",
  },
];

const QuickActions = () => {
  return (
    <div className="my-6 px-2">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-4 justify-start">
        {actions.map((item, index) => (
          <motion.button
            key={index}
            onClick={item.action}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-white font-medium shadow-lg bg-linear-to-r ${item.color} cursor-pointer`}
          >
            {item.icon}
            <span className="hidden sm:inline">{item.title}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
