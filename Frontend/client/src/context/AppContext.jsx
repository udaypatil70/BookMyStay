import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

const safeGetToken = async (getToken) => {
  try {
    return await getToken();
  } catch (err) {
    console.warn("getToken failed (clipboard/permissions issue):", err.message);
    return null;
  }
};

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [hotelStatus, setHotelStatus] = useState("none");
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get("/api/rooms");
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchHotelStatus = async (token) => {
    try {
      const t = token || await safeGetToken(getToken);
      if (!t) return;
      const { data } = await axios.get("/api/hotels/owner/details", {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (data.success && data.hotel) {
        setHotelStatus(data.hotel.status || "active");
      } else {
        setHotelStatus("none");
      }
    } catch {
      setHotelStatus("none");
    }
  };

  const fetchUser = async () => {
    if (!user) return;

    const token = await safeGetToken(getToken);
    if (!token) return;

    try {
      const { data } = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        const roleIsOwner = data.role === "hotelOwner";
        setSearchedCities(data.recentSearchedCities);
        fetchFavourites(token);

        if (data.role === "user") {
          setIsOwner(false);
          setHotelStatus("none");
        } else {
          const hotelData = await axios.get("/api/hotels/owner/details", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (hotelData.data.success && hotelData.data.hotel) {
            const status = hotelData.data.hotel.status;
            setHotelStatus(status);
            setIsOwner(roleIsOwner && status === "active");
          } else {
            setHotelStatus("none");
            setIsOwner(false);
          }
        }
      } else {
        setTimeout(() => {
          fetchUser();
        }, 5000);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchFavourites = async (token) => {
    try {
      const t = token || await safeGetToken(getToken);
      if (!t) return;
      const { data } = await axios.get("/api/user/favourites", {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (data.success) {
        setFavourites(data.favourites.map((h) => h._id));
      }
    } catch {}
  };

  const toggleFavourite = async (hotelId) => {
    try {
      const token = await safeGetToken(getToken);
      if (!token) return;
      const { data } = await axios.post(
        "/api/user/toggle-favourite",
        { hotelId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (data.success) {
        setFavourites(data.favourites);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const value = {
    currency,
    navigate,
    user,
    getToken: () => safeGetToken(getToken),
    axios,
    isOwner,
    setIsOwner,
    hotelStatus,
    setHotelStatus,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
    fetchUser,
    fetchHotelStatus,
    rooms,
    setRooms,
    favourites,
    toggleFavourite,
    fetchFavourites,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
