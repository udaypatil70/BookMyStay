export const registerHotelSchema = {
  body: (data) => {
    const errors = {};
    if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
      errors.name = "Hotel name is required (min 2 characters)";
    }
    if (!data.address || typeof data.address !== "string" || data.address.trim().length < 5) {
      errors.address = "Address is required (min 5 characters)";
    }
    if (!data.contact || typeof data.contact !== "string" || data.contact.trim().length < 5) {
      errors.contact = "Contact number is required (min 5 characters)";
    }
    if (!data.city || typeof data.city !== "string" || data.city.trim().length < 2) {
      errors.city = "City is required";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const storeRecentSearchSchema = {
  body: (data) => {
    const errors = {};
    if (!data.recentSearchedCity || typeof data.recentSearchedCity !== "string" || data.recentSearchedCity.trim().length === 0) {
      errors.recentSearchedCity = "City name is required";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const createRoomSchema = {
  body: (data) => {
    const errors = {};
    const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
    if (!data.roomType || !roomTypes.includes(data.roomType)) {
      errors.roomType = `Room type must be one of: ${roomTypes.join(", ")}`;
    }
    const price = Number(data.pricePerNight);
    if (!data.pricePerNight || isNaN(price) || price <= 0) {
      errors.pricePerNight = "Price per night must be a positive number";
    }
    let amenities;
    try {
      amenities = JSON.parse(data.amenities);
      if (!Array.isArray(amenities) || amenities.length === 0) {
        errors.amenities = "At least one amenity is required";
      }
    } catch {
      errors.amenities = "Amenities must be a valid JSON array";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const toggleAvailabilitySchema = {
  body: (data) => {
    const errors = {};
    if (!data.roomId || typeof data.roomId !== "string") {
      errors.roomId = "Room ID is required";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const searchRoomsSchema = {
  query: (data) => {
    const errors = {};
    if (data.priceMin && (isNaN(Number(data.priceMin)) || Number(data.priceMin) < 0)) {
      errors.priceMin = "Minimum price must be a positive number";
    }
    if (data.priceMax && (isNaN(Number(data.priceMax)) || Number(data.priceMax) < 0)) {
      errors.priceMax = "Maximum price must be a positive number";
    }
    if (data.priceMin && data.priceMax && Number(data.priceMin) > Number(data.priceMax)) {
      errors.priceMax = "Maximum price must be greater than minimum price";
    }
    if (data.page && (isNaN(Number(data.page)) || Number(data.page) < 1)) {
      errors.page = "Page must be a positive number";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const updateProfileSchema = {
  body: (data) => {
    const errors = {};
    if (data.username !== undefined) {
      if (typeof data.username !== "string" || data.username.trim().length < 2) {
        errors.username = "Username must be at least 2 characters";
      }
    }
    if (data.phone !== undefined && data.phone && typeof data.phone === "string") {
      const phoneClean = data.phone.replace(/[\s\-+()]/g, "");
      if (!/^\d{7,15}$/.test(phoneClean)) {
        errors.phone = "Please provide a valid phone number";
      }
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const updateHotelSchema = {
  body: (data) => {
    const errors = {};
    if (data.name !== undefined && (typeof data.name !== "string" || data.name.trim().length < 2)) {
      errors.name = "Hotel name must be at least 2 characters";
    }
    if (data.address !== undefined && (typeof data.address !== "string" || data.address.trim().length < 5)) {
      errors.address = "Address must be at least 5 characters";
    }
    if (data.contact !== undefined && (typeof data.contact !== "string" || data.contact.trim().length < 5)) {
      errors.contact = "Contact must be at least 5 characters";
    }
    if (data.city !== undefined && (typeof data.city !== "string" || data.city.trim().length < 2)) {
      errors.city = "City must be at least 2 characters";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const updateBookingStatusSchema = {
  body: (data) => {
    const errors = {};
    if (!data.bookingId || typeof data.bookingId !== "string") {
      errors.bookingId = "Booking ID is required";
    }
    const validStatuses = ["confirmed", "cancelled"];
    if (!data.status || !validStatuses.includes(data.status)) {
      errors.status = `Status must be one of: ${validStatuses.join(", ")}`;
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const checkAvailabilitySchema = {
  body: (data) => {
    const errors = {};
    if (!data.checkInDate) {
      errors.checkInDate = "Check-in date is required";
    }
    if (!data.checkOutDate) {
      errors.checkOutDate = "Check-out date is required";
    }
    if (!data.room || typeof data.room !== "string") {
      errors.room = "Room ID is required";
    }
    if (data.checkInDate && data.checkOutDate) {
      if (new Date(data.checkOutDate) <= new Date(data.checkInDate)) {
        errors.checkOutDate = "Check-out date must be after check-in date";
      }
      if (new Date(data.checkInDate) < new Date(new Date().toDateString())) {
        errors.checkInDate = "Check-in date cannot be in the past";
      }
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const createBookingSchema = {
  body: (data) => {
    const errors = {};
    if (!data.checkInDate) {
      errors.checkInDate = "Check-in date is required";
    }
    if (!data.checkOutDate) {
      errors.checkOutDate = "Check-out date is required";
    }
    if (!data.room || typeof data.room !== "string") {
      errors.room = "Room ID is required";
    }
    const guests = Number(data.guests);
    if (!data.guests || isNaN(guests) || guests < 1 || guests > 10) {
      errors.guests = "Guests must be between 1 and 10";
    }
    const validPaymentMethods = ["Pay At Hotel", "Card", "UPI", "Razorpay"];
    if (data.paymentMethod && !validPaymentMethods.includes(data.paymentMethod)) {
      errors.paymentMethod = `Payment method must be one of: ${validPaymentMethods.join(", ")}`;
    }
    if (data.checkInDate && data.checkOutDate) {
      if (new Date(data.checkOutDate) <= new Date(data.checkInDate)) {
        errors.checkOutDate = "Check-out date must be after check-in date";
      }
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const cancelBookingSchema = {
  body: (data) => {
    const errors = {};
    if (!data.bookingId || typeof data.bookingId !== "string") {
      errors.bookingId = "Booking ID is required";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const contactSchema = {
  body: (data) => {
    const errors = {};
    if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
      errors.name = "Name is required (min 2 characters)";
    }
    if (!data.email || typeof data.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "A valid email is required";
    }
    if (data.phone && typeof data.phone === "string" && data.phone.trim().length > 0) {
      const phoneClean = data.phone.replace(/[\s\-+()]/g, "");
      if (!/^\d{7,15}$/.test(phoneClean)) {
        errors.phone = "Please provide a valid phone number";
      }
    }
    if (data.guests !== undefined) {
      const guests = Number(data.guests);
      if (isNaN(guests) || guests < 1 || guests > 10) {
        errors.guests = "Guests must be between 1 and 10";
      }
    }
    if (!data.message || typeof data.message !== "string" || data.message.trim().length < 10) {
      errors.message = "Message is required (min 10 characters)";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const newsletterSchema = {
  body: (data) => {
    const errors = {};
    if (!data.email || typeof data.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "A valid email is required";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const addReviewSchema = {
  body: (data) => {
    const errors = {};
    if (!data.roomId || typeof data.roomId !== "string") {
      errors.roomId = "Room ID is required";
    }
    const rating = Number(data.rating);
    if (!data.rating || isNaN(rating) || rating < 1 || rating > 5) {
      errors.rating = "Rating must be between 1 and 5";
    }
    if (data.comment && typeof data.comment === "string" && data.comment.trim().length > 0 && data.comment.trim().length < 3) {
      errors.comment = "Comment must be at least 3 characters";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const toggleFavouriteSchema = {
  body: (data) => {
    const errors = {};
    if (!data.hotelId || typeof data.hotelId !== "string") {
      errors.hotelId = "Hotel ID is required";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const updateRoomSchema = {
  body: (data) => {
    const errors = {};
    if (!data.roomId || typeof data.roomId !== "string") {
      errors.roomId = "Room ID is required";
    }
    if (data.roomType) {
      const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
      if (!roomTypes.includes(data.roomType)) {
        errors.roomType = `Room type must be one of: ${roomTypes.join(", ")}`;
      }
    }
    if (data.pricePerNight !== undefined) {
      const price = Number(data.pricePerNight);
      if (isNaN(price) || price <= 0) {
        errors.pricePerNight = "Price per night must be a positive number";
      }
    }
    if (data.amenities) {
      try {
        const amenities = typeof data.amenities === "string" ? JSON.parse(data.amenities) : data.amenities;
        if (!Array.isArray(amenities) || amenities.length === 0) {
          errors.amenities = "At least one amenity is required";
        }
      } catch {
        errors.amenities = "Amenities must be a valid JSON array";
      }
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const deleteRoomSchema = {
  body: (data) => {
    const errors = {};
    if (!data.roomId || typeof data.roomId !== "string") {
      errors.roomId = "Room ID is required";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const razorpayOrderSchema = {
  body: (data) => {
    const errors = {};
    if (!data.bookingId || typeof data.bookingId !== "string") {
      errors.bookingId = "Booking ID is required";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};

export const razorpayVerifySchema = {
  body: (data) => {
    const errors = {};
    if (!data.bookingId || typeof data.bookingId !== "string") {
      errors.bookingId = "Booking ID is required";
    }
    if (!data.razorpay_order_id || typeof data.razorpay_order_id !== "string") {
      errors.razorpay_order_id = "Razorpay order ID is required";
    }
    if (!data.razorpay_payment_id || typeof data.razorpay_payment_id !== "string") {
      errors.razorpay_payment_id = "Razorpay payment ID is required";
    }
    if (!data.razorpay_signature || typeof data.razorpay_signature !== "string") {
      errors.razorpay_signature = "Razorpay signature is required";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};
