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
    const validPaymentMethods = ["Pay At Hotel", "Card", "UPI"];
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

export const stripePaymentSchema = {
  body: (data) => {
    const errors = {};
    if (!data.bookingId || typeof data.bookingId !== "string") {
      errors.bookingId = "Booking ID is required";
    }
    return Object.keys(errors).length > 0 ? errors : null;
  },
};
