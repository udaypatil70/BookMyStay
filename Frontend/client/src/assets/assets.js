import logo from "./logo.svg";
import searchIcon from "./searchIcon.svg";
import userIcon from "./userIcon.svg";
import calenderIcon from "./calenderIcon.svg";
import locationIcon from "./locationIcon.svg";
import starIconFilled from "./starIconFilled.svg";
import arrowIcon from "./arrowIcon.svg";
import starIconOutlined from "./starIconOutlined.svg";
import instagramIcon from "./instagramIcon.svg";
import facebookIcon from "./facebookIcon.svg";
import twitterIcon from "./twitterIcon.svg";
import linkendinIcon from "./linkendinIcon.svg";
import freeWifiIcon from "./freeWifiIcon.svg";
import freeBreakfastIcon from "./freeBreakfastIcon.svg";
import roomServiceIcon from "./roomServiceIcon.svg";
import mountainIcon from "./mountainIcon.svg";
import poolIcon from "./poolIcon.svg";
import homeIcon from "./homeIcon.svg";
import closeIcon from "./closeIcon.svg";
import locationFilledIcon from "./locationFilledIcon.svg";
import heartIcon from "./heartIcon.svg";
import badgeIcon from "./badgeIcon.svg";
import menuIcon from "./menuIcon.svg";
import closeMenu from "./closeMenu.svg";
import guestsIcon from "./guestsIcon.svg";
import roomImg1 from "./roomImg1.png";
import roomImg2 from "./roomImg2.png";
import roomImg3 from "./roomImg3.png";
import roomImg4 from "./roomImg4.png";
import regImage from "./regImage.png";
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";
import BookMyStay from "./BookMyStay.png";
import Bookmystaylogo from "./Bookmystaylogo.png";

export const assets = {
  logo,
  searchIcon,
  userIcon,
  calenderIcon,
  locationIcon,
  starIconFilled,
  arrowIcon,
  starIconOutlined,
  instagramIcon,
  facebookIcon,
  twitterIcon,
  linkendinIcon,
  freeWifiIcon,
  freeBreakfastIcon,
  roomServiceIcon,
  mountainIcon,
  poolIcon,
  closeIcon,
  homeIcon,
  locationFilledIcon,
  heartIcon,
  badgeIcon,
  menuIcon,
  closeMenu,
  guestsIcon,
  regImage,
  addIcon,
  dashboardIcon,
  listIcon,
  uploadArea,
  totalBookingIcon,
  totalRevenueIcon,
  BookMyStay,
  Bookmystaylogo,
};

export const cities = ["Dubai", "Singapore", "New York", "London"];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
  {
    _id: 1,
    title: "Summer Escape Package",
    description: "Enjoy a complimentary night and daily breakfast",
    priceOff: 25,
    expiryDate: "Dec 31",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  },
  {
    _id: 2,
    title: "Romantic Getaway",
    description: "Special couples package including spa treatment",
    priceOff: 20,
    expiryDate: "Jan 31",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  },
  {
    _id: 3,
    title: "Luxury Retreat",
    description:
      "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.",
    priceOff: 30,
    expiryDate: "Feb 28",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
  },
];

// Testimonials Dummy Data
export const testimonials = [
  {
    id: 1,
    name: "Emma Rodriguez",
    address: "Barcelona, Spain",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    rating: 5,
    review:
      "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that BookMyStay provides.",
  },
  {
    id: 2,
    name: "Liam Johnson",
    address: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    rating: 4,
    review:
      "BookMyStay exceeded my expectations. The booking process was seamless, and the hotels were absolutely top-notch. Highly recommended!",
  },
  {
    id: 3,
    name: "Sophia Lee",
    address: "Seoul, South Korea",
    image:
      "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
    rating: 5,
    review:
      "Amazing service! I always find the best luxury accommodations through BookMyStay. Their recommendations never disappoint!",
  },
];

// Facility Icon
export const facilityIcons = {
  "Free WiFi": assets.freeWifiIcon,
  "Free Breakfast": assets.freeBreakfastIcon,
  "Room Service": assets.roomServiceIcon,
  "Mountain View": assets.mountainIcon,
  "Pool Access": assets.poolIcon,
};

// For Room Details Page
export const roomCommonData = [
  {
    icon: assets.homeIcon,
    title: "Clean & Safe Stay",
    description: "A well-maintained and hygienic space just for you.",
  },
  {
    icon: assets.badgeIcon,
    title: "Enhanced Cleaning",
    description: "This host follows BookMyStay's strict cleaning standards.",
  },
  {
    icon: assets.locationFilledIcon,
    title: "Excellent Location",
    description: "90% of guests rated the location 5 stars.",
  },
  {
    icon: assets.heartIcon,
    title: "Smooth Check-In",
    description: "100% of guests gave check-in a 5-star rating.",
  },
];

// User Dummy Data
export const userDummyData = {
  _id: "user_2unqyL4diJFP1E3pIBnasc7w8hP",
  username: "Great Stack",
  email: "user.greatstack@gmail.com",
  image:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
  role: "hotelOwner",
  createdAt: "2025-03-25T09:29:16.367Z",
  updatedAt: "2025-04-10T06:34:48.719Z",
  __v: 1,
  recentSearchedCities: ["New York"],
};

