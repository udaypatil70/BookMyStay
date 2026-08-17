import Hero from "../components/Hero";
import FeaturedDestination from '../components/FeaturedDestination';
import ExclusiveOffers from '../components/ExclusiveOffers';
import Testimonial from '../components/Testimonial';
import NewLetter from "../components/NewLetter";
import RecommendedHotels from "../components/RecommendedHotels";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedDestination />
      <ExclusiveOffers />
      <RecommendedHotels />
      <Testimonial />
      <NewLetter />
    </>
  )
}

export default Home
