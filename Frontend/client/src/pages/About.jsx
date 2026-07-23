import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";

const highlights = [
  {
    title: "Flexible Booking",
    description:
      "Adjust plans easily with supportive customer care and transparent policies.",
  },
  {
    title: "Curated Luxury",
    description:
      "Every stay is selected for comfort, design, and memorable service.",
  },
  {
    title: "Local Experiences",
    description:
      "Discover signature activities crafted around the destinations you love.",
  },
];

const stats = [
  { value: "4.9/5", label: "Guest satisfaction" },
  { value: "120+", label: "Luxury destinations" },
  { value: "98%", label: "Repeat travelers" },
];

const About = () => {
  return (
    <div className="bg-slate-50 pt-24 pb-20">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Title
          title="About BookMyStay"
          subtitle="We blend comfort, elegance, and discovery into every stay so travel feels effortless from the first click to the final checkout."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-sky-600">
              Why travelers choose us
            </p>
            <h2 className="mt-3 font-playfair text-3xl text-gray-900">
              Thoughtful stays with elevated hospitality
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              BookMyStay brings together premium accommodations, immersive local
              experiences, and effortless booking support in one place. Whether
              you’re planning a weekend escape or a long retreat, our platform
              helps every detail feel polished and personal.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/rooms"
                className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Explore Rooms
              </Link>
              <Link
                to="/experiences"
                className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                View Experiences
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-sm md:p-10">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-300">
              Our promise
            </p>
            <div className="mt-6 space-y-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4"
                >
                  <h3 className="font-playfair text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
