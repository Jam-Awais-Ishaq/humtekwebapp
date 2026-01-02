import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Global/Navbar";
import SideBar from "../DashboardLayout/SideBar";

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(
    () => JSON.parse(localStorage.getItem("sidebarCollapsed")) ?? false
  );

  // 💾 Save state
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  // 📱 Auto collapse on tablet
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex overflow-x-hidden">
        <SideBar
          mobileOpen={mobileOpen}
          handleDrawerToggle={() => setMobileOpen(!mobileOpen)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* FLOATABLE CONTENT */}
        <main
          className={`
            flex-1 mt-14
            min-h-[calc(100vh-56px)]
            overflow-x-hidden
            transition-[margin] duration-300 ease-in-out
            ${collapsed ? "md:ml-20" : "md:ml-65"}
          `}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;