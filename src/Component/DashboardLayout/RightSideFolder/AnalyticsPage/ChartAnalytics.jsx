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
  const PIE_COLORS = ["#22c55e", "#facc15", "#ef4444"];

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
      <div className="w-full md:w-1/3 bg-white p-1 rounded-xl border border-gray-300 shadow-sm">
        <h2 className="font-[Times-new-Roman] font-bold text-gray-600 text-center cursor-pointer text-xl mb-3">
          Monthly Revenue Trend
        </h2>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="0 1" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatNumber} />
              <Tooltip formatter={(v) => formatNumber(v)} />

              <Area
                type="natural"
                dataKey="revenue"
                stroke="#16a34a"
                fill="url(#revGradient)"
                strokeWidth={3}
                animationDuration={2200}
              />

              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#86efac" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#16a34a" stopOpacity={0.15} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===============================
          🔹 INVOICE STATUS PIE CHART
      =============================== */}
      <div className="w-full md:w-1/3 bg-white p-1 rounded-xl cursor-pointer border border-gray-300 shadow-sm">
        <h2 className="font-[Times-new-Roman] font-bold text-gray-600 mb-3 cursor-pointer text-center text-xl">
          Invoice Status Distribution
        </h2>

        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={invoiceStatus}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={80}
                animationDuration={2000}
              >
                {invoiceStatus.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}