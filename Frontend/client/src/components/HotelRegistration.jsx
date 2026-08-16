import { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const HotelRegistration = () => {
  const { setShowHotelReg, axios, getToken, setHotelStatus } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [documents, setDocuments] = useState([]);
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

      const formData = new FormData();
      formData.append("name", name);
      formData.append("contact", contact);
      formData.append("address", address);
      formData.append("city", city);

      documents.forEach((doc) => {
        formData.append("documents", doc);
      });

      const { data } = await axios.post(`/api/hotels`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        setHotelStatus("pending");
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

  const removeDocument = (index) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      onClick={() => setShowHotelReg(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex bg-white rounded-2xl max-w-4xl max-md:mx-2 shadow-2xl max-h-[90vh] overflow-y-auto"
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
          <p className="text-sm text-gray-400 mt-1">Submit details for admin review</p>

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

          {/* Document Upload */}
          <div className="w-full mt-5">
            <label className="font-medium text-gray-500 text-sm">
              Ownership Documents
            </label>
            <p className="text-xs text-gray-400 mt-0.5 mb-2">
              Upload proof of ownership (license, registration, etc.)
            </p>
            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
              <div className="flex flex-col items-center gap-1">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-xs text-gray-400">Tap to upload files</span>
              </div>
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files);
                  setDocuments((prev) => [...prev, ...newFiles].slice(0, 5));
                  e.target.value = "";
                }}
              />
            </label>
            {documents.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                  >
                    <span className="text-xs text-gray-600 truncate max-w-[200px]">
                      {doc.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-red-400 hover:text-red-600 ml-2 shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                Submitting...
              </>
            ) : (
              "Submit for Review"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelRegistration;
