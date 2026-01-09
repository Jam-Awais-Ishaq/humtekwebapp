import { useState, useRef, useEffect, useContext } from "react";
import {
  Search,
  Plus,
  Bell,
  User,
  Settings,
  LogOut,
  Moon,
  Building,
  BarChart,
  FileDigit,
  Users,
  CreditCard,
  Package,
  BarChart2,
  FilePlus,
} from "lucide-react";
import PeopleIcon from '@mui/icons-material/People';
import { Link } from "react-router-dom";
import imageLogo from "@/assets/Logo.jpeg"
import { Context } from "../../Context/ContextProvider";
import { AdminPanelSettings, AttachEmailTwoTone, Email, EmailTwoTone } from "@mui/icons-material";
import { LiaFileInvoiceSolid } from "react-icons/lia";
const Navbar = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setCreateOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const createRef = useRef(null);
  const profileRef = useRef(null);
  const notifyRef = useRef(null);


  const { userProfile, setUserProfile, openChat, setChatOpen } = useContext(Context);
  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setCreateOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setNotifyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-14 z-50 bg-white border-b border-gray-200 px-3 sm:px-6 flex items-center justify-between">

      {/* LEFT - LOGO */}
      <div className="flex items-center gap-2">
        <img src={imageLogo} alt="Logo" className="h-7 ml-6 cursor-pointer" />

      </div>

      {/* CENTER - SEARCH (HIDE ON MOBILE) */}
      <div className="hidden md:flex items-center w-[45%]">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-4 py-1.5 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
        />
        <button className="px-5 py-2 border border-l-0 border-gray-300 rounded-r-full bg-gray-100 hover:bg-gray-200">
          <Search size={18} />
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* CREATE DROPDOWN */}
        <div className="relative" ref={createRef}>
          <button
            onClick={() => setCreateOpen(!createOpen)}
            className="flex items-center gap-2 px-3 py-1.5 border border-gray-400 rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          >
            <Plus size={18} className="text-blue-600" />
            <span className="hidden sm:block font-medium text-slate-800">Create</span>
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden transition-all duration-300 origin-top-right ${createOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
              }`}
          >
            <Link
              to="/dashboard/products"
              className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
            >
              <FilePlus size={18} className="text-blue-600" /> New Invoice
            </Link>

            <Link
              to="/dashboard/customers"
              className="flex items-center gap-2 px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
            >
              <Users size={18} className="text-green-600" /> New Customer
            </Link>

            <Link
              to="/dashboard/sendEmail"
              className="flex items-center gap-2 px-4 py-3 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
            >
              <AttachEmailTwoTone size={18} className="text-purple-600" /> Send email
            </Link>

            {/* <Link
              to="/dashboard/payments"
              className="flex items-center gap-2 px-4 py-3 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-200"
            >
              <CreditCard size={18} className="text-yellow-600" /> New Payment
            </Link> */}
            <Link
              to="/dashboard/invoices"
              className="flex items-center gap-2 px-4 py-3 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-200"
            >
              <LiaFileInvoiceSolid size={18} className="text-yellow-600" /> Total Invoices
            </Link>

            <Link
              to="/dashboard/analytics"
              className="flex items-center gap-2 px-4 py-3 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
            >
              <BarChart size={18} className="text-indigo-600" /> Company Stats
            </Link>
          </div>
        </div>


        {/* NOTIFICATIONS */}
        <div className="relative" ref={notifyRef}>
          <button
            onClick={() => setNotifyOpen(!notifyOpen)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer"
          >
            <Bell size={20} className="text-slate-800" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Notification Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-60 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden transition-all duration-300 origin-top-right transform ${notifyOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
              }`}
          >
            <div className="px-4 py-3 border-b border-gray-300 font-semibold bg-gray-50">
              Notifications
            </div>

            {/* Notification items container */}
            <div className="flex flex-col">
              <div className="text-center py-4 text-gray-500">
                No new notifications
              </div>
            </div>

            <div className="text-center py-2 text-blue-600 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              View all notifications
            </div>
          </div>
        </div>



        {/* PROFILE */}
        <div className="relative" ref={profileRef}>
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            onClick={() => setProfileOpen(!profileOpen)}
            className="h-8 w-8 rounded-full cursor-pointer border-2 border-blue-600 hover:border-blue-700 transition-all duration-200"
          />

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top-right z-50 ${profileOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
              }`}
          >
            {/* PROFILE SUMMARY */}
            <div className="px-5 py-4 border-b border-gray-300 bg-blue-50">
              <p className="font-semibold text-blue-900 text-lg">{userProfile.name || "Your Name"}</p>
              <p className="text-sm text-gray-600">{userProfile.email || "email@example.com"}</p>
              <p className="text-sm text-gray-500 mt-1">{userProfile.companyName || "Company not selected"}</p>
            </div>

            {/* ACTION LINKS */}
            <div className="flex flex-col">
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-3 px-5 py-3 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
              >
                <User className="text-blue-500 group-hover:text-blue-700" size={18} /> My Profile
              </Link>
              <button  onClick={() => setChatOpen(true)}
                className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
              >
                <AdminPanelSettings className="text-green-500 group-hover:text-green-700" size={18} /> Chat with admin
              </button>
              <Link
                to="/dashboard/customers"
                className="flex items-center gap-3 px-5 py-3 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
              >
                <Users className="text-purple-500 group-hover:text-purple-700" size={18} /> Clients
              </Link>
              <Link
                to="/dashboard/analytics"
                className="flex items-center gap-3 px-5 py-3 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
              >
                <BarChart className="text-indigo-500 group-hover:text-indigo-700" size={18} /> Reports & Analytics
              </Link>
              <Link
                to="/dashboard/checkEmail"
                className="flex items-center gap-3 px-5 py-3 hover:bg-yellow-50 hover:text-yellow-700 transition-colors duration-200"
              >
                <EmailTwoTone className="text-yellow-500 group-hover:text-yellow-700" size={18} /> Check mail
              </Link>
            </div>

            {/* SIGN OUT */}
            <Link
              to="/"
              className="flex items-center gap-3 px-5 py-3 mt-1 bg-red-500 text-white rounded-b-xl hover:bg-red-600 font-semibold transition-colors duration-200"
            >
              <LogOut className="text-white" size={18} /> Sign Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;