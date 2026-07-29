import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";

const AddRoom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "free WiFi": false,
      "free breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  return (
    <form className="space-y-8">
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subtitle="Fill in the details carefully with accurate room information, pricing, and amenities to enhance the guest booking experience."
      />

      <div className="bg-white rounded-[28px] shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-900 mb-4">Room Images</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.keys(images).map((key) => (
            <label
              htmlFor={`roomImage${key}`}
              key={key}
              className="cursor-pointer"
            >
              <img
                className="h-40 w-full rounded-3xl object-cover border border-dashed border-slate-300 bg-slate-50"
                src={
                  images[key]
                    ? URL.createObjectURL(images[key])
                    : assets.uploadArea
                }
                alt="Room upload"
              />
              <input
                type="file"
                accept="image/*"
                id={`roomImage${key}`}
                hidden
                onChange={(e) =>
                  setImages({
                    ...images,
                    [key]: e.target.files[0],
                  })
                }
              />
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[28px] shadow-sm p-6 grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-900">
            Room Type
          </label>
          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-700 focus:border-slate-900 outline-none"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-900">
            Price per Night
          </label>
          <input
            type="number"
            placeholder="0"
            className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-700 focus:border-slate-900 outline-none"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>

      <div className="bg-white rounded-[28px] shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-900 mb-4">Amenities</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
          {Object.keys(inputs.amenities).map((amenity, index) => (
            <label
              key={index}
              htmlFor={`amenities${index + 1}`}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 cursor-pointer hover:border-slate-300"
            >
              <input
                type="checkbox"
                id={`amenities${index + 1}`}
                checked={inputs.amenities[amenity]}
                onChange={() =>
                  setInputs({
                    ...inputs,
                    amenities: {
                      ...inputs.amenities,
                      [amenity]: !inputs.amenities[amenity],
                    },
                  })
                }
                className="h-4 w-4 rounded border-slate-300 text-slate-900"
              />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="bg-slate-950 text-white px-8 py-3 rounded-full transition hover:bg-slate-800">
        Add Room
      </button>
    </form>
  );
};

export default AddRoom;
