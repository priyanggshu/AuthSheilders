import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, LogOut, User, Moon, Sun, Menu, X, ChevronRight, ChevronLeft, Home } from "lucide-react";
import { useTheme } from "../context/Theme_Context";
import Button from "../components/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Jhonny Depp",
    email: "jhonnyjhonny@yespapa.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setSidebarOpen(window.innerWidth >= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className={`min-h-screen ${ theme === "dark" ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-300 flex`}>
      {/* Mobile Header */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-10 ${ theme === "dark" ? "bg-gray-800" : "bg-white" } shadow-sm`}>
        <div className="flex justify-between items-center h-16 px-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className={`ml-2 text-xl font-bold ${ theme === "dark" ? 'text-white' : 'text-gray-900'} `}>SecureAuth</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-full ${ theme === 'dark' ? "hover:bg-gray-600 text-gray-300 bg-gray-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200 " } `}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed md:relative z-20 md:z-0 w-2/3 md:w-1/5 h-full md:h-screen ${theme === 'dark' ? "bg-gray-800" : "bg-white" } shadow-lg md:shadow-none`}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className={`p-4 border-b ${theme === "dark" ? 'border-gray-800' : 'border-gray-300' } shadow-md flex items-center justify-between`}>
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <span className={`ml-2 text-xl md:text-2xl font-bold ${ theme === "dark" ? 'text-white' : 'text-gray-900' } `}>AuthShield</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className={`md:hidden p-2 rounded-full ${ theme === "dark" ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Profile */}
              <div className="p-6 flex-grow">
                <div className="flex flex-col items-center mb-6">
                  <img
                    src={userProfile.avatarUrl}
                    alt="User avatar"
                    className={`w-36 h-36 rounded-full object-cover border-2 ${ theme === "dark" ? 'border-yellow-500' : 'border-yellow-200'}`}
                  />
                  <h2 className={`text-2xl font-semibold ${ theme === "dark" ? 'text-white' : 'text-gray-900'} mt-4`}>{userProfile.name}</h2>
                  <p className={`text-sm mt-1 ${theme === "dark" ? 'text-gray-400' : 'text-gray-600' }`}>{userProfile.email}</p>
                </div>

              </div>

              {/* Sidebar Footer */}
              <div className={`p-6 border-t ${ theme === "dark" ? 'border-gray-700' : 'border-gray-300' }`}>
                <div className="flex items-center  justify-between mb-4">
                  <span className={`text-sm font-light ${ theme === "dark" ? 'text-gray-400' : 'text-gray-600' }`}>
                    {theme === "dark" ? "Dark Mode" : "Light Mode"}
                  </span>
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full ${ theme === "dark" ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                </div>

                <Button variant="outline" fullWidth onClick={handleLogout}>
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isMobile ? "mt-16" : ""}`}>
        <header className={`hidden md:block ${ theme === "dark" ? 'bg-gray-800': 'bg-white' } shadow-sm`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-evenly h-16 items-center">
              <h1 className={`text-xl  font-semibold ${ theme === "dark" ? 'text-white' : 'text-gray-900'}`}>Dashboard</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-56 md:py-60 px-4 md:px-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className={`${ theme === "dark" ? 'bg-gray-800' : 'bg-white'} overflow-hidden shadow rounded-lg`}>
              <div className="md:px-16 py-20 text-center">
                <h1 className={`text-2xl font-semibold ${ theme === "dark" ? 'text-white' : 'text-gray-900' } `}>Welcome, {userProfile.name}!</h1>
                <p className={`mt-2 ${ theme === "dark" ? 'text-gray-400' : 'text-gray-600' } `}>
                  Your account is protected with our real-time threat detection system.
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
