import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const HotelRegistration = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner, fetchUser } =
    useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/hotel/register", formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        fetchUser();
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <form
        onSubmit={handleSubmit}
        className="flex bg-white rounded-xl max-w-4xl max-md:mx-2"
      >
        <img
          src={assets.regImage}
          alt="Register Hotel"
          className="hidden w-1/2 rounded-l-xl md:block"
        />

        <div className="relative flex flex-col items-center w-full p-8 md:w-1/2 md:p-10">
          <img
            src={assets.closeIcon}
            alt="Close"
            className="absolute w-4 h-4 cursor-pointer top-4 right-4"
            onClick={() => setShowHotelReg(false)}
          />

          <h2 className="mt-6 text-2xl font-semibold">Register Your Hotel</h2>

          {/* Hotel Name */}
          <div className="w-full mt-5">
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Type here"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2.5 mt-1 font-light border border-gray-200 rounded outline-indigo-500"
              required
            />
          </div>

          {/* Phone */}
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>

            <input
              id="contact"
              type="text"
              placeholder="Type here"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-3 py-2.5 mt-1 font-light border border-gray-200 rounded outline-indigo-500"
              required
            />
          </div>

          {/* Address */}
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>

            <input
              id="address"
              type="text"
              placeholder="Type here"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2.5 mt-1 font-light border border-gray-200 rounded outline-indigo-500"
              required
            />
          </div>

          {/* City */}
          <div className="w-full mt-4 mr-auto max-w-60">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>

            <select
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2.5 mt-1 font-light border border-gray-200 rounded outline-indigo-500"
              required
            >
              <option value="">Select City</option>

              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2 mt-6 text-white transition-all bg-indigo-500 rounded cursor-pointer mr-auto hover:bg-indigo-600"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelRegistration;
