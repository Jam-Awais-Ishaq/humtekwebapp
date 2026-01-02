import { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Bell,
  User,
  Settings,
  LogOut,
  Moon,
} from "lucide-react";
import { Link } from "react-router-dom";
import imageLogo from "../../assets/logo.jpeg"
const Navbar = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);

  const createRef = useRef(null);
  const profileRef = useRef(null);
  const notifyRef = useRef(null);

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
            className="flex items-center gap-1 px-3 py-1.5 border border-gray-400 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <Plus size={18} />
            <span className="hidden sm:block">Create</span>
          </button>

          {createOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-400 rounded-lg shadow-md overflow-hidden">
              <Link to="/awais-1" className="block px-4 py-2 hover:bg-gray-100">Awais 1</Link>
              <Link to="/awais-2" className="block px-4 py-2 hover:bg-gray-100">Awais 2</Link>
              <Link to="/awais-3" className="block px-4 py-2 hover:bg-gray-100">Awais 3</Link>
              <Link to="/awais-4" className="block px-4 py-2 hover:bg-gray-100">Awais 4</Link>
              <Link to="/awais-5" className="block px-4 py-2 hover:bg-gray-100">Awais 5</Link>
            </div>
          )}
        </div>

        {/* NOTIFICATIONS */}
        <div className="relative" ref={notifyRef}>
          <button
            onClick={() => setNotifyOpen(!notifyOpen)}
            className="relative p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {notifyOpen && (
            <div className="absolute -right-10 mt-2 w-76 bg-white border border-gray-400 rounded-xl shadow-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-400 font-semibold">
                Notifications
              </div>

              <div className="flex gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
                <img src="https://i.pravatar.cc/40?img=1" className="h-10 w-10 rounded-full" />
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">Marvel Studios</span> uploaded a new trailer
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
                <img src="https://i.pravatar.cc/40?img=2" className="h-10 w-10 rounded-full" />
                <div>
                  <p className="text-sm">
                    Stranger Things released a new teaser
                  </p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer">
                <img src="https://i.pravatar.cc/40?img=3" className="h-10 w-10 rounded-full" />
                <div>
                  <p className="text-sm">
                    Your video reached <b>10K views</b> 🎉
                  </p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>

              <div className="text-center py-2 text-sm text-blue-600 hover:bg-gray-50 cursor-pointer">
                View all notifications
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="relative " ref={profileRef}>
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            onClick={() => setProfileOpen(!profileOpen)}
            className="h-8 w-8 rounded-full cursor-pointer"
          />

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-400 rounded-lg shadow-lg overflow-hidden">

              <div className="px-4 py-3 border-b border-gray-400">
                <p className="font-semibold">Awais</p>
                <p className="text-sm text-gray-500">awais@gmail.com</p>
              </div>

              <Link to="/channel" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <User size={18} /> Your Channel
              </Link>

              <Link to="/studio" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <Settings size={18} /> YouTube Studio
              </Link>

              <Link to="/appearance" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                <Moon size={18} /> Appearance
              </Link>

              <Link to="/logout" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600">
                <LogOut size={18} /> Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;