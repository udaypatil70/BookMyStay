import React from "react";
import { assets, roomsDummyData } from "../assets/assets";
import Title from "../components/Title";

const experiences = [
  {
    id: 1,
    title: "Sunset Yacht Cruise",
    location: "Dubai",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
    description:
      "Enjoy a private evening cruise with gourmet dining, skyline views, and live entertainment.",
  },
  {
    id: 2,
    title: "Luxury Spa Retreat",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80",
    description:
      "Rejuvenate with wellness treatments, thermal rituals, and serene mountain views.",
  },
  {
    id: 3,
    title: "City Escape Tour",
    location: "New York",
    image:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80",
    description:
      "Explore hidden neighborhoods, rooftop dining, and curated art experiences.",
  },
  {
    id: 4,
    title: "Private Safari Adventure",
    location: "London",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    description:
      "Discover breathtaking landscapes with guided excursions and premium hospitality.",
  },
];

const Experiences = () => {
  return (
    <div className="pt-24 pb-20 bg-slate-50">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Title
          title="Experiences"
          subtitle="Discover curated adventures, cultural escapes, and relaxing retreats designed for unforgettable stays."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1400&q=80"
              alt="Luxury resort experience"
              className="h-[420px] w-full object-cover"
            />
            <div className="p-8">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-sky-600">
                Signature Stay
              </p>
              <h2 className="mt-3 font-playfair text-3xl text-gray-900">
                Experience luxury beyond the room
              </h2>
              <p className="mt-4 max-w-2xl text-base text-gray-600">
                From private beach dinners to guided excursions, every detail is
                designed to turn your travel into a story worth remembering.
              </p>
              <button className="mt-6 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                Book an Experience
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {experiences.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl bg-white p-3 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-sky-600">
                    {item.location}
                  </p>
                  <h3 className="mt-1 font-playfair text-lg text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-sky-600">
                Stay with us
              </p>
              <h3 className="mt-2 font-playfair text-2xl text-gray-900">
                Pair your experience with an exceptional room
              </h3>
            </div>
            <button className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
              Explore Rooms
            </button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {roomsDummyData.map((room, index) => (
              <div
                key={room._id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-slate-50"
              >
                <img
                  src={room.images[0]}
                  alt={room.roomType}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-playfair text-lg text-gray-900">
                      {room.roomType}
                    </p>
                    <p className="text-sm font-semibold text-sky-600">
                      ${room.pricePerNight}/night
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <img
                      src={assets.locationIcon}
                      alt="Location"
                      className="h-4 w-4"
                    />
                    <span>{room.hotel.city}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    {room.amenities.slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-white px-3 py-1 text-xs text-gray-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
