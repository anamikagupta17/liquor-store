import { useState } from "react";
import bg2 from "../../assets/images/bg_2.jpg";
import prod1 from "../../assets/images/prod-1.jpg";
import person1 from "../../assets/images/person_1.jpg";
import person2 from "../../assets/images/person_2.jpg";
import person3 from "../../assets/images/person_3.jpg";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [quantity, setQuantity] = useState(1);
  const handleCounter = (opt: string) => {
    if (opt == "minus") {
      if (quantity != 1) {
        setQuantity((prev) => Number(prev) - Number(1));
      }
    } else if (opt == "plus") {
      setQuantity((prev) => Number(prev) + Number(1));
    }
  };
  return (
    <>
      <section
        className="hero-wrap hero-wrap-2"
        style={{ backgroundImage: `url(${bg2})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row no-gutters slider-text align-items-end justify-content-center">
            <div className="col-md-9 ftco-animate mb-5 text-center">
              <p className="breadcrumbs mb-0">
                <span className="mr-2">
                  <a href="/">
                    Home <i className="fa fa-chevron-right"></i>
                  </a>
                </span>{" "}
                <span>
                  Product Detail <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h2 className="mb-0 bread">Product Detail </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 ftco-animate">
              <a href={prod1} className="image-popup prod-img-bg">
                <img
                  src={prod1}
                  className="img-fluid"
                  alt="Colorlib Template"
                />
              </a>
            </div>
            <div className="col-lg-6 product-details pl-md-5 ftco-animate">
              <h3>Bacardi 151 Degree</h3>
              <div className="rating d-flex">
                <p className="text-left mr-4">
                  <a href="#" className="mr-2">
                    5.0
                  </a>
                  <a href="#">
                    <span className="fa fa-star"></span>
                  </a>
                  <a href="#">
                    <span className="fa fa-star"></span>
                  </a>
                  <a href="#">
                    <span className="fa fa-star"></span>
                  </a>
                  <a href="#">
                    <span className="fa fa-star"></span>
                  </a>
                  <a href="#">
                    <span className="fa fa-star"></span>
                  </a>
                </p>
                <p className="text-left mr-4">
                  <a href="#" className="mr-2" style={{ color: "#000" }}>
                    100 <span style={{ color: "#bbb" }}>Rating</span>
                  </a>
                </p>
                <p className="text-left">
                  <a href="#" className="mr-2" style={{ color: "#000" }}>
                    500 <span style={{ color: "#bbb" }}>Sold</span>
                  </a>
                </p>
              </div>
              <p className="price">
                <span>$120.00</span>
              </p>
              <p>
                A small river named Duden flows by their place and supplies it
                with the necessary regelialia. It is a paradisematic country, in
                which roasted parts of sentences fly into your mouth.
              </p>
              <p>
                On her way she met a copy. The copy warned the Little Blind
                Text, that where it came from it would have been rewritten a
                thousand times and everything that was left from its origin
                would be the word "and" and the Little Blind Text should turn
                around and return to its own, safe country. But nothing the copy
                said could convince her and so it didn’t take long until a few
                insidious Copy Writers ambushed her, made her drunk with Longe
                and Parole and dragged her into their agency, where they abused
                her for their.
              </p>
              <div className="row mt-4">
                <div className="input-group col-md-6 d-flex mb-3">
                  <span className="input-group-btn mr-2">
                    <button
                      type="button"
                      className="quantity-left-minus btn"
                      data-type="minus"
                      data-field=""
                      onClick={() => {
                        handleCounter("minus");
                      }}
                    >
                      <i className="fa fa-minus"></i>
                    </button>
                  </span>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="quantity form-control input-number"
                    value={quantity}
                    min="1"
                    max="100"
                    onChange={(e)=>setQuantity(e.target.value)}
                  />
                  <span className="input-group-btn ml-2">
                    <button
                      type="button"
                      className="quantity-right-plus btn"
                      data-type="plus"
                      data-field=""
                      onClick={() => handleCounter("plus")}
                    >
                      <i className="fa fa-plus"></i>
                    </button>
                  </span>
                </div>
                <div className="w-100"></div>
                <div className="col-md-12">
                  <p style={{ color: "#000" }}>80 piece available</p>
                </div>
              </div>
              <p>
                <a href="cart.html" className="btn btn-primary py-3 px-5 mr-2">
                  Add to Cart
                </a>
                <a href="cart.html" className="btn btn-primary py-3 px-5">
                  Buy now
                </a>
              </p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-12 nav-link-wrap">
              <div
                className="nav nav-pills d-flex text-center"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className={`${activeTab === "1" ? "nav-link active" : "nav-link"} ftco-animate mr-lg-1 `}
                  id="v-pills-1-tab"
                  data-toggle="pill"
                  // href="#v-pills-1"
                  role="tab"
                  aria-controls="v-pills-1"
                  aria-selected={`${activeTab === "1" ? "true" : "false"}`}
                  onClick={() => setActiveTab("1")}
                >
                  Description
                </a>

                <a
                  className={`${activeTab === "2" ? "nav-link active" : "nav-link"} ftco-animate mr-lg-1 `}
                  id="v-pills-2-tab"
                 data-bs-toggle="pill"
                  // href="#v-pills-2"
                  role="tab"
                  aria-controls="v-pills-2"
                  aria-selected={`${activeTab === "2" ? "true" : "false"}`}
                  onClick={() => setActiveTab("2")}
                >
                  Manufacturer
                </a>

                <a
                  className={`${activeTab === "3" ? "nav-link active" : "nav-link"} ftco-animate mr-lg-1 `}
                  id="v-pills-3-tab"
                  data-toggle="pill"
                  // href="#v-pills-3"
                  role="tab"
                  aria-controls="v-pills-3"
                  aria-selected={`${activeTab === "3" ? "true" : "false"}`}
                  onClick={() => setActiveTab("3")}
                >
                  Reviews
                </a>
              </div>
            </div>
            <div className="col-md-12 tab-wrap">
              <div className="tab-content bg-light" id="v-pills-tabContent">
              {activeTab === "1" &&  <div
                  className="tab-pane fade show active"
                  id="v-pills-1"
                  role="tabpanel"
                  aria-labelledby="day-1-tab"
                >
                  <div className="p-4">
                    <h3 className="mb-4">Bacardi 151 Degree</h3>
                    <p>
                      On her way she met a copy. The copy warned the Little
                      Blind Text, that where it came from it would have been
                      rewritten a thousand times and everything that was left
                      from its origin would be the word "and" and the Little
                      Blind Text should turn around and return to its own, safe
                      country. But nothing the copy said could convince her and
                      so it didn’t take long until a few insidious Copy Writers
                      ambushed her, made her drunk with Longe and Parole and
                      dragged her into their agency, where they abused her for
                      their.
                    </p>
                  </div>
                </div>
}
              {activeTab === "2" &&  <div
                  className="tab-pane fade show active"
                  id="v-pills-2"
                  role="tabpanel"
                  aria-labelledby="v-pills-day-2-tab"
                >
                  <div className="p-4">
                    <h3 className="mb-4">Manufactured By Liquor Store</h3>
                    <p>
                      On her way she met a copy. The copy warned the Little
                      Blind Text, that where it came from it would have been
                      rewritten a thousand times and everything that was left
                      from its origin would be the word "and" and the Little
                      Blind Text should turn around and return to its own, safe
                      country. But nothing the copy said could convince her and
                      so it didn’t take long until a few insidious Copy Writers
                      ambushed her, made her drunk with Longe and Parole and
                      dragged her into their agency, where they abused her for
                      their.
                    </p>
                  </div>
                </div> }

             {activeTab === "3" &&   <div
                  className="tab-pane fade show active"
                  id="v-pills-3"
                  role="tabpanel"
                  aria-labelledby="v-pills-day-3-tab"
                >
                  <div className="row p-4">
                    <div className="col-md-7">
                      <h3 className="mb-4">23 Reviews</h3>
                      <div className="review">
                        <div
                          className="user-img"
                          style={{ backgroundImage: `url(${person1})` }}
                        ></div>
                        <div className="desc">
                          <h4>
                            <span className="text-left">Jacob Webb</span>
                            <span className="text-right">25 April 2020</span>
                          </h4>
                          <p className="star">
                            <span>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </span>
                            <span className="text-right">
                              <a href="#" className="reply">
                                <i className="icon-reply"></i>
                              </a>
                            </span>
                          </p>
                          <p>
                            When she reached the first hills of the Italic
                            Mountains, she had a last view back on the skyline
                            of her hometown Bookmarksgrov
                          </p>
                        </div>
                      </div>
                      <div className="review">
                        <div
                          className="user-img"
                          style={{ backgroundImage: `url(${person2})` }}
                        ></div>
                        <div className="desc">
                          <h4>
                            <span className="text-left">Jacob Webb</span>
                            <span className="text-right">25 April 2020</span>
                          </h4>
                          <p className="star">
                            <span>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </span>
                            <span className="text-right">
                              <a href="#" className="reply">
                                <i className="icon-reply"></i>
                              </a>
                            </span>
                          </p>
                          <p>
                            When she reached the first hills of the Italic
                            Mountains, she had a last view back on the skyline
                            of her hometown Bookmarksgrov
                          </p>
                        </div>
                      </div>
                      <div className="review">
                        <div
                          className="user-img"
                          style={{ backgroundImage: `url(${person3})` }}
                        ></div>
                        <div className="desc">
                          <h4>
                            <span className="text-left">Jacob Webb</span>
                            <span className="text-right">25 April 2020</span>
                          </h4>
                          <p className="star">
                            <span>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </span>
                            <span className="text-right">
                              <a href="#" className="reply">
                                <i className="icon-reply"></i>
                              </a>
                            </span>
                          </p>
                          <p>
                            When she reached the first hills of the Italic
                            Mountains, she had a last view back on the skyline
                            of her hometown Bookmarksgrov
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="rating-wrap">
                        <h3 className="mb-4">Give a Review</h3>
                        <p className="star">
                          <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            (98%)
                          </span>
                          <span>20 Reviews</span>
                        </p>
                        <p className="star">
                          <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            (85%)
                          </span>
                          <span>10 Reviews</span>
                        </p>
                        <p className="star">
                          <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            (98%)
                          </span>
                          <span>5 Reviews</span>
                        </p>
                        <p className="star">
                          <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            (98%)
                          </span>
                          <span>0 Reviews</span>
                        </p>
                        <p className="star">
                          <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            (98%)
                          </span>
                          <span>0 Reviews</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
