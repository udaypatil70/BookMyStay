import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-slate-200/80 py-4 bg-slate-950 text-white shadow-sm">
      <Link to="/" className="flex items-center gap-3">
        <img
          src={assets.logo}
          alt="logo"
          className="h-10 brightness-0 invert"
        />
        <span className="hidden md:inline text-lg font-semibold tracking-wide">
          Owner Portal
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline text-sm text-slate-300">
          Hotel Owner
        </span>
        <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100 border border-white/10">
          Signed in
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
