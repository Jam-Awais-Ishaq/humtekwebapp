import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import MainForm from "../Auth/MainForm";
import DashBoardPage from "./RightSideFolder/DashBoardPage";
import AnalyticsPage from "./RightSideFolder/AnalyticsPage";
import ProductsPage from "./RightSideFolder/ProductsPage";
import InvoicesPage from "./RightSideFolder/InvoicesPage";
import CustomerPage from "./RightSideFolder/CustomerPage";
import CompanyProfileSettings from "./RightSideFolder/CompanyProfileSettings";
import SendEmail from "./RightSideFolder/SendEmail/SendEmail";
import CheckEmail from "./RightSideFolder/SendEmail/CheckEmail";
import { useContext } from "react";
import { Context } from "../../Context/ContextProvider";
import ChatSidePanel from "./ChatSystem/ChatSidePanel";
const MainDashboard = () => {

    const { openChat, setChatOpen } = useContext(Context);
    return (
        <>
            <Routes>
                <Route path="/" element={<MainForm />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashBoardPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="invoices" element={<InvoicesPage />} />
                    <Route path="customers" element={<CustomerPage />} />
                    <Route path="profile" element={<CompanyProfileSettings />} />
                    <Route path="sendEmail" element={<SendEmail />} />
                    <Route path="checkEmail" element={<CheckEmail />} />
                </Route>
            </Routes>
            <ChatSidePanel isOpen={openChat} onClose={() => setChatOpen(false)} />
        </>
    );
};
export default MainDashboard;