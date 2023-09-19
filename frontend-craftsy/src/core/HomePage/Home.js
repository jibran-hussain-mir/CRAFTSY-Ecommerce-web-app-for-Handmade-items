import React, { useState, useEffect } from "react";
import "./css/Home.css";
import axios from "axios";
import CategorieCard from "./CategorieCard";
import BestSellingProducts from "./BestSellingProducts";
import second from "./../../assets/slideshow/2.png";
import third from "./../../assets/slideshow/3.png";
import fourth from "./../../assets/slideshow/4.png";
import fifth from "./../../assets/slideshow/5.png";
import sixth from "./../../assets/slideshow/6.png";
import seventh from "./../../assets/slideshow/7.png";
import eighth from "./../../assets/slideshow/8.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import { Bars } from "react-loader-spinner";

const Home = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const [data, setData] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/products?limit=12`
      );
      setProductLoading(false);

      console.log(response);
      const { products } = response.data;
      console.log(products);
      setData(products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <div>
      <div className="hero-section">
        <h1 className="hero-heading">
          {" "}
          Discover. Create. Connect.{" "}
          <span className="q-span">Shop Handmade with</span>{" "}
          <span className="h-span">Craftsy</span>
        </h1>
      </div>
      <div className="cate-heading">Shop by Categories</div>
      <div className="categories-container">
        <div className="categorie-cards">
          <CategorieCard />
        </div>
      </div>
      <div className="aboutus-section">
        <div className="aboutus-heading">
          Craftsy <span className="aboutus-span">Empowering Artisans</span>
        </div>
        {/* <div className="">
          <a href="/" className="aboutus-btn btnz">
            About us
          </a>
        </div> */}
      </div>

      <div className="section-heading">Shop our best selling products</div>

      {productLoading ? (
        <Bars
          height="80"
          width="80"
          color="#8A4AF3"
          ariaLabel="bars-loading"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <div className="page-content">
          {data.map((product) => (
            <BestSellingProducts
              key={product._id}
              productId={product._id}
              title={product.name}
              price={product.price}
              imgURL={product.photo}
              copy={product.description.slice(0, 60)}
            />
          ))}
        </div>
      )}

      <hr />
      <div className="car-section">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={1800}
          infinite={true}
          arrows={false}
        >
          <div className="imageFlex">
            <img src={second} alt="alala" className="car-img" />
          </div>
          <div className="imageFlex">
            <img src={third} alt="alala" className="car-img" />
          </div>
          <div className="imageFlex">
            <img src={fourth} alt="alala" className="car-img" />
          </div>
          <div className="imageFlex">
            <img src={fifth} alt="alala" className="car-img" />
          </div>
          <div className="imageFlex">
            <img src={sixth} alt="alala" className="car-img" />
          </div>
          <div className="imageFlex">
            <img src={seventh} alt="alala" className="car-img" />
          </div>
          <div className="imageFlex">
            <img src={eighth} alt="alala" className="car-img" />
          </div>
        </Carousel>
      </div>
      <hr />
      <div className="testimonial-heading">Testimonials</div>
      <div className="testmonial-section">
        <Testimonials
          srcx={
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80"
          }
          testimonial="Craftsy's handmade items are a treasure trove! They've transformed my home with unique, quality pieces. Every purchase feels like discovering a hidden gem."
          name="Jibran Hussain Mir"
        />
        <Testimonials
          srcx={
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80"
          }
          testimonial="Craftsy's artisans are true wizards! I've found exceptional gifts here. Their creations reflect craftsmanship and genuine passion. Craftsy is my go-to for one-of-a-kind treasures."
          name="Fahad Farooq"
        />
        <Testimonials
          srcx={
            "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"
          }
          testimonial="Craftsy is my ultimate destination for supporting artisans. Their collection showcases remarkable skill and boundless creativity. With Craftsy, gifting becomes an artful expression of appreciation."
          name="Abdullah Fazili"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
