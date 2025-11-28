import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const scrollToServices = (e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        // Update URL cleanly without reloading
        window.history.pushState(null, "", "/#services");
      }
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-blue-900 flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              🏛️
            </div>
            Barangay<span className="text-blue-600">Connect</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-slate-600 hover:text-blue-600 font-medium transition"
            >
              Home
            </Link>

            {/* Service Link */}
            <Link
              to="/#services"
              onClick={scrollToServices}
              className="text-slate-600 hover:text-blue-600 font-medium transition"
            >
              Services
            </Link>

            {!token ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-blue-600 font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/profile"
                  className="text-slate-600 font-medium flex items-center gap-2 hover:bg-slate-100 p-2 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  {user?.firstName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-600 transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-4 space-y-3">
            <Link
              to="/"
              className="block text-slate-600 py-2 hover:text-blue-600"
            >
              Home
            </Link>

            {/* Mobile Service Link */}
            <Link
              to="/#services"
              onClick={(e) => {
                scrollToServices(e);
                setIsOpen(false);
              }}
              className="block text-slate-600 py-2 hover:text-blue-600"
            >
              Services
            </Link>

            {!token ? (
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="/login"
                  className="w-full text-center border border-slate-300 py-2.5 rounded-lg text-slate-700 font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center bg-blue-600 text-white py-2.5 rounded-lg font-semibold"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 py-2 font-medium"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
