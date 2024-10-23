import axios from "axios";
import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useState } from "react";
import "./carousel.css";
import { toast } from "react-toastify";

const Carousel = () => {
  const [api, setApi] = useState([]);

  const getPicsum = async () => {
    try {
      const res = await axios.get("https://picsum.photos/v2/list");
      const data = res.data.slice(0, 5);
      setApi(data);
      // console.log(data)
    } catch (error) {
      // toast.error(error.response.data.message);
      // console.log(error);
    }
  };

  const settings = {
    items: 1,
    loop: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 1500,
    smartSpeed: 1000,
    dotClass: "owl-dot",
    dotsClass: "owl-dots",
    dotContainerClass: "owl-dot-container",
  };

  useEffect(() => {
    getPicsum();
  }, []);
  return (
    <OwlCarousel className="owl-theme" {...settings}>
      {api.map((item, id) => (
        <div key={id} className="main-div">
          {/* <p className="txt">{item.author} </p> */}
          <img className="img" src={item.download_url} alt={item.url} />
        </div>
      ))}
    </OwlCarousel>
  );
};

export default Carousel;
