import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton } from "@clerk/react";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4"
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-[0_1px_20px_rgba(0,0,0,0.06)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-14 md:h-16">
          <div className="flex-1">
            <Link to="/" className="inline-flex items-center">
              <span
                className={`text-2xl font-playfair font-bold tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-primary" : "text-white"
                }`}
              >
                BookMy<span className="text-secondary">Stay</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-sm tracking-wide font-medium transition-colors duration-300 ${
                    isScrolled
                      ? isActive
                        ? "text-primary"
                        : "text-gray-500 hover:text-primary"
                      : isActive
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] rounded-full transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    } ${isScrolled ? "bg-secondary" : "bg-white"}`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex-1 hidden md:flex items-center justify-end gap-5">
            {user && (
              <button
                className={`text-sm font-medium px-5 py-2 rounded-full border transition-all duration-300 btn-press ${
                  isScrolled
                    ? "border-gray-200 text-primary hover:border-primary hover:bg-primary hover:text-white"
                    : "border-white/30 text-white hover:border-white hover:bg-white hover:text-primary"
                }`}
                onClick={() =>
                  isOwner ? navigate("/owner") : setShowHotelReg(true)
                }
              >
                {isOwner ? "Dashboard" : "List Your Hotel"}
              </button>
            )}
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
                className={`text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 btn-press ${
                  isScrolled
                    ? "bg-primary text-white hover:bg-gray-800"
                    : "bg-white text-primary hover:bg-white/90"
                }`}
              >
                Login
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-3">
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
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`p-2 -mr-2 transition-colors duration-300 ${
                isScrolled ? "text-primary" : "text-white"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fade-in-down">
          <div className="absolute inset-0 bg-white" />

          <div className="relative flex flex-col items-center justify-center h-full">
            <button
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-primary transition-all duration-300 hover:rotate-90"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="stagger-children flex flex-col items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-3xl font-playfair font-semibold tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-primary"
                        : "text-gray-800 hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {user && (
                <button
                  className="mt-6 border border-primary text-primary px-8 py-3 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300 btn-press"
                  onClick={() => {
                    isOwner ? navigate("/owner") : setShowHotelReg(true);
                    setIsMenuOpen(false);
                  }}
                >
                  {isOwner ? "Dashboard" : "List Your Hotel"}
                </button>
              )}

              {!user && (
                <button
                  onClick={() => {
                    openSignIn();
                    setIsMenuOpen(false);
                  }}
                  className="mt-6 bg-primary text-white px-10 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 btn-press"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
