import { useState } from "react";
import bg2 from "../../assets/images/bg_2.jpg";

import prod1 from "../../assets/images/prod-1.jpg";
import prod2 from "../../assets/images/prod-7.jpg";
import prod3 from "../../assets/images/prod-3.jpg";
import prod4 from "../../assets/images/prod-4.jpg";
import prod5 from "../../assets/images/prod-5.jpg";

const Cart = () => {
	
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
                  <a href="index.html">
                    Home <i className="fa fa-chevron-right"></i>
                  </a>
                </span>{" "}
                <span>
                  Cart <i className="fa fa-chevron-right"></i>
                </span>
              </p>
              <h2 className="mb-0 bread">Cart</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="ftco-section">
        <div className="container">
          <div className="row">
            <div className="table-wrap">
              <table className="table">
                <thead className="thead-primary" >
                  <tr >
                    
                    <th>&nbsp;</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>total</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="alert" role="alert">
                    
                    <td>
                      <div
                        className="img"
                        style={{ backgroundImage: `url(${prod1})` }}
                      ></div>
                    </td>
                    <td>
                      <div className="email">
                        <span>Jim Beam Kentucky Straight</span>
                        <span>
                          Fugiat voluptates quasi nemo, ipsa perferendis
                        </span>
                      </div>
                    </td>
                    <td>$44.99</td>
                    <td className="quantity">
                      <div className="input-group">
                        <input
                          type="text"
                          name="quantity"
                          className="quantity form-control input-number"
                          value="2"
                          min="1"
                          max="100"
                        />
                      </div>
                    </td>
                    <td>$89.98</td>
                    <td>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">
                          <i className="fa fa-close"></i>
                        </span>
                      </button>
                    </td>
                  </tr>

                  <tr className="alert" role="alert">
                    
                    <td>
                      <div
                        className="img"
                        style={{ backgroundImage: `url(${prod2})` }}
                      ></div>
                    </td>
                    <td>
                      <div className="email">
                        <span>Jim Beam Kentucky Straight</span>
                        <span>
                          Fugiat voluptates quasi nemo, ipsa perferendis
                        </span>
                      </div>
                    </td>
                    <td>$30.99</td>
                    <td className="quantity">
                      <div className="input-group">
                        <input
                          type="text"
                          name="quantity"
                          className="quantity form-control input-number"
                          value="1"
                          min="1"
                          max="100"
                        />
                      </div>
                    </td>
                    <td>$30.99</td>
                    <td>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">
                          <i className="fa fa-close"></i>
                        </span>
                      </button>
                    </td>
                  </tr>

                  <tr className="alert" role="alert">
                    
                    <td>
                      <div
                        className="img"
                        style={{ backgroundImage: `url(${prod3})` }}
                      ></div>
                    </td>
                    <td>
                      <div className="email">
                        <span>Jim Beam Kentucky Straight</span>
                        <span>
                          Fugiat voluptates quasi nemo, ipsa perferendis
                        </span>
                      </div>
                    </td>
                    <td>$35.50</td>
                    <td className="quantity">
                      <div className="input-group">
                        <input
                          type="text"
                          name="quantity"
                          className="quantity form-control input-number"
                          value="1"
                          min="1"
                          max="100"
                        />
                      </div>
                    </td>
                    <td>$35.50</td>
                    <td>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">
                          <i className="fa fa-close"></i>
                        </span>
                      </button>
                    </td>
                  </tr>

                  <tr className="alert" role="alert">
                   
                    <td>
                      <div
                        className="img"
                        style={{ backgroundImage: `url(${prod4})` }}
                      ></div>
                    </td>
                    <td>
                      <div className="email">
                        <span>Jim Beam Kentucky Straight</span>
                        <span>
                          Fugiat voluptates quasi nemo, ipsa perferendis
                        </span>
                      </div>
                    </td>
                    <td>$76.99</td>
                    <td className="quantity">
                      <div className="input-group">
                        <input
                          type="text"
                          name="quantity"
                          className="quantity form-control input-number"
                          value="1"
                          min="1"
                          max="100"
                        />
                      </div>
                    </td>
                    <td>$76.99</td>
                    <td>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">
                          <i className="fa fa-close"></i>
                        </span>
                      </button>
                    </td>
                  </tr>

                  <tr className="alert" role="alert">
                    
                    <td className="border-bottom-0">
                      <div
                        className="img"
                        style={{ backgroundImage: `url(${prod5})` }}
                      ></div>
                    </td>
                    <td className="border-bottom-0">
                      <div className="email">
                        <span>Jim Beam Kentucky Straight</span>
                        <span>
                          Fugiat voluptates quasi nemo, ipsa perferendis
                        </span>
                      </div>
                    </td>
                    <td className="border-bottom-0">$40.00</td>
                    <td className="quantity border-bottom-0">
                      <div className="input-group">
                        <input
                          type="text"
                          name="quantity"
                          className="quantity form-control input-number"
                          value="1"
                          min="1"
                          max="100"
                        />
                      </div>
                    </td>
                    <td className="border-bottom-0">$40.00</td>
                    <td className="border-bottom-0">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">
                          <i className="fa fa-close"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col col-lg-5 col-md-6 mt-5 cart-wrap ftco-animate">
              <div className="cart-total mb-3">
                <h3>Cart Totals</h3>
                <p className="d-flex">
                  <span>Subtotal</span>
                  <span>$20.60</span>
                </p>
                <p className="d-flex">
                  <span>Delivery</span>
                  <span>$0.00</span>
                </p>
                <p className="d-flex">
                  <span>Discount</span>
                  <span>$3.00</span>
                </p>
                <hr />
                <p className="d-flex total-price">
                  <span>Total</span>
                  <span>$17.60</span>
                </p>
              </div>
              <p className="text-center">
                <a href="/checkout" className="btn btn-primary py-3 px-4">
                  Proceed to Checkout
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
