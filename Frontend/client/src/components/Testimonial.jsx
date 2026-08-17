import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <div className="py-24 px-6 md:px-16 lg:px-24">
      <Title
        title="What Our Guests Say"
        subtitle="Discover why discerning travelers consistently choose BookMyStay for their exclusive and luxurious accommodation around the world."
      />
      <div className="flex flex-wrap justify-center gap-6 mt-16">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-2xl p-6 shadow-sm hover-lift card-glow max-w-sm"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-lg">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.address}</p>
              </div>
            </div>
            <div className="mt-3">
              <StarRating rating={testimonial.rating} />
            </div>
            <p className="text-slate-600 mt-3 text-sm leading-relaxed italic">
              &ldquo;{testimonial.review}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
