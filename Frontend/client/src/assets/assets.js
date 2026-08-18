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

// Extra Hotels Dummy Data (for Featured Destination fallback)
export const extraHotelsDummyData = [
  {
    _id: "67f76393197ac559e4089b73",
    name: "The Grand Palazzo",
    address: "Marina Boulevard 45",
    contact: "+9714123456",
    city: "Dubai",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  },
  {
    _id: "67f76393197ac559e4089b74",
    name: "Sakura Garden Resort",
    address: "Orchard Road 12",
    contact: "+6591234567",
    city: "Singapore",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
  },
  {
    _id: "67f76393197ac559e4089b75",
    name: "Royal Heritage Inn",
    address: "Westminster Bridge Road 8",
    contact: "+442012345678",
    city: "London",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  },
  {
    _id: "67f76393197ac559e4089b76",
    name: "Lotus Grand Resort",
    address: "MG Road, Connaught Place",
    contact: "+91112345678",
    city: "New Delhi",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
  },
  {
    _id: "67f76393197ac559e4089b77",
    name: "Coastal Breeze Hotel",
    address: "JBR Walk, Beach Road",
    contact: "+97150123456",
    city: "Dubai",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
  },
  {
    _id: "67f76393197ac559e4089b78",
    name: "Mountain View Lodge",
    address: "Rishikesh-Haridwar Highway",
    contact: "+91987654321",
    city: "Rishikesh",
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
  },
];
