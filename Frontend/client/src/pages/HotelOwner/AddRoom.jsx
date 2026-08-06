import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const AddRoom = () => {
  const { axios, getToken } = useAppContext();

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

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const hasAmenity = Object.values(inputs.amenities).some(
      (amenity) => amenity,
    );

    const hasImage = Object.values(images).some((image) => image);

    if (!inputs.roomType || !inputs.pricePerNight || !hasAmenity || !hasImage) {
      toast.error(
        "Please fill in all details, select at least one amenity, and upload at least one image.",
      );
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("roomType", inputs.roomType);
      formData.append("pricePerNight", inputs.pricePerNight);

      const amenities = Object.keys(inputs.amenities).filter(
        (key) => inputs.amenities[key],
      );
      formData.append("amenities", JSON.stringify(amenities));

      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append("images", images[key]);
        }
      });

      const { data } = await axios.post("/api/rooms/", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        toast.success(data.message);

        setInputs({
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

        setImages({ 1: null, 2: null, 3: null, 4: null });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Title
        align="left"
        font="outfit"
        title="Add Room"
        subTitle="Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience."
      />

      <p className="mt-10 text-gray-800">Images</p>

      <div className="my-2 grid grid-cols-2 flex-wrap gap-4 sm:flex">
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              className="max-h-13 cursor-pointer opacity-80"
              src={
                images[key]
                  ? URL.createObjectURL(images[key])
                  : assets.uploadArea
              }
              alt=""
            />

            <input
              type="file"
              accept="image/*"
              id={`roomImage${key}`}
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      <div className="mt-4 flex w-full max-sm:flex-col sm:gap-4">
        <div className="max-w-48 flex-1">
          <p className="mt-4 text-gray-800">Room Type</p>

          <select
            value={inputs.roomType}
            onChange={(e) => setInputs({ ...inputs, roomType: e.target.value })}
            className="mt-1 w-full rounded border border-gray-300 p-2 opacity-70"
          >
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>

        <div>
          <p className="mt-4 text-gray-800">
            Price <span className="text-xs">/night</span>
          </p>

          <input
            type="number"
            placeholder="0"
            className="mt-1 w-24 rounded border border-gray-300 p-2"
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>

      <p className="mt-4 text-gray-800">Amenities</p>

      <div className="mt-1 flex max-w-sm flex-col flex-wrap text-gray-400">
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <div key={index}>
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
            />

            <label htmlFor={`amenities${index + 1}`}>{amenity}</label>
          </div>
        ))}
      </div>

      <button
        className="mt-8 cursor-pointer rounded bg-primary px-8 py-2 text-white"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Room"}
      </button>
    </form>
  );
};

export default AddRoom;
