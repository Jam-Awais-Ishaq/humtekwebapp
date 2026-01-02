import { useState } from "react";
import ChartAnalytics from "./ChartAnalytics";

const RevenueAnalysis = () => {

  // 🔹 MAIN DATA (Future backend ready)
  const [data] = useState([
    { month: "Jan", year: 2024, revenue: 120000, profit: 30000 },
    { month: "Feb", year: 2024, revenue: 150000, profit: 40000 },
    { month: "Mar", year: 2024, revenue: 110000, profit: 25000 },
    { month: "Apr", year: 2024, revenue: 170000, profit: 50000 },
    { month: "May", year: 2024, revenue: 200000, profit: 60000 },
    { month: "Jun", year: 2024, revenue: 180000, profit: 55000 },
  ]);

  // 🔹 INVOICE STATUS
  const invoiceStatus = [
    { name: "Paid", value: 65 },
    { name: "Pending", value: 25 },
    { name: "Overdue", value: 10 },
  ];

  // 🔹 TOTALS
  const totalRevenue = data.reduce((a, b) => a + b.revenue, 0);
  const totalProfit = data.reduce((a, b) => a + b.profit, 0);

  const statBoxes = [
    { title: "Total Revenue", value: totalRevenue, gradient: "from-green-400 to-emerald-600" },
    { title: "Total Profit", value: totalProfit, gradient: "from-indigo-400 to-indigo-600" },
    { title: "Total Invoices", value: 245, gradient: "from-blue-400 to-sky-600" },
    { title: "Pending Invoices", value: 38, gradient: "from-red-400 to-rose-600" },
  ];

  return (
    <div className="p-3 bg-gray-50 space-y-3">

      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Revenue Analytics</h1>
        <p className="text-sm text-gray-500">Financial & invoice performance overview</p>
      </div>

      {/* STAT BOXES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {statBoxes.map((item, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 cursor-pointer text-white bg-linear-to-br ${item.gradient}
            transition-all duration-500 hover:scale-105 hover:shadow-xl`}
          >
            <p className="text-sm opacity-90">{item.title}</p>
            <p className="text-2xl font-bold mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <ChartAnalytics data={data} invoiceStatus={invoiceStatus} />
    </div>
  );
};

export default RevenueAnalysis;