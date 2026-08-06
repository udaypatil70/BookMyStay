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
    <form className="mx-auto w-full max-w-6xl space-y-7 pb-14 font-sans">
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subtitle="Fill in the details carefully with accurate room information, pricing, and amenities to enhance the guest booking experience."
      />

      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <p className="mb-4 text-base font-semibold text-slate-900">
          Room Images
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {Object.keys(images).map((key) => (
            <label
              htmlFor={`roomImage${key}`}
              key={key}
              className="cursor-pointer"
            >
              <img
                className="h-32 w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 object-cover sm:h-36 lg:h-40"
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

      <div className="grid gap-5 rounded-2xl bg-white p-5 shadow-sm sm:p-6 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-slate-900">
            Room Type
          </label>

          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-900"
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
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-900"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <p className="mb-4 text-base font-semibold text-slate-900">Amenities</p>

        <div className="grid grid-cols-1 gap-3 text-slate-700 sm:grid-cols-2 sm:gap-4">
          {Object.keys(inputs.amenities).map((amenity, index) => (
            <label
              key={index}
              htmlFor={`amenities${index + 1}`}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm transition hover:border-slate-400"
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
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="rounded-full bg-slate-950 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
        Add Room
      </button>
    </form>
  );
};

export default AddRoom;
