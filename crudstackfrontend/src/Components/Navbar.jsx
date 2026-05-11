import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { motion } from "framer-motion";
import { Home, LogIn, LogOut } from "lucide-react";
import { twMerge } from "tailwind-merge";

// Utility function for merging Tailwind classes safely
const cn = (...classes) => twMerge(classes.filter(Boolean).join(" "));

const MOBILE_LABEL_WIDTH = 72;

export default function Navbar({ className, stickyTop = true }) {
  const token = useSelector((s) => s?.auth?.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Dynamic Nav Items based on Auth State
  const navItems = token
    ? [
        { label: "Home", icon: Home, path: "/" },
        { label: "Logout", icon: LogOut, action: "logout" },
      ]
    : [
        { label: "Login", icon: LogIn, path: "/login" },
      ];

  // 2. Sync active index with current route
  const getInitialIndex = () => {
    const idx = navItems.findIndex((item) => item.path === location.pathname);
    return idx >= 0 ? idx : 0;
  };

  const [activeIndex, setActiveIndex] = useState(getInitialIndex);

  // Update active pill if route changes externally
  useEffect(() => {
    setActiveIndex(getInitialIndex());
  }, [location.pathname, token]);

  // 3. Handle Clicks (Routing & Redux Logic)
  const handleItemClick = (item, idx) => {
    setActiveIndex(idx);
    
    if (item.action === "logout") {
      dispatch(logout());
      navigate("/login"); // Optional: redirect to login after logout
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <motion.nav
      // Flipped y: 20 to y: -20 so it drops down from the top
      initial={{ scale: 0.9, opacity: 0, y: -30 }}
      animate={{ scale: 1, opacity: 1, y: -15 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      role="navigation"
      aria-label="Navigation"
      className={cn(
        "bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-full flex items-center p-2 shadow-2xl space-x-1 min-w-[200px] h-[52px]",
        // Changed to top-6 so it floats at the top
        stickyTop && "fixed inset-x-0 top-6 mx-auto z-50 w-fit",
        className
      )}
    >
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = activeIndex === idx;

        return (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "flex items-center gap-0 px-3 py-2 rounded-full transition-colors duration-200 relative h-10 min-w-[44px] min-h-[40px] max-h-[44px]",
              isActive
                ? "bg-primary/10 text-pink-400 gap-2 bg-pink-500/10" // Active styling
                : "bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200", // Inactive styling
              "focus:outline-none focus-visible:ring-0"
            )}
            onClick={() => handleItemClick(item, idx)}
            aria-label={item.label}
            type="button"
          >
            <Icon
              size={22}
              strokeWidth={2}
              aria-hidden
              className="transition-colors duration-200"
            />

            <motion.div
              initial={false}
              animate={{
                width: isActive ? `${MOBILE_LABEL_WIDTH}px` : "0px",
                opacity: isActive ? 1 : 0,
                marginLeft: isActive ? "8px" : "0px",
              }}
              transition={{
                width: { type: "spring", stiffness: 350, damping: 32 },
                opacity: { duration: 0.19 },
                marginLeft: { duration: 0.19 },
              }}
              className="overflow-hidden flex items-center max-w-[72px]"
            >
              <span
                className={cn(
                  "font-medium text-sm whitespace-nowrap select-none transition-opacity duration-200 overflow-hidden text-ellipsis leading-[1.9]",
                  isActive ? "text-pink-400" : "opacity-0"
                )}
                title={item.label}
              >
                {item.label}
              </span>
            </motion.div>
          </motion.button>
        );
      })}
    </motion.nav>
  );
}