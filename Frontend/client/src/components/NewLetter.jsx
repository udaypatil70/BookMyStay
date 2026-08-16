import React, { useState } from "react";
import { assets } from "../assets/assets";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const NewLetter = () => {
  const { axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/newsletter", { email });
      if (data.success) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-6 py-14 md:py-18 mx-2 lg:mx-auto my-30 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl shadow-black/20 animate-fade-in-up">
      <Title
        title="Stay Inspired"
        subtitle="Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration."
      />
      <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full max-w-lg">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 px-4 py-3 border border-white/20 rounded-lg outline-none w-full md:w-auto md:flex-1 text-white placeholder:text-gray-400 focus:border-white/40 focus:bg-white/15 transition-all duration-300"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 group bg-white text-gray-900 px-6 md:px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg btn-press w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Subscribing...
            </>
          ) : (
            <>
              Subscribe
              <img
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="w-3.5 group-hover:translate-x-1 transition-all duration-300"
              />
            </>
          )}
        </button>
      </form>
      <p className="text-gray-500 mt-6 text-xs text-center">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates.
      </p>
    </div>
  );
};

export default NewLetter;
