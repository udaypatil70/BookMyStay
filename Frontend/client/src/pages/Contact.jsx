import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";

const contactOptions = [
  {
    title: "Call us",
    value: "+1 (800) 555-0148",
    description:
      "Speak with our concierge team anytime for reservations and special requests.",
  },
  {
    title: "Email",
    value: "support@bookmystay.com",
    description: "Send a note for bookings, packages, or group stays.",
  },
  {
    title: "Visit",
    value: "12 Ocean Avenue, Dubai",
    description:
      "Meet us at our luxury experience center for planning assistance.",
  },
];

const Contact = () => {
  return (
    <div className="bg-slate-50 pt-24 pb-20">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Title
          title="Contact Us"
          subtitle="We are here to help you plan every part of your stay, from a weekend retreat to a once-in-a-lifetime escape."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
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
              {contactOptions.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-sky-600">{item.value}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-sm md:p-10">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-300">
              Quick enquiry
            </p>
            <form className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300"
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300"
              />
              <textarea
                rows="4"
                placeholder="Tell us what you need"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-300"
              />
              <button className="rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100">
                Send Request
              </button>
            </form>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-300">
              <p>Prefer browsing first?</p>
              <Link
                to="/rooms"
                className="mt-2 inline-block font-medium text-white"
              >
                Explore our rooms →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
