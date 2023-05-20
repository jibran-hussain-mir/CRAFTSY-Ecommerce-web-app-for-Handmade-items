import React from "react";
import image1 from "./Slider Images/1.jpg";
import image2 from "./Slider Images/2.jpeg";
import image3 from "./Slider Images/3.jpeg";
import SimpleImageSlider from "react-simple-image-slider";

const Carosal = () => {
  const images = [
    { url: image1 },
    { url: image2 },
    { url: image3 },
    { url: image1 },
    { url: image2 },
    { url: image3 },
    { url: image1 },
  ];

  return (
    <div>
      <SimpleImageSlider
        width="100%"
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
        autoPlay
        autoPlayDelay={5}
      />
    </div>
  );
};

export default Carosal;
