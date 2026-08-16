import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/react";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Contact", path: "/contact" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const location = useLocation();

  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-md text-gray-700 py-3 md:py-4"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <span className={`text-2xl font-playfair font-bold tracking-tight ${
          isScrolled ? "text-gray-900" : "text-white"
        } transition-colors duration-300`}>
          BookMy<span className="text-primary">Stay</span>
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`group flex flex-col gap-1 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {link.name}
              <div
                className={`h-0.5 transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                } ${isScrolled ? "bg-gray-700" : "bg-white"}`}
              />
            </Link>
          );
        })}

        {user && (
          <button
            className={`border rounded-full px-4 py-1 text-sm ${
              isScrolled ? "text-black" : "text-white"
            }`}
            onClick={() =>
              isOwner ? navigate("/owner") : setShowHotelReg(true)
            }
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}
      </div>

      {/* Right Side */}
      <div className="hidden md:flex items-center gap-4">
        <button onClick={() => { navigate("/rooms"); scrollTo(0, 0); }}>
          <img
            src={assets.searchIcon}
            alt="Search"
            className={`h-7 ${isScrolled ? "invert" : ""}`}
          />
        </button>

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={() => openSignIn()}
            className={`ml-4 rounded-full px-8 py-2.5 ${
              isScrolled ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center gap-4">
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}

        <img
          src={assets.menuIcon}
          alt="Menu"
          className={`h-5 cursor-pointer ${isScrolled ? "invert" : ""}`}
          onClick={() => setIsMenuOpen(true)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-white flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 right-5 transition-transform duration-300 hover:rotate-90"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeMenu} alt="Close" className="h-6" />
        </button>

        {navLinks.map((link, index) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-xl font-medium transition-colors duration-300 ${
                isActive ? "text-primary" : "text-gray-800 hover:text-primary"
              }`}
              style={{
                animationDelay: isMenuOpen ? `${index * 0.1}s` : '0s'
              }}
            >
              {link.name}
            </Link>
          );
        })}

        {user && (
          <button
            className="border rounded-full px-6 py-2 text-sm font-medium cursor-pointer transition-all duration-300 hover:bg-black hover:text-white btn-press"
            onClick={() => {
              isOwner ? navigate("/owner") : setShowHotelReg(true);
            }}
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}

        {!user && (
          <button
            onClick={() => openSignIn()}
            className="rounded-full bg-black px-8 py-2.5 text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-lg btn-press"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
