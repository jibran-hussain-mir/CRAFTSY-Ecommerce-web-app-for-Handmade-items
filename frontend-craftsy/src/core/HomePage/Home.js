import React, { useState, useEffect } from "react";
import axios from "axios";
import CategorieCard from "./CategorieCard";
import "../css/Home.css";
import forbes from "./../../assets/logos/forbes.png";
import tbi from "./../../assets/logos/business-insider.png";
import tc from "./../../assets/logos/techcrunch.png";
import ut from "./../../assets/logos/usa-today.png";
import tnyt from "./../../assets/logos/the-new-york-times.png";
import first from "./../../assets/slideshow/1.png";
import second from "./../../assets/slideshow/2.png";
import third from "./../../assets/slideshow/3.png";
import fourth from "./../../assets/slideshow/4.png";
import fifth from "./../../assets/slideshow/5.png";
import sixth from "./../../assets/slideshow/6.png";
import seventh from "./../../assets/slideshow/7.png";
import eighth from "./../../assets/slideshow/8.png";
// import cardsimg from "./../../assets/handi1.jpg";
import bsimg1 from "./../../assets/bs-img1.jpg";
import tshirt1 from "./../../assets/tshirt1.jpg";
import tshirt2 from "./../../assets/tshirt2.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FeaturedProductCards from "./FeaturedProductCards";

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

function Home() {
  const [data, setData] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/products?limit=20"
      );
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
          Discover. Create. Connect. Shop Handmade with{" "}
          <span className="h-span">Craftsy</span>
        </h1>
        <div className="arrow-down">
          <div className="left"></div>
          <div className="right"></div>
        </div>
      </div>
      <CategorieCard />

      <div className="cate-cards-cont">
        {/* For simiple Products */}
        <div className="featured-product-card">
          {data.map((product) => (
            <FeaturedProductCards
              key={product._id}
              productId={product._id}
              title={product.name}
              price={product.price}
              img={product.photo}
              description={product.description.slice(0, 60)}
            />
          ))}
        </div>
      </div>
      <div className="hero-section2">
        <h1 className="herosec2-h1">Empowering Artisans,</h1>
        <p className="herosec2-p">One Handmade Treasure at a Time.</p>
        <button className="herosec2-btn">About Us</button>
      </div>
      <div className="shop-limited-section">
        <div className="fig-1">
          <h3 className="first-txt">Shop Limited Edition with Craftsy</h3>
          <div>
            <button className="shop-l-btn">Shop Limited Edition</button>
          </div>
        </div>
        <div className="fig-2">
          <h3 className="scnd-txt">Handmade Food, Now Available</h3>
          <div>
            <button className="shop-l-btn">Shop Handmade Food</button>
          </div>
        </div>
      </div>
      <section className="section-featured">
        <div className="containeer">
          <h2 className="heading-featured-in">As featured in</h2>
          <div className="logosx">
            <img src={tc} alt="Techcrunch logo" />
            <img src={tbi} alt="Business Insider logo" />
            <img src={tnyt} alt="The New York Times logo" />
            <img src={forbes} alt="Forbes logo" />
            <img src={ut} alt="USA Today logo" />
          </div>
        </div>
      </section>
      <div className="car-section">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
          arrows={false}
        >
          <div>
            <img src={first} alt="alala" />
          </div>
          <div>
            <img src={second} alt="alala" />
          </div>
          <div>
            <img src={third} alt="alala" />
          </div>
          <div>
            <img src={fourth} alt="alala" />
          </div>
          <div>
            <img src={fifth} alt="alala" />
          </div>
          <div>
            <img src={sixth} alt="alala" />
          </div>
          <div>
            <img src={seventh} alt="alala" />
          </div>
          <div>
            <img src={eighth} alt="alala" />
          </div>
        </Carousel>
      </div>
      <div className="bs-h1">
        <h1>Shop Our Best Selling Products.</h1>
      </div>
      {/* ///////////////////////////////// */}

      <div className="featured-product-card">
        <FeaturedProductCards title="T-Shirt" price="$33" img={tshirt1} />
        <FeaturedProductCards
          title="Kashmiri Shawl"
          price="$323"
          img={tshirt2}
        />
        <FeaturedProductCards
          title="Kashmiri Shawl"
          price="$323"
          img={tshirt2}
        />
        <FeaturedProductCards
          title="Kashmiri Shawl"
          price="$323"
          img={tshirt2}
        />
        <FeaturedProductCards
          title="Kashmiri Shawl"
          price="$323"
          img={tshirt2}
        />
        <FeaturedProductCards
          title="Kashmiri Shawl"
          price="$323"
          img={tshirt2}
        />
        <FeaturedProductCards
          title="Kashmiri Shawl"
          price="$323"
          img={tshirt2}
        />
        <FeaturedProductCards
          title="Kashmiri Shawl"
          price="$323"
          img={tshirt2}
        />
        <FeaturedProductCards
          title="Kashmiri Shawl"
          price="$323"
          img={tshirt2}
        />
        <FeaturedProductCards
          title="Kashmiri Shawl"
          price="$323"
          img={tshirt2}
        />
        <FeaturedProductCards
          title="Kashmiri Shawl"
          price="$323"
          img={tshirt2}
        />
        <FeaturedProductCards
          title="Kashmiri Shawl"
          price="$323"
          img={tshirt2}
        />

        <FeaturedProductCards title="Shawls" price="$116" img={tshirt1} />
        <FeaturedProductCards title="Jackets" price="$467" img={tshirt2} />
      </div>
      {/* ///////////////////////////////// */}
    </div>
  );
}

export default Home;
