import React, { useState, useEffect } from "react";
import {
  Shield,
  Upload,
  Info,
  Clock,
  Home,
  ChevronDown,
  Bell,
  UserCircle,
} from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Upload", href: "/upload", icon: Upload },
    { name: "About", href: "/about", icon: Info },
    { name: "History", href: "/history", icon: Clock },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
    });
    return () => unsubscribe();
  }, []);

  const handleLoginRedirect = () => navigate("/login");
  const handleGuestContinue = () => alert("Continuing as Guest");
  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="bg-slate-900 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-emerald-400" />
          <span className="text-2xl font-bold">SafeBite</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </button>
          ))}

          {/* Bell icon */}
          <button
            type="button"
            className="relative p-1 rounded-full bg-slate-800 hover:bg-slate-700 transition"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="w-5 h-5 text-white" />
          </button>

          {/* User Menu */}
          <Menu as="div" className="relative">
            <MenuButton className="relative flex rounded-full bg-slate-800 p-1 focus:outline-none">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <UserCircle className="w-6 h-6 text-white" />
              )}
            </MenuButton>

            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/10 z-50 focus:outline-none">
              {user ? (
                <>
                  <MenuItem>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <button
                      onClick={handleLoginRedirect}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleGuestContinue}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Continue as Guest
                    </button>
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Menu>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <ChevronDown
            className={`w-6 h-6 transform transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => {
                navigate(item.href);
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
