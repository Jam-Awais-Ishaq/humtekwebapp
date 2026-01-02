import { NavLink } from "react-router-dom";
import {
  Dashboard,
  Analytics,
  Inventory,
  ReceiptLong,
  People,
  Settings,
  Logout,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { FaBars } from "react-icons/fa6";
import imgLogo from "../../../assets/logo.jpeg";
const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { text: "Analytics", icon: <Analytics />, path: "/dashboard/analytics" },
  { text: "Products", icon: <Inventory />, path: "/dashboard/products" },
  { text: "Invoices", icon: <ReceiptLong />, path: "/dashboard/invoices" },
  { text: "Customers", icon: <People />, path: "/dashboard/customers" },
  { text: "Settings", icon: <Settings />, path: "/dashboard/settings" },
];

const SideBar = ({
  mobileOpen,
  handleDrawerToggle,
  collapsed,
  setCollapsed,
}) => {
  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={handleDrawerToggle}
        className="fixed top-15 left-4 z-50 md:hidden w-10 bg-white p-2 rounded shadow shadow-gray-500"
      >
        <Menu />
      </button>

      {/* BLUR OVERLAY (mobile) */}
      {mobileOpen && (
        <div
          onClick={handleDrawerToggle}
          className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-14 left-0 z-40
          h-[calc(100vh-56px)]
          bg-white border-r border-r-gray-400
          transition-[width,transform] duration-300 ease-in-out
                    ${collapsed ? "w-20" : "w-65"}
    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
md:translate-x-0
                                             `}
      >
        {/* TOGGLE */}
        <div
          className={`${collapsed
            ? "flex justify-center items-center -ml-10"
            : "flex items-center justify-start"
            }  border-b border-b-gray-300 text-gray-700`}
        >
          <p
            className={` transition-all duration-100 w-full h-20 flex items-center justify-start
${collapsed
                ? "opacity-0 -translate-x-2.5 pointer-events-none"
                : "opacity-100 translate-x-0 delay-300"
              } ml-2 font-[Times-new-Roman] uppercase`}
          >
            <img src={imgLogo} className="h-10" alt="" /> <span>HumTek</span>
          </p>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden md:block rounded cursor-pointer mr-9 text-3xl ${collapsed ? "" : "ml-0"}`}
          >
            {collapsed ? <FaBars /> : <FaBars />}
          </button>
        </div>

        {/* MENU */}
        <nav className="px-2 mt-2 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.text}
              to={item.path}
              onClick={handleDrawerToggle}
              className={({ isActive }) =>
                `
                group relative flex items-center gap-2 px-3 py-2 mt-2 rounded-lg
                transition-all duration-300
                ${isActive
                  ? "bg-linear-to-r from-purple-500 via-pink-500 to-red-500 text-white"
                  : "hover:bg-linear-to-r hover:from-purple-500 hover:via-pink-500 hover:to-red-500 hover:text-white"
                }
              `
              }
            >
              <span>{item.icon}</span>

              {!collapsed && <span className={` transition-all duration-200
${collapsed ? "opacity-0 -translate-x-2.5 pointer-events-none" : "opacity-100 translate-x-0 delay-400"
                } ml-1`}>{item.text}</span>}

              {/* TOOLTIP */}
              {collapsed && (
                <span className="absolute left-full ml-3 px-2 py-1 text-sm rounded bg-black text-white opacity-0 group-hover:opacity-100 whitespace-nowrap">
                  {item.text}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-4 w-full px-2">
          <button className="group relative flex items-center gap-3 w-full px-3 py-2 rounded-lg cursor-pointer hover:bg-red-500 hover:text-white transition">
            <Logout />
            {!collapsed && <span>Logout</span>}
            {collapsed && (
              <span className="absolute left-full ml-3 px-2 py-1 text-sm rounded bg-gray-800  text-white opacity-0 group-hover:opacity-100">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
export default SideBar;