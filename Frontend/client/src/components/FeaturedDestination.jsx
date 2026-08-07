import React from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const { rooms, Navigate } = useAppContext();

  return (
    rooms.length > 0 && (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20 ">
        <Title
          title="Featured Destination"
          subtitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences."
        />

        <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
          {rooms.slice(0, 4).map((room, index) => (
            <HotelCard key={room._id} room={room} index={index} />
          ))}
        </div>
        <button
          onClick={() => {
            Navigate("/rooms");
            scrollTo(0, 0);
          }}
          className="my-16 px-5 py-3 text-sm font-medium rounded-full bg-black text-white hover:bg-gray-800 transition-all cursor-pointer"
        >
          View All Destinations
        </button>
      </div>
    )
  );
};

export default FeaturedDestination;
