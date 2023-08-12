function Home() {
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
        <div className="">
          <a href="/" class="aboutus-btn btnz">
            About us
          </a>
        </div>
      </div>

      <div className="section-heading">Shop our best selling products</div>
      <div className="page-content">
        <BestSellingProducts
          imgURL="https://cdn.kastatic.org/ka-perseus-images/05bd6ec34ba25c9bf8cefad93d1e2231534504cf.jpg"
          title={"Kashmiri Shawl"}
          copy={"Best Selling Kashmiri Shawl available here okay. "}
        />
        <BestSellingProducts
          imgURL="https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1269&q=80"
          title="Kashmiri Shawl"
          copy="Best Selling Kashmiri Shawl available here okay. "
        />
        <BestSellingProducts
          imgURL="https://images.unsplash.com/photo-1594040226829-7f251ab46d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          title={"Kashmiri Shawl"}
          copy={"Best Selling Kashmiri Shawl available here okay. "}
        />
        <BestSellingProducts
          imgURL="https://images.unsplash.com/photo-1638256049300-d5fbdae0e8c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGhhbmRpY3JhZnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
          title={"Kashmiri Shawl"}
          copy={"Best Selling Kashmiri Shawl available here okay. "}
        />
      </div>
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
          testimonial="sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in"
          name="Jibran Hussain"
        />
        <Testimonials
          srcx={
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80"
          }
          testimonial="sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in"
          name="Fahad Farooq"
        />
        <Testimonials
          srcx={
            "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"
          }
          testimonial="sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in"
          name="Aqeel Sidiq"
        />
        <Testimonials
          srcx={
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80"
          }
          testimonial="sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in"
          name="Jibran Hussain"
        />
        <Testimonials
          srcx={
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80"
          }
          testimonial="sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in"
          name="Abdullah Fazili"
        />
        <Testimonials
          srcx={
            "https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
          }
          testimonial="sodales ut etiam sit amet nisl purus in mollis nunc sed id semper risus in hendrerit gravida rutrum quisque non tellus orci ac auctor augue mauris augue neque gravida in"
          name="Shakir Khan"
        />
      </div>
      <Footer />
    </div>
  );
}
