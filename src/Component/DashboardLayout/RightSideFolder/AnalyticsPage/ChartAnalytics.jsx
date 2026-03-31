import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function ChartAnalytics({ data, invoiceStatus }) {

  // 🔹 PIE COLORS (same as before)

  // 🔹 FORMAT NUMBERS (1K, 1M)
  const formatNumber = (value) => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
    return value;
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">

      {/* ===============================
          🔹 REVENUE vs PROFIT LINE CHART
      =============================== */}
      <div className="w-full md:w-1/3 bg-white p-1 rounded-xl cursor-pointer border border-gray-300 shadow-sm">
        <h2 className="font-[Times-new-Roman] font-bold text-gray-600 mb-6 text-xl text-center">
          Revenue vs Profit
        </h2>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="0 1" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(v) => formatNumber(v)} />

              <Line
                type="natural" // 🌊 wavy
                dataKey="revenue"
                stroke="#4f46e5"
                strokeWidth={3}
                animationDuration={2000}
              />

              <Line
                type="natural"
                dataKey="profit"
                stroke="#22c55e"
                strokeWidth={3}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===============================
          🔹 MONTHLY REVENUE AREA CHART
      =============================== */}
      

      {/* ===============================
          🔹 INVOICE STATUS PIE CHART
      =============================== */}
      

    </div>
  );
}