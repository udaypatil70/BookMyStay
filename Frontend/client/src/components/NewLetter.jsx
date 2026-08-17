import { useState } from "react";
import { assets } from "../assets/assets";
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
    <div className="max-w-4xl mx-auto rounded-3xl px-8 py-16 mx-6 my-24 bg-slate-900 text-white">
      <h2 className="text-3xl md:text-4xl font-playfair text-white text-center">
        Stay Inspired
      </h2>
      <p className="text-slate-300 text-center mt-3 max-w-xl mx-auto">
        Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration.
      </p>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col md:flex-row gap-3 mt-8 justify-center"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-white placeholder:text-slate-400 flex-1 max-w-md focus:bg-white/15 focus:border-white/30 outline-none transition-all duration-300"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-slate-900 px-8 py-3 rounded-xl font-medium hover:bg-slate-100 transition inline-flex items-center gap-2 btn-press disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Subscribing...
            </>
          ) : (
            <>
              Subscribe
              <img
                src={assets.arrowIcon}
                alt="arrow-icon"
                className="w-3.5"
              />
            </>
          )}
        </button>
      </form>
      <p className="text-slate-400 mt-6 text-xs text-center">
        By subscribing, you agree to our Privacy Policy and consent to receive
        updates.
      </p>
    </div>
  );
};

export default NewLetter;
