import React from "react";
import { assets } from "../assets/assets";
import Title from "./Title";

const NewLetter = () => {
  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-6 py-14 md:py-18 mx-2 lg:mx-auto my-30 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl shadow-black/20 animate-fade-in-up">
      <Title
        title="Stay Inspired"
        subtitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration."
      />
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full max-w-lg">
        <input
          type="text"
          className="bg-white/10 px-4 py-3 border border-white/20 rounded-lg outline-none w-full md:w-auto md:flex-1 text-white placeholder:text-gray-400 focus:border-white/40 focus:bg-white/15 transition-all duration-300"
          placeholder="Enter your email"
        />
        <button className="flex items-center justify-center gap-2 group bg-white text-gray-900 px-6 md:px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg btn-press w-full md:w-auto">
          Subscribe
          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="w-3.5 group-hover:translate-x-1 transition-all duration-300"
          />
        </button>
      </div>
      <p className="text-gray-500 mt-6 text-xs text-center">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates.
      </p>
    </div>
  );
};

export default NewLetter;