// Hotel Dummy Data
export const hotelDummyData = {
  _id: "67f76393197ac559e4089b72",
  name: "Urbanza Suites",
  address: "Main Road  123 Street , 23 Colony",
  contact: "+0123456789",
  owner: userDummyData,
  city: "New York",
  createdAt: "2025-04-10T06:22:11.663Z",
  updatedAt: "2025-04-10T06:22:11.663Z",
  __v: 0,
};

// Extra Hotels Dummy Data (for display variety)
export const extraHotelsDummyData = [
  {
    _id: "67f76393197ac559e4089b73",
    name: "The Grand Palazzo",
    address: "Marina Boulevard 45",
    contact: "+9714123456",
    owner: userDummyData,
    city: "Dubai",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  },
  {
    _id: "67f76393197ac559e4089b74",
    name: "Sakura Garden Resort",
    address: "Orchard Road 12",
    contact: "+6591234567",
    owner: userDummyData,
    city: "Singapore",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
  },
  {
    _id: "67f76393197ac559e4089b75",
    name: "Royal Heritage Inn",
    address: "Westminster Bridge Road 8",
    contact: "+442012345678",
    owner: userDummyData,
    city: "London",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  },
  {
    _id: "67f76393197ac559e4089b76",
    name: "Lotus Grand Resort",
    address: "MG Road, Connaught Place",
    contact: "+91112345678",
    owner: userDummyData,
    city: "New Delhi",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
  },
  {
    _id: "67f76393197ac559e4089b77",
    name: "Coastal Breeze Hotel",
    address: "JBR Walk, Beach Road",
    contact: "+97150123456",
    owner: userDummyData,
    city: "Dubai",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
  },
  {
    _id: "67f76393197ac559e4089b78",
    name: "Mountain View Lodge",
    address: "Rishikesh-Haridwar Highway",
    contact: "+91987654321",
    owner: userDummyData,
    city: "Rishikesh",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
  },
];

// Rooms Dummy Data
export const roomsDummyData = [
  {
    _id: "67f7647c197ac559e4089b96",
    hotel: hotelDummyData,
    roomType: "Double Bed",
    pricePerNight: 399,
    amenities: ["Room Service", "Mountain View", "Pool Access"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d955e5bde?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
    ],
    isAvailable: true,
    createdAt: "2025-04-10T06:26:04.013Z",
    updatedAt: "2025-04-10T06:26:04.013Z",
    __v: 0,
  },
  {
    _id: "67f76452197ac559e4089b8e",
    hotel: hotelDummyData,
    roomType: "Suite",
    pricePerNight: 599,
    amenities: ["Room Service", "Mountain View", "Pool Access", "Free Breakfast"],
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d955e5bde?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
    ],
    isAvailable: true,
    createdAt: "2025-04-10T06:25:22.593Z",
    updatedAt: "2025-04-10T06:25:22.593Z",
    __v: 0,
  },
  {
    _id: "67f76406197ac559e4089b82",
    hotel: hotelDummyData,
    roomType: "Single Bed",
    pricePerNight: 249,
    amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    ],
    isAvailable: true,
    createdAt: "2025-04-10T06:24:06.285Z",
    updatedAt: "2025-04-10T06:24:06.285Z",
    __v: 0,
  },
  {
    _id: "67f763d8197ac559e4089b7a",
    hotel: hotelDummyData,
    roomType: "Deluxe Room",
    pricePerNight: 449,
    amenities: ["Free WiFi", "Room Service", "Pool Access"],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d955e5bde?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
    ],
    isAvailable: true,
    createdAt: "2025-04-10T06:23:20.252Z",
    updatedAt: "2025-04-10T06:23:20.252Z",
    __v: 0,
  },
];

// User Bookings Dummy Data
export const userBookingsDummyData = [
  {
    _id: "67f76839994a731e97d3b8ce",
    user: userDummyData,
    room: roomsDummyData[1],
    hotel: hotelDummyData,
    checkInDate: "2025-04-30T00:00:00.000Z",
    checkOutDate: "2025-05-01T00:00:00.000Z",
    totalPrice: 299,
    guests: 1,
    status: "pending",
    paymentMethod: "Razorpay",
    isPaid: true,
    createdAt: "2025-04-10T06:42:01.529Z",
    updatedAt: "2025-04-10T06:43:54.520Z",
    __v: 0,
  },
  {
    _id: "67f76829994a731e97d3b8c3",
    user: userDummyData,
    room: roomsDummyData[0],
    hotel: hotelDummyData,
    checkInDate: "2025-04-27T00:00:00.000Z",
    checkOutDate: "2025-04-28T00:00:00.000Z",
    totalPrice: 399,
    guests: 1,
    status: "pending",
    paymentMethod: "Pay At Hotel",
    isPaid: false,
    createdAt: "2025-04-10T06:41:45.873Z",
    updatedAt: "2025-04-10T06:41:45.873Z",
    __v: 0,
  },
  {
    _id: "67f76810994a731e97d3b8b4",
    user: userDummyData,
    room: roomsDummyData[3],
    hotel: hotelDummyData,
    checkInDate: "2025-04-11T00:00:00.000Z",
    checkOutDate: "2025-04-12T00:00:00.000Z",
    totalPrice: 199,
    guests: 1,
    status: "pending",
    paymentMethod: "Pay At Hotel",
    isPaid: false,
    createdAt: "2025-04-10T06:41:20.501Z",
    updatedAt: "2025-04-10T06:41:20.501Z",
    __v: 0,
  },
];

// Dashboard Dummy Data
export const dashboardDummyData = {
  totalBookings: 3,
  totalRevenue: 897,
  bookings: userBookingsDummyData,
};

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/
