// import  QuickActions  from "./DashboardPage/QuickActions";
import { RecentInvoices } from "./DashboardPage/RecentInvoices";
import { RevenueChart } from "./DashboardPage/RevenueChart";
import { StatCard } from "./DashboardPage/StatCard";
export default function DashBoardPage() {
    return (
        <>
            <StatCard />
            <RevenueChart />
            <RecentInvoices />
        </>
    )
}