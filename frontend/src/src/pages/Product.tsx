import bg2 from "../../assets/images/bg_2.jpg";
import prod1 from "../../assets/images/prod-1.jpg";
import prod2 from "../../assets/images/prod-7.jpg";
import prod3 from "../../assets/images/prod-3.jpg";
import prod4 from "../../assets/images/prod-4.jpg";
import prod5 from "../../assets/images/prod-5.jpg";
import prod6 from "../../assets/images/prod-6.jpg";
import prod7 from "../../assets/images/prod-7.jpg";
import prod8 from "../../assets/images/prod-8.jpg";
import prod9 from "../../assets/images/prod-9.jpg";
import prod10 from "../../assets/images/prod-10.jpg";
import prod11 from "../../assets/images/prod-11.jpg";
import prod12 from "../../assets/images/prod-12.jpg";
import image1 from "../../assets/images/image_1.jpg";
import image2 from "../../assets/images/image_2.jpg";
import image3 from "../../assets/images/image_3.jpg";
import Select from "react-select";

const options = [
  { value: "brandy", label: "Brandy" },
  { value: "gin", label: "Gin" },
  { value: "rum", label: "Rum" },
  { value: "tequila", label: "Tequila" },
  { value: "vodka", label: "Vodka" },
  { value: "whiskey", label: "Whiskey" },
];
const Product = () => {
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
                  Blog <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h2 className="mb-0 bread">Blog</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row mb-4">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                  <h4 className="product-select">Select Types of Products</h4>
                   <Select
      options={options}
      isMulti
      placeholder="Select drinks"
    />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod1})` }}
                    >
                      <div className="desc">
                        <p className="meta-prod d-flex">
                          <a
                            href="/product-detail/1"
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
                      <span className="sale">Sale</span>
                      <span className="category">Brandy</span>
                      <h2>Bacardi 151</h2>
                      <p className="mb-0">
                        <span className="price price-sale">$69.00</span>{" "}
                        <span className="price">$49.00</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod2})` }}
                    >
                      <div className="desc">
                        <p className="meta-prod d-flex">
                          <a
                            href="/product-detail/1"
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
                      <span className="seller">Best Seller</span>
                      <span className="category">Gin</span>
                      <h2>Jim Beam Kentucky Straight</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod3})` }}
                    >
                      <div className="desc">
                        <p className="meta-prod d-flex">
                          <a
                            href="/product-detail/1"
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
                      <span className="new">New Arrival</span>
                      <span className="category">Rum</span>
                      <h2>Citadelle</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod4})` }}
                    >
                      <div className="desc">
                        <p className="meta-prod d-flex">
                          <a
                            href="/product-detail/1"
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
                      <span className="category">Rum</span>
                      <h2>The Glenlivet</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod5})` }}
                    >
                      <div className="desc">
                        <p className="meta-prod d-flex">
                          <a
                            href="/product-detail/1"
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
                      <span className="category">Whiskey</span>
                      <h2>Black Label</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod6})` }}
                    >
                      <div className="desc">
                        <p className="meta-prod d-flex">
                          <a
                            href="/product-detail/1"
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
                      <span className="category">Tequila</span>
                      <h2>Macallan</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod7})` }}
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
                      <span className="category">Vodka</span>
                      <h2>Old Monk</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod8})` }}
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
                      <span className="category">Whiskey</span>
                      <h2>Jameson Irish Whiskey</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod9})` }}
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
                      <span className="category">Whiskey</span>
                      <h2>Screwball</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod10})` }}
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
                      <span className="category">Whiskey</span>
                      <h2>Screwball</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod11})` }}
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
                      <span className="category">Whiskey</span>
                      <h2>McClelland's</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="product ftco-animate">
                    <div
                      className="img d-flex align-items-center justify-content-center"
                      style={{ backgroundImage: `url(${prod12})` }}
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
                      <span className="category">Whiskey</span>
                      <h2>Plantation</h2>
                      <span className="price">$69.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col text-center">
                  <div className="block-27">
                    <ul>
                      <li>
                        <a href="#">&lt;</a>
                      </li>
                      <li className="active">
                        <span>1</span>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <a href="#">4</a>
                      </li>
                      <li>
                        <a href="#">5</a>
                      </li>
                      <li>
                        <a href="#">&gt;</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="sidebar-box ftco-animate">
                <div className="categories">
                  <h3>Product Types</h3>
                  <ul className="p-0">
                    <li>
                      <a href="#">
                        Brandy <span className="fa fa-chevron-right"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Gin <span className="fa fa-chevron-right"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Rum <span className="fa fa-chevron-right"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Tequila <span className="fa fa-chevron-right"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Vodka <span className="fa fa-chevron-right"></span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Whiskey <span className="fa fa-chevron-right"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="sidebar-box ftco-animate">
                <h3>Recent Blog</h3>
                <div className="block-21 mb-4 d-flex">
                  <a
                    className="blog-img mr-4"
                    style={{ backgroundImage: `url(${image1})` }}
                  ></a>
                  <div className="text">
                    <h3 className="heading">
                      <a href="#">
                        Even the all-powerful Pointing has no control about the
                        blind texts
                      </a>
                    </h3>
                    <div className="meta">
                      <div>
                        <a href="#">
                          <span className="fa fa-calendar"></span> Apr. 18, 2020
                        </a>
                      </div>
                      <div>
                        <a href="#">
                          <span className="fa fa-comment"></span> 19
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block-21 mb-4 d-flex">
                  <a
                    className="blog-img mr-4"
                    style={{ backgroundImage: `url(${image2})` }}
                  ></a>
                  <div className="text">
                    <h3 className="heading">
                      <a href="#">
                        Even the all-powerful Pointing has no control about the
                        blind texts
                      </a>
                    </h3>
                    <div className="meta">
                      <div>
                        <a href="#">
                          <span className="fa fa-calendar"></span> Apr. 18, 2020
                        </a>
                      </div>
                      <div>
                        <a href="#">
                          <span className="fa fa-comment"></span> 19
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block-21 mb-4 d-flex">
                  <a
                    className="blog-img mr-4"
                    style={{ backgroundImage: `url(${image3})` }}
                  ></a>
                  <div className="text">
                    <h3 className="heading">
                      <a href="#">
                        Even the all-powerful Pointing has no control about the
                        blind texts
                      </a>
                    </h3>
                    <div className="meta">
                      <div>
                        <a href="#">
                          <span className="fa fa-calendar"></span> Apr. 18, 2020
                        </a>
                      </div>
                      <div>
                        <a href="#">
                          <span className="fa fa-comment"></span> 19
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
