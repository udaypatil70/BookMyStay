import { useState } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const contactInfo = [
  {
    title: "Call us",
    value: "+91 7588007505",
    description: "Speak with our team anytime for reservations and special requests.",
    icon: (
      <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: "Email",
    value: "bookmystay00@gmail.com",
    description: "Send a note for bookings, packages, or group stays.",
    icon: (
      <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Visit",
    value: "Chintamani Morya Nagar, Dharangoan, Jalgaon 425105",
    description: "Meet us at our office for planning assistance.",
    icon: (
      <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const { axios } = useAppContext();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (form.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/contact", form);
      if (data.success) {
        toast.success(data.message);
        setForm({
          name: "",
          email: "",
          phone: "",
          checkInDate: "",
          checkOutDate: "",
          guests: 1,
          message: "",
        });
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
    <div className="bg-slate-50 pt-24 pb-20">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Title
          title="Contact Us"
          subtitle="We are here to help you plan every part of your stay, from a weekend retreat to a once-in-a-lifetime escape."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-sky-600">
                Get in touch
              </p>
              <h2 className="mt-3 font-playfair text-3xl text-gray-900">
                Let us help you create a seamless trip
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-600">
                Whether you need help choosing a property, coordinating a special
                celebration, or learning more about our curated experiences, our
                team is ready to guide you.
              </p>

              <div className="mt-8 space-y-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl bg-slate-50 p-4 border border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <p className="text-sm font-semibold text-gray-900">
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-2 ml-8 text-sm text-sky-600 font-medium break-all">
                      {item.value}
                    </p>
                    <p className="mt-1 ml-8 text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Prefer browsing first?
              </p>
              <Link
                to="/rooms"
                onClick={() => scrollTo(0, 0)}
                className="mt-3 inline-flex items-center gap-2 font-medium text-sky-600 transition-all duration-300 hover:text-sky-700 hover:gap-3"
              >
                Explore our rooms
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-300">
              Send us a message
            </p>
            <h3 className="mt-3 font-playfair text-2xl">
              Quick Enquiry
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Fill in your details and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-white/30 focus:bg-white/15 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-white/30 focus:bg-white/15 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 7588007505"
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-white/30 focus:bg-white/15 transition-all duration-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={form.checkInDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/30 focus:bg-white/15 transition-all duration-300 [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 mb-1 block">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={form.checkOutDate}
                    onChange={handleChange}
                    min={form.checkInDate || new Date().toISOString().split("T")[0]}
                    disabled={!form.checkInDate}
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/30 focus:bg-white/15 transition-all duration-300 disabled:opacity-50 [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">
                  Number of Guests
                </label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-white/30 focus:bg-white/15 transition-all duration-300 [color-scheme:dark]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n} className="bg-slate-800 text-white">
                      {n} {n === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your trip, special requirements, or any questions..."
                  className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-white/30 focus:bg-white/15 transition-all duration-300 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-100 hover:shadow-lg btn-press disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
