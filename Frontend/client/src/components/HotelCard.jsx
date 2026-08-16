import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={`/rooms/${room._id}`}
      onClick={() => scrollTo(0, 0)}
      key={room._id}
      className="group relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] hover-lift card-glow"
    >
      <div className="img-zoom">
        <img src={room.images[0]} alt={room.name} className="transition-transform duration-500" />
      </div>
      {index % 2 === 0 && (
        <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full shadow-md animate-bounce-in">
          Best Seller
        </p>
      )}
      <div className="p-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="font-playfair text-xl font-medium text-gray-800 group-hover:text-primary transition-colors duration-300">
            {room.hotel.name}
          </p>
          <div className="flex items-center gap-1">
            <img
              src={assets.starIconFilled}
              alt="star-icon"
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-800">4.5</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <img src={assets.locationIcon} alt="location-icon"></img>
          <span>{room.hotel.address}</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p>
            <span className="text-xl text-gray-800">${room.pricePerNight}</span>
            /night
          </p>
          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer btn-press">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
