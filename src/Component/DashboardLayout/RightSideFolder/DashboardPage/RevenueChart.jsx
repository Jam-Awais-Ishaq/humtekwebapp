import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
} from "recharts";

export const RevenueChart = () => {
    const [view, setView] = useState("both");

    const data = [
        { month: "Jan", revenue: 3200, profit: 1200 },
        { month: "Feb", revenue: 4500, profit: 1800 },
        { month: "Mar", revenue: 3800, profit: 1500 },
        { month: "Apr", revenue: 55200, profit: 32100 },
        { month: "May", revenue: 6100, profit: 91600 },
        { month: "Jun", revenue: 7400, profit: 3200 },
    ];

    /* ---------- FORMAT NUMBERS ---------- */
    const formatNumber = (value) => {
        if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`;
        if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
        if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
        return value;
    };

    const tickColors = ["#6366f1", "#22c55e", "#ec4899", "#f97316"];

    /* ---------- PIE CHART DATA ---------- */
    const totalRevenue = data.reduce((a, b) => a + b.revenue, 0);
    const totalProfit = data.reduce((a, b) => a + b.profit, 0);

    const pieData = [
        { name: "Profit", value: totalProfit },
        { name: "Remaining", value: totalRevenue - totalProfit },
    ];

    const pieColors = ["#22c55e", "#e5e7eb"];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 p-2 "
        >
            {/* Header */}
            <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-600">
                    Monthly Revenue vs Profit
                </h2>

                <div className="flex gap-2 text-sm">
                    {["revenue", "profit", "both"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setView(item)}
                            className={`px-3 py-1 rounded-full border cursor-pointer transition
                ${view === item
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Charts Wrapper */}
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                {/* AREA CHART */}
                <div className="lg:col-span-2 lg:min-h-[40vh] md:min-h-[56vh] h-auto md:w-[90%] w-full">
                    <ResponsiveContainer width="100%" height="100%" style={{ cursor: "pointer" }}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.15} />
                                </linearGradient>

                                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#22c55e" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.15} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="0 1" />
                            <XAxis dataKey="month" />
                            <YAxis
                                tick={({ x, y, payload, index }) => (
                                    <text
                                        x={x - 5}
                                        y={y + 4}
                                        textAnchor="end"
                                        fill={tickColors[index % tickColors.length]}
                                        fontSize={11}
                                        fontWeight={500}
                                    >
                                        {formatNumber(payload.value)}
                                    </text>
                                )}
                                tickLine={false}
                                axisLine={false}
                            />

                            <Tooltip />

                            {(view === "revenue" || view === "both") && (
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#8b5cf6"
                                    strokeWidth={2}
                                    fill="url(#revenueGradient)"
                                    activeDot={{ r: 7 }} style={{ cursor: "pointer" }}
                                />
                            )}

                            {(view === "profit" || view === "both") && (
                                <Area
                                    type="monotone"
                                    dataKey="profit"
                                    stroke="#22c55e"
                                    strokeWidth={2}
                                    fill="url(#profitGradient)"
                                    activeDot={{ r: 7 }} style={{ cursor: "pointer" }}
                                />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* PIE CHART */}
                <div className="min-h-[40vh] flex flex-col items-center justify-center">
                    <h3 className="text-sm font-semibold mb-2 text-gray-700">
                        Success Rate
                    </h3>
                    <ResponsiveContainer style={{cursor:"pointer"}} width="100%" height="100%">
                        <PieChart style={{cursor:"pointer"}}>
                            <Pie
                                data={pieData}
                                innerRadius={55}
                                outerRadius={80}
                                paddingAngle={3}
                                dataKey="value" style={{cursor:"pointer"}}
                            >
                                {pieData.map((_, index) => (
                                    <Cell key={index} fill={pieColors[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <p className="mt-2 text-sm font-medium text-green-600 cursor-pointer">
                        {Math.round((totalProfit / totalRevenue) * 100)}% Success
                    </p>
                </div>
            </div>
        </motion.div>
    );
};