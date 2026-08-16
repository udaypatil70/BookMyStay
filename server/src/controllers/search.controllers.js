import Room from "../models/Room.models.js";
import Hotel from "../models/Hotel.models.js";
import Booking from "../models/bookings.models.js";

// API to search rooms with filters
const searchRooms = async (req, res) => {
  try {
    const {
      city,
      checkIn,
      checkOut,
      priceMin,
      priceMax,
      roomType,
      guests,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    // Build base match
    const matchStage = { isAvailable: true };

    // Price filter
    if (priceMin || priceMax) {
      matchStage.pricePerNight = {};
      if (priceMin) matchStage.pricePerNight.$gte = Number(priceMin);
      if (priceMax) matchStage.pricePerNight.$lte = Number(priceMax);
    }

    // Room type filter
    if (roomType) {
      const validTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
      if (validTypes.includes(roomType)) {
        matchStage.roomType = roomType;
      }
    }

    // Build aggregation pipeline
    const pipeline = [
      { $match: matchStage },
      {
        $lookup: {
          from: "hotels",
          localField: "hotel",
          foreignField: "_id",
          as: "hotelData",
        },
      },
      { $unwind: "$hotelData" },
    ];

    // City filter (on joined hotel)
    if (city) {
      pipeline.push({
        $match: {
          "hotelData.city": { $regex: new RegExp(city, "i") },
        },
      });
    }

    // Date availability filter
    if (checkIn && checkOut) {
      const bookedRoomIds = await Booking.distinct("room", {
        status: { $ne: "cancelled" },
        checkInDate: { $lte: new Date(checkOut) },
        checkOutDate: { $gte: new Date(checkIn) },
      });

      if (bookedRoomIds.length > 0) {
        pipeline.push({
          $match: {
            _id: { $nin: bookedRoomIds },
          },
        });
      }
    }

    // Lookup hotel owner image
    pipeline.push({
      $lookup: {
        from: "users",
        localField: "hotelData.owner",
        foreignField: "_id",
        as: "ownerData",
        pipeline: [{ $project: { image: 1 } }],
      },
    });

    pipeline.push({
      $addFields: {
        "hotelData.owner": { $arrayElemAt: ["$ownerData", 0] },
      },
    });

    // Sort
    let sortStage = { createdAt: -1 };
    if (sort === "price_low") sortStage = { pricePerNight: 1 };
    else if (sort === "price_high") sortStage = { pricePerNight: -1 };
    else if (sort === "rating") sortStage = { avgRating: -1 };

    pipeline.push({ $sort: sortStage });

    // Count total before pagination
    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await Room.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: Number(limit) });

    // Project final shape
    pipeline.push({
      $project: {
        _id: 1,
        roomType: 1,
        pricePerNight: 1,
        amenities: 1,
        images: 1,
        isAvailable: 1,
        description: 1,
        createdAt: 1,
        hotel: {
          _id: "$hotelData._id",
          name: "$hotelData.name",
          address: "$hotelData.address",
          city: "$hotelData.city",
          contact: "$hotelData.contact",
          owner: {
            image: "$hotelData.owner.image",
          },
        },
      },
    });

    const rooms = await Room.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      rooms,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get all available cities with hotel counts
const getCities = async (req, res) => {
  try {
    const cities = await Hotel.aggregate([
      {
        $group: {
          _id: "$city",
          hotelCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "rooms",
          let: { cityId: "$_id" },
          pipeline: [
            {
              $lookup: {
                from: "hotels",
                localField: "hotel",
                foreignField: "_id",
                as: "hotelData",
              },
            },
            { $unwind: "$hotelData" },
            { $match: { "hotelData.city": "$$cityId", isAvailable: true } },
            { $count: "count" },
          ],
          as: "roomData",
        },
      },
      {
        $addFields: {
          roomCount: {
            $ifNull: [{ $arrayElemAt: ["$roomData.count", 0] }, 0],
          },
        },
      },
      {
        $project: {
          _id: 0,
          city: "$_id",
          hotelCount: 1,
          roomCount: 1,
        },
      },
      { $sort: { hotelCount: -1 } },
    ]);

    return res.status(200).json({
      success: true,
      cities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get featured/popular rooms (most reviewed or highest rated)
const getFeaturedRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 })
      .limit(6);

    return res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// API to get a single room by ID
const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id).populate({
      path: "hotel",
      populate: {
        path: "owner",
        select: "image username",
      },
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { searchRooms, getCities, getFeaturedRooms, getRoomById };
