import about from "../../assets/images/about.jpg";
import bg2 from "../../assets/images/bg_2.jpg";

import kind1 from "../../assets/images/kind-1.jpg";
import kind2 from "../../assets/images/kind-2.jpg";
import kind3 from "../../assets/images/kind-3.jpg";
import kind4 from "../../assets/images/kind-4.jpg";
import kind5 from "../../assets/images/kind-5.jpg";
import kind6 from "../../assets/images/kind-6.jpg";

import bg4 from "../../assets/images/bg_4.jpg";
import person1 from "../../assets/images/person_1.jpg";
import person2 from "../../assets/images/person_2.jpg";
import person3 from "../../assets/images/person_3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import person4 from "../../assets/images/person_4.jpg";
import person5 from "../../assets/images/person_1.jpg";
import "swiper/css";
import "swiper/css/pagination";
import CountUp from "react-countup";
const About = () => {
  return (
    <>
      <section className="hero-wrap hero-wrap-2" style={{ backgroundImage: `url(${bg2})` }} data-stellar-background-ratio="0.5">
      <div className="overlay"></div>
      <div className="container">
        <div className="row no-gutters slider-text align-items-end justify-content-center">
          <div className="col-md-9 ftco-animate mb-5 text-center">
          	<p className="breadcrumbs mb-0"><span className="mr-2"><a href="index.html">Home <i className="fa fa-chevron-right"></i></a></span> <span>About us <i className="fa fa-chevron-right"></i></span></p>
            <h2 className="mb-0 bread">About Us</h2>
          </div>
        </div>
      </div>
    </section>

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
    						<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
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
    						<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
    					</div>
    				</div>
    			</div>
    			<div className="col-md-4 d-flex">
    				<div className="intro color-2 d-lg-flex w-100 ftco-animate">
    					<div className="icon">
    						<span className="flaticon-free-delivery"></span>
    					</div>
    					<div className="text">
    						<h2>Free Shipping &amp; Return</h2>
    						<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    </section>

    <section className="ftco-section ftco-no-pb">
			<div className="container">
				<div className="row">
					<div className="col-md-6 img img-3 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${about})` }}>
					</div>
					<div className="col-md-6 wrap-about pl-md-5 ftco-animate py-5">
	          <div className="heading-section">
	          	<span className="subheading">Since 1905</span>
	            <h2 className="mb-4">Desire meets a new Taste</h2>

	            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
	            <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country.</p>
	            <p className="year">
	            	<strong className="number" data-number="115"><CountUp end={115} duration={4} /></strong> 
		            <span className="ml-2">Years of Experience In Business</span>
	            </p>
	          </div>

					</div>
				</div>
			</div>
		</section>

		<section className="ftco-section">
			<div className="container">
				<div className="row">
					<div className="col-lg-2 col-md-4 ">
						<div className="sort w-100 text-center ftco-animate">
							<div className="img" style={{ backgroundImage: `url(${kind1})` }}></div>
							<h3>Brandy</h3>
						</div>
					</div>
					<div className="col-lg-2 col-md-4 ">
						<div className="sort w-100 text-center ftco-animate">
							<div className="img" style={{ backgroundImage: `url(${kind2})` }}></div>
							<h3>Gin</h3>
						</div>
					</div>
					<div className="col-lg-2 col-md-4 ">
						<div className="sort w-100 text-center ftco-animate">
							<div className="img" style={{ backgroundImage: `url(${kind3})` }}></div>
							<h3>Rum</h3>
						</div>
					</div>
					<div className="col-lg-2 col-md-4 ">
						<div className="sort w-100 text-center ftco-animate">
							<div className="img" style={{ backgroundImage: `url(${kind4})` }}></div>
							<h3>Tequila</h3>
						</div>
					</div>
					<div className="col-lg-2 col-md-4 ">
						<div className="sort w-100 text-center ftco-animate">
							<div className="img" style={{ backgroundImage: `url(${kind5})` }}></div>
							<h3>Vodka</h3>
						</div>
					</div>
					<div className="col-lg-2 col-md-4 ">
						<div className="sort w-100 text-center ftco-animate">
							<div className="img" style={{ backgroundImage: `url(${kind6})` }}></div>
							<h3>Whiskey</h3>
						</div>
					</div>

				</div>
			</div>
		</section>

  
    <section className="ftco-section testimony-section img" style={{ backgroundImage: `url(${bg4})` }}>
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


		<section className="ftco-counter ftco-section ftco-no-pt ftco-no-pb img bg-light" id="section-counter">
    	<div className="container">
    		<div className="row">
          <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
            <div className="block-18 py-4 mb-4">
              <div className="text align-items-center">
                <strong className="number" data-number="3000"><CountUp className="number"end={3000} duration={5} /></strong>
                <span>Our Satisfied Customers</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
            <div className="block-18 py-4 mb-4">
              <div className="text align-items-center">
                <strong className="number" data-number="115"><CountUp end={115} duration={4} /></strong>
                <span>Years of Experience</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
            <div className="block-18 py-4 mb-4">
              <div className="text align-items-center">
                <strong className="number" data-number="100"><CountUp end={100} duration={3} /></strong>
                <span>Kinds of Liquor</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3 justify-content-center counter-wrap ftco-animate">
            <div className="block-18 py-4 mb-4">
              <div className="text align-items-center">
                <strong className="number" data-number="40"><CountUp end={40} duration={2} /></strong>
                <span>Our Branches</span>
              </div>
            </div>
          </div>
        </div>
    	</div>
    </section>
    </>
  );
};

export default About;
