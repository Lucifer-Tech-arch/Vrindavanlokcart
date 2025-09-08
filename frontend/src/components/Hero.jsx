import { assests } from '../assets/assests'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const heroImages = [
    { id: 1, src: assests.hero1, alt: "Shop Spiritual Collection" },
    { id: 2, src: assests.hero2, alt: "Divine & Cultural Products" },
    {id: 3, src: assests.hero3, alt: ""},
    {id: 4, src: assests.hero4, alt: ""},
    {id: 5, src: assests.hero5, alt: ""}
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };
  return (
   <div className="w-full relative pt-[100px]">
      <Slider {...settings}>
        {heroImages.map((item) => (
          <div key={item.id} className="relative">
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Hero
