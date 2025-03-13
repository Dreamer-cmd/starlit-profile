
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import AnimatedButton from "./AnimatedButton";
import { Menu, X, LogIn } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Explore", path: "/explore" },
    { title: "Features", path: "/features" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-cosmic-dark/80 backdrop-blur-md border-b border-white/5 shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter text-gradient hover:scale-105 transition-transform"
        >
          x-bio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:text-white",
                location.pathname === link.path
                  ? "text-white bg-white/10"
                  : "text-white/70 hover:bg-white/5"
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Login Button */}
        <div className="hidden md:block">
          <AnimatedButton 
            icon={<LogIn size={16} />} 
            variant="primary" 
            size="md"
          >
            Login with Discord
          </AnimatedButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-cosmic-dark/95 backdrop-blur-lg flex flex-col px-6 py-20 md:hidden transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-3 w-full text-center rounded-lg text-base font-medium transition-all",
                location.pathname === link.path
                  ? "text-white bg-accent/20 border border-accent/30"
                  : "text-white/70 hover:bg-white/5"
              )}
            >
              {link.title}
            </Link>
          ))}
          <div className="pt-4 w-full">
            <AnimatedButton 
              icon={<LogIn size={16} />} 
              variant="primary" 
              size="md"
              className="w-full mt-4"
            >
              Login with Discord
            </AnimatedButton>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
