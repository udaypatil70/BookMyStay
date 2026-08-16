import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-white/5 shadow-lg shadow-black/10">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative">
          <img
            src={assets.Bookmystaylogo}
            alt="BookMyStay"
            className="h-10 w-auto"
          />
          <div className="absolute -inset-1 bg-white/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="hidden md:flex flex-col">
          <span className="text-lg font-semibold text-white tracking-wide">
            Owner Portal
          </span>
          <span className="text-[10px] text-slate-500 uppercase tracking-[0.25em]">
            Manage your property
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="hidden sm:flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-300 px-3 py-1.5 rounded-lg hover:bg-white/5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Site
        </Link>
        <div className="h-5 w-px bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs text-slate-400">Signed in as</span>
            <span className="text-sm text-white font-medium">Hotel Owner</span>
          </div>
          <UserButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
