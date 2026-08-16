import React from "react";
import Title from "./Title";
import { testimonials } from "../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30">
      <Title
        title="What Our Guests Say"
        subtitle="Discover why discerning travelers consistently choose BookMyStay for their exclusive and luxurious accommodation around the world."
      />
      <div className="flex flex-wrap items-center gap-6 mt-20 stagger-children">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow hover-lift card-glow max-w-sm">
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="font-playfair text-xl">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <StarRating rating={testimonial.rating} />
            </div>
            <p className="text-gray-500 max-w-90 mt-4 italic">
              "{testimonial.review}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
