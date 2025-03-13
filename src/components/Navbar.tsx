
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LogIn, LogOut, UserCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Navbar = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signIn, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const routes = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled ? "bg-cosmic-dark/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5",
        className
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-gradient">x-bio</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "text-cosmic-foreground/80 hover:text-cosmic-foreground transition-colors",
                  location.pathname === route.path && "text-cosmic-foreground font-medium"
                )}
              >
                {route.name}
              </Link>
            ))}
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 border border-white/10 rounded-full pl-3 pr-1 py-1 hover:bg-white/5 transition-colors">
                  <span className="text-sm text-cosmic-foreground">
                    {user.user_metadata.name || user.user_metadata.username || user.email?.split('@')[0]}
                  </span>
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user.user_metadata.avatar_url} alt="User avatar" />
                    <AvatarFallback className="bg-cosmic-dark text-xs">
                      {user.email?.substring(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-cosmic-dark border-white/10">
                <DropdownMenuLabel className="text-gradient">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild>
                  <Link to={`/${user.user_metadata.username || user.id}`} className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={signOut} className="text-red-400 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={signIn}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
            >
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-cosmic-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-cosmic-dark/95 backdrop-blur-md absolute top-full left-0 right-0 border-t border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={cn(
                    "py-2 text-cosmic-foreground/80 hover:text-cosmic-foreground transition-colors",
                    location.pathname === route.path && "text-cosmic-foreground font-medium"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {route.name}
                </Link>
              ))}
              <div className="border-t border-white/10 pt-4 mt-2">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.user_metadata.avatar_url} alt="User avatar" />
                        <AvatarFallback className="bg-cosmic-dark">
                          {user.email?.substring(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {user.user_metadata.name || user.user_metadata.username || user.email?.split('@')[0]}
                        </div>
                        <div className="text-sm text-cosmic-foreground/70">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`/${user.user_metadata.username || user.id}`}
                      className="flex items-center gap-2 py-2 text-cosmic-foreground/80 hover:text-cosmic-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <UserCircle size={16} />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 py-2 text-cosmic-foreground/80 hover:text-cosmic-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-2 py-2 text-red-400 hover:text-red-300 transition-colors w-full text-left"
                    >
                      <LogOut size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      signIn();
                      setIsOpen(false);
                    }}
                    className="w-full bg-accent hover:bg-accent/90 text-white py-2 rounded-md transition-colors flex items-center justify-center gap-2"
                  >
                    <LogIn size={16} />
                    <span>Sign In with Discord</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
