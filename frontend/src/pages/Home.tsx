import about from "../assets/images/about.jpg";
import kind1 from "../assets/images/kind-1.jpg";
import kind2 from "../assets/images/kind-2.jpg";
import kind3 from "../assets/images/kind-3.jpg";
import kind4 from "../assets/images/kind-4.jpg";
import kind5 from "../assets/images/kind-5.jpg";
import kind6 from "../assets/images/kind-6.jpg";
import prod1 from "../assets/images/prod-1.jpg";
import prod2 from "../assets/images/prod-7.jpg";
import prod3 from "../assets/images/prod-3.jpg";
import prod4 from "../assets/images/prod-4.jpg";
import prod5 from "../assets/images/prod-5.jpg";
import prod6 from "../assets/images/prod-6.jpg";
import prod7 from "../assets/images/prod-7.jpg";
import prod8 from "../assets/images/prod-8.jpg";
import bg4 from "../assets/images/bg_4.jpg";
import person1 from "../assets/images/person_1.jpg";
import person2 from "../assets/images/person_2.jpg";
import person3 from "../assets/images/person_3.jpg";
import person4 from "../assets/images/person_4.jpg";
import person5 from "../assets/images/person_1.jpg";
import image1 from "../assets/images/image_1.jpg";
import image2 from "../assets/images/image_2.jpg";
import image3 from "../assets/images/image_3.jpg";
import image4 from "../assets/images/image_4.jpg";
import bg2 from "../assets/images/bg_2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Home = () => {
  return (
    <>
      <div
        className="hero-wrap"
        style={{ backgroundImage: `url(${bg2})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-8 ftco-animate d-flex align-items-end">
              <div className="text w-100 text-center">
                <h1 className="mb-4">
                  Good <span>Drink</span> for Good <span>Moments</span>.
                </h1>
                <p>
                  <a className="btn btn-primary py-2 px-4">Shop Now</a>{" "}
                  <a className="btn btn-white btn-outline-white py-2 px-4">
                    Read more
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Intro Section */}
      <section className="ftco-intro">
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-4 d-flex">
              <div className="intro d-lg-flex w-100 ftco-animate">
                <div className="icon">
                  <span className="flaticon-support"></span>
                </div>
                <div className="text">
                  <h2>Online Support 24/7</h2>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="intro color-1 d-lg-flex w-100 ftco-animate">
                <div className="icon">
                  <span className="flaticon-cashback"></span>
                </div>
                <div className="text">
                  <h2>Money Back Guarantee</h2>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="intro color-2 d-lg-flex w-100 ftco-animate">
                <div className="icon">
                  <span className="flaticon-free-delivery"></span>
                </div>
                <div className="text">
                  <h2>Free Shipping & Return</h2>
                  <p>
                    A small river named Duden flows by their place and supplies
                    it with the necessary regelialia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="ftco-section ftco-no-pb">
        <div className="container">
          <div className="row">
            <div
              className="col-md-6 img img-3 d-flex justify-content-center align-items-center"
              style={{ backgroundImage: `url(${about})` }}
            ></div>
            <div className="col-md-6 wrap-about pl-md-5 ftco-animate py-5">
              <div className="heading-section">
                <span className="subheading">Since 1905</span>
                <h2 className="mb-4">Desire Meets A New Taste</h2>
                <p>
                  A small river named Duden flows by their place and supplies it
                  with the necessary regelialia. It is a paradisematic country,
                  in which roasted parts of sentences fly into your mouth.
                </p>
                <p>
                  On her way she met a copy. The copy warned the Little Blind
                  Text, that where it came from it would have been rewritten a
                  thousand times and everything that was left from its origin
                  would be the word "and" and the Little Blind Text should turn
                  around and return to its own, safe country.
                </p>
                <p className="year">
                  <strong className="number" data-number="115">
                    0
                  </strong>
                  <span>Years of Experience In Business</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kind Section */}
      <section className="ftco-section ftco-no-pb">
        <div className="container">
          <div className="row">
            {[kind1, kind2, kind3, kind4, kind5, kind6].map((kind, idx) => {
              const names = [
                "Brandy",
                "Gin",
                "Rum",
                "Tequila",
                "Vodka",
                "Whiskey"
              ];
              return (
                <div key={idx} className="col-lg-2 col-md-4">
                  <div className="sort w-100 text-center ftco-animate">
                    <div
                      className="img"
                      style={{ backgroundImage: `url(${kind})` }}
                    ></div>
                    <h3>{names[idx]}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center pb-5">
            <div className="col-md-7 heading-section text-center ftco-animate">
              <span className="subheading">Our Delightful offerings</span>
              <h2>Tastefully Yours</h2>
            </div>
          </div>
          <div className="row">
            {[prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8].map(
              (prod, idx) => (
                <div key={idx} className="col-md-3 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod})` }}
                    >
                      <div className="desc">
                        <p className="meta-prod d-flex">
                          <a
                            href="#"
                            className="d-flex align-items-center justify-content-center"
                          >
                            <span className="flaticon-shopping-bag"></span>
                          </a>
                          <a
                            href="#"
                            className="d-flex align-items-center justify-content-center"
                          >
                            <span className="flaticon-heart"></span>
                          </a>
                          <a
                            href="#"
                            className="d-flex align-items-center justify-content-center"
                          >
                            <span className="flaticon-visibility"></span>
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="text text-center">
                      <span className="category">Category</span>
                      <h2>Product Name</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section
        className="ftco-section testimony-section img "
        style={{ backgroundImage: `url(${bg4})` }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 text-center heading-section heading-section-white ftco-animate">
              <span className="subheading">Testimonial</span>
              <h2 className="mb-3">Happy Clients</h2>
            </div>
          </div>
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
           
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {[person1, person2, person3, person4, person5].map(
              (person, item) => (
                <SwiperSlide key={item}>
                  <div className="card-box item">
                    <div className="testimony-wrap py-4">
                      <div className="icon d-flex align-items-center justify-content-center">
                        <span className="fa fa-quote-left"></span>
                      </div>
                      <div className="text">
                        <p className="mb-4">
                          Far far away, behind the word mountains, far from the
                          countries Vokalia and Consonantia, there live the
                          blind texts.
                        </p>
                        <div className="d-flex align-items-center">
                          <div
                            className="user-img"
                            style={{ backgroundImage: `url(${person})` }}
                          ></div>
                          <div className="pl-3">
                            <p className="name">Roger Scott</p>
                            <span className="position">Marketing Manager</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </section>

      {/* Blog Section */}
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 heading-section text-center ftco-animate">
              <span className="subheading">Blog</span>
              <h2>Recent Blog</h2>
            </div>
          </div>
          <div className="row d-flex">
            {[image1, image2, image3, image4].map((img, idx) => (
              <div
                key={idx}
                className="col-lg-6 d-flex align-items-stretch ftco-animate"
              >
                <div className="blog-entry d-flex">
                  <a
                    href="blog-single.html"
                    className="block-20 img"
                    style={{ backgroundImage: `url(${img})` }}
                  ></a>
                  <div className="text p-4 bg-light">
                    <div className="meta">
                      <p>
                        <span className="fa fa-calendar"></span> 23 April 2020
                      </p>
                    </div>
                    <h3 className="heading mb-3">
                      <a href="#">The Recipe from a Winemaker’s Restaurent</a>
                    </h3>
                    <p>
                      A small river named Duden flows by their place and
                      supplies it with the necessary regelialia.
                    </p>
                    <a href="#" className="btn-custom">
                      Continue <span className="fa fa-long-arrow-right"></span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
