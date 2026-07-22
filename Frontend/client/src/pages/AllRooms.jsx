import React from "react";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const AllRooms = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col-reverse lg:flex-row item-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24">
      <div>
        <div className="flex flex-col items-start text-left">
          <h1 className="font-playfair text-4xl md:text-[40px]">Hotel Rooms</h1>
          <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
            Take advantages of our limited-time offers and special packages to
            enhance your stay and create unforgettable memories.
          </p>
        </div>

        {roomsDummyData.map((room) => (
          <div key={room._id} className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0">
            <img
              onClick={() => {
                navigate(`/room/${room._id}`);
                scrollTo(0, 0);
              }}
              src={room.images[0]}
              alt="hotel-img"
              title="View Room Details"
              className="max-h-65 md:w-1/2 rounded-xl shadow-lg shadow-lg object-cover cursor-pointer"
            />
            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel.city}</p>
              <p
                onClick={() => {
                  navigate(`/room/${room._id}`);
                  scrollTo(0, 0);
                }}
                className="text-gray-500 text-3xl font-playfair"
              >
                {room.hotel.name}
              </p>
              <div className="flex items-center gap-2">
                <StarRating />
                <p className="ml-2">200+ Reviews</p>
              </div>
              <div className="flex item-center gap-1 text-gray-500 mt-2 text-sm">
                <img src={assets.locationIcon} alt="location-icon" />
                <span>{room.hotel.address}</span>
              </div>
              {/* Room Amentities */}
              <div className="flex flex-wrap items-center mt-3 mb-6 gap-4">
                {room.amenities.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70">
                    <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* filter section*/}
      <div></div>
    </div>
  );
};
export default AllRooms;