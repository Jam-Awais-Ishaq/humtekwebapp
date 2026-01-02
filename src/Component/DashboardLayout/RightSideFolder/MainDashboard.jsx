import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import MainForm from "../Auth/MainForm";
import DashBoardPage from "./RightSideFolder/DashBoardPage";
import AnalyticsPage from "./RightSideFolder/AnalyticsPage";
import ProductsPage from "./RightSideFolder/ProductsPage";
import InvoicePage from "./InvoicePage";
const MainDashboard = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainForm />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashBoardPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="invoices" element={<InvoicePage />} />
                    {/* <Route path="customers" element={<CustomersPage />} />
                    <Route path="settings" element={<SettingsPage />} /> */}
                </Route>
            </Routes>
        </>
    );
};

export default MainDashboard;