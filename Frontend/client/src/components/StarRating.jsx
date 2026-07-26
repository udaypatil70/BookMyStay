import { assets } from "../assets/assets";

const StarRating = ({ rating = 4 }) => {
  return (
    <div className="flex items-center gap-1">
      {Array(5)
        .fill("")
        .map((_, index) => (
          <img
            key={index}
            src={
              rating > index ? assets.starIconFilled : assets.starIconOutlined
            }
            alt="Star Icon"
            className="w-4 h-4"
          />
        ))}
    </div>
  );
};

export default StarRating;
