import { useState } from "react";
import prod1 from "../assets/images/prod-1.jpg";
import prod2 from "../assets/images/prod-2.jpg";
import prod3 from "../assets/images/prod-3.jpg";
import { Link } from "react-router-dom";
const Navbar = () => {
   const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Liquor <span>store</span>
          </Link>

          <div className="order-lg-last btn-group position-relative">
            <div
              className="btn-cart dropdown-toggle dropdown-toggle-split"
              onClick={() => setIsCartOpen(!isCartOpen)}
              style={{ cursor: "pointer",color:"#b7472a" }}
            >
              <span className="flaticon-shopping-bag"></span>
              <div className="d-flex justify-content-center align-items-center">
                <small>3</small>
              </div>
            </div>

            {isCartOpen && (
              <div
                className="dropdown-menu dropdown-menu-right show"
                style={{ display: "block", position: "absolute" }}
              >
                <div className="dropdown-item d-flex align-items-start">
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${prod1})` }}
                  ></div>
                  <div className="text pl-3">
                    <h4>Bacardi 151</h4>
                    <p className="mb-0">
                      <span className="price">$25.99</span>
                      <span className="quantity ml-3">Quantity: 01</span>
                    </p>
                  </div>
                </div>

                <div className="dropdown-item d-flex align-items-start">
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${prod2})` }}
                  ></div>
                  <div className="text pl-3">
                    <h4>Jim Beam Kentucky Straight</h4>
                    <p className="mb-0">
                      <span className="price">$30.89</span>
                      <span className="quantity ml-3">Quantity: 02</span>
                    </p>
                  </div>
                </div>

                <div className="dropdown-item d-flex align-items-start">
                  <div
                    className="img"
                    style={{ backgroundImage: `url(${prod3})` }}
                  ></div>
                  <div className="text pl-3">
                    <h4>Citadelle</h4>
                    <p className="mb-0">
                      <span className="price">$22.50</span>
                      <span className="quantity ml-3">Quantity: 01</span>
                    </p>
                  </div>
                </div>

                <Link
                  className="dropdown-item text-center btn-link d-block w-100"
                   onClick={() => setIsCartOpen(!isCartOpen)}
                  to="/cart"
                >
                  View All
                </Link>
              </div>
            )}
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu"></span> Menu
          </button>

          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a href="/" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="about" className="nav-link">
                  About
                </a>
              </li>
              <li className="nav-item">
                 <a href="products" className="nav-link">
                  Products
                </a>
                
              </li>
              <li className="nav-item">
                
                 <Link className="nav-link" to="/blog">
                    Blog
                  </Link>
              </li>
              <li className="nav-item">
                <a href="contact" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
    </>
  );
};

export default Navbar;
