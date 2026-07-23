import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const selectedRoom = roomsDummyData.find((room) => room._id === id);

    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images[0]);
    }
  }, [id]);

  return (
    room && (
      <div className="py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32">
        {/* Room Details */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-playfair">
            {room.hotel.name}
            <span className="font-inter text-sm"> ({room.roomType})</span>
          </h1>

          <p className="text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full">
            20% OFF
          </p>
        </div>

        {/* Room Rating */}
        <div className="flex items-center gap-1 mt-2">
          <StarRating />
          <p className="ml-2">200+ Reviews</p>
        </div>

        {/* Room Address */}
        <div className="flex items-center gap-2 text-gray-500 mt-2">
          <img src={assets.locationIcon} alt="location-icon" />
          <span>{room.hotel.address}</span>
        </div>

        {/* Room Images */}
        <div className="flex flex-col lg:flex-row mt-6 gap-6">
          {/* Main Image */}
          <div className="lg:w-1/2 w-full">
            <img
              src={mainImage}
              alt="Room"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
            {room.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Room ${index + 1}`}
                onClick={() => setMainImage(image)}
                className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${
                  mainImage === image ? "outline-4 outline-orange-500" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default RoomDetails;
