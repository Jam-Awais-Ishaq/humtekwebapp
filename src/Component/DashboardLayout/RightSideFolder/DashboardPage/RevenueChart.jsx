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
    Legend,
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

    /* ---------- PIE CHART DATA ---------- */
    const totalRevenue = data.reduce((a, b) => a + b.revenue, 0);
    const totalProfit = data.reduce((a, b) => a + b.profit, 0);

    const pieData = [
        { name: "Profit", value: totalProfit },
        { name: "Remaining", value: totalRevenue - totalProfit },
    ];

    const pieColors = ["#22c55e", "#e5e7eb"];

    const invoiceStatus = [
        { name: "Paid", value: 65 },
        { name: "Pending", value: 25 },
        { name: "Overdue", value: 10 },
    ];


    const PIE_COLORS = ["#22c55e", "#facc15", "#ef4444"];

    const formatNumber = (value) => {
        if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
        if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
        return value;
    };
    return (
        <>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className=" p-2 "
            >

                {/* Charts Wrapper */}
                <div className="flex flex-col lg:flex-row gap-3 w-full">

                    {/* SUCCESS RATE */}
                    <div className="w-full lg:w-1/3 bg-white p-1 rounded-xl border border-gray-300 shadow-sm flex flex-col items-center justify-center min-h-[40vh]">

                        <h3 className="text-lg font-semibold mb-3 text-gray-700 text-center">
                            Success Rate
                        </h3>

                        <div className="w-full h-52">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={55}
                                        outerRadius={80}
                                        paddingAngle={3}
                                        dataKey="value"
                                    >
                                        {pieData.map((_, index) => (
                                            <Cell key={index} fill={pieColors[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <p className="mt-3 text-sm font-semibold text-green-600">
                            {Math.round((totalProfit / totalRevenue) * 100)}% Success
                        </p>

                    </div>


                    {/* MONTHLY REVENUE */}
                    <div className="w-full lg:w-1/3 bg-white   hover:shadow-md transition duration-300 rounded-xl border border-gray-300 shadow-sm">

                        <h2 className="font-bold text-gray-600 text-center text-lg mb-3">
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
                    {/* INVOICE STATUS */}
                    <div className="w-full lg:w-1/3 bg-white rounded-xl border border-gray-300 shadow-sm">

                        <h2 className="font-bold text-gray-600 mb-3 text-center text-lg">
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
            </motion.div>

        </>
    );
};