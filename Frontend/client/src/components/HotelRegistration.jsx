import { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const HotelRegistration = () => {
  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);

      const token = await getToken();
      if (!token) {
        toast.error("Authentication failed. Please sign in again.");
        setLoading(false);
        return;
      }

      const { data } = await axios.post(
        `/api/hotels`,
        {
          name,
          contact,
          address,
          city,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error(error.response?.data?.message || "Could not register hotel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-2xl max-w-4xl max-md:mx-2 shadow-2xl"
      >
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 rounded-l-2xl hidden md:block object-cover"
        />

        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          <img
            src={assets.closeIcon}
            alt="close-icon"
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
            onClick={() => setShowHotelReg(false)}
          />

          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>
          <p className="text-sm text-gray-400 mt-1">Start listing your property</p>

          {/* Hotel Name */}
          <div className="w-full mt-5">
            <label htmlFor="name" className="font-medium text-gray-500 text-sm">
              Hotel Name
            </label>
            <input
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter hotel name"
              className="border border-gray-200 rounded-lg w-full px-3 py-2.5 mt-1.5 outline-indigo-500 text-sm focus:ring-2 focus:ring-indigo-100 transition-all"
              required
            />
          </div>

          {/* Phone */}
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500 text-sm">
              Phone
            </label>
            <input
              id="contact"
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter phone number"
              pattern="[0-9]{10}"
              maxLength={10}
              required
              className="border border-gray-200 rounded-lg w-full px-3 py-2.5 mt-1.5 outline-indigo-500 text-sm focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>

          {/* Hotel Address */}
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500 text-sm">
              Address
            </label>
            <input
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              type="text"
              placeholder="Enter hotel address"
              className="border border-gray-200 rounded-lg w-full px-3 py-2.5 mt-1.5 outline-indigo-500 text-sm focus:ring-2 focus:ring-indigo-100 transition-all"
              required
            />
          </div>

          {/* Select City Drop Down */}
          <div className="w-full mt-4 max-w-60 mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500 text-sm">
              City
            </label>
            <select
              id="city"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className="border border-gray-200 rounded-lg w-full px-3 py-2.5 mt-1.5 outline-indigo-500 text-sm focus:ring-2 focus:ring-indigo-100 transition-all bg-white"
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
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-8 py-2.5 rounded-lg cursor-pointer mt-6 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelRegistration;
