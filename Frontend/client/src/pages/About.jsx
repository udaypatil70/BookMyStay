import { Link } from "react-router-dom";
import Title from "../components/Title";

const highlights = [
  {
    title: "Flexible Booking",
    description:
      "Adjust plans easily with supportive customer care and transparent policies.",
    icon: "🔄",
  },
  {
    title: "Curated Luxury",
    description:
      "Every stay is selected for comfort, design, and memorable service.",
    icon: "✨",
  },
  {
    title: "Local Experiences",
    description:
      "Discover signature activities crafted around the destinations you love.",
    icon: "🌍",
  },
];

const stats = [
  { value: "4.9/5", label: "Guest satisfaction", color: "from-blue-500 to-blue-600" },
  { value: "120+", label: "Luxury destinations", color: "from-purple-500 to-purple-600" },
  { value: "98%", label: "Repeat travelers", color: "from-pink-500 to-pink-600" },
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
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-sky-600">
              Why travelers choose us
            </p>
            <h2 className="mt-3 font-playfair text-3xl text-gray-900">
              Thoughtful stays with elevated hospitality
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              BookMyStay brings together premium accommodations, immersive local
              experiences, and effortless booking support in one place. Whether
              you're planning a weekend escape or a long retreat, our platform
              helps every detail feel polished and personal.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/rooms"
                className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-lg btn-press"
              >
                Explore Rooms
              </Link>
              <Link
                to="/experiences"
                className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-50 hover:border-slate-400 btn-press"
              >
                View Experiences
              </Link>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-300">
              Our promise
            </p>
            <div className="mt-6 space-y-4">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl bg-white/10 border-white/10 p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className="font-playfair text-xl">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 stagger-children">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
            >
              <p className={`text-3xl font-semibold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
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
