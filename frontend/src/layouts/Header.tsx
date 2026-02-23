


const Header = () => {
  return (
    <div className="wrap">
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex align-items-center">
            <p className="mb-0 phone pl-md-2">
              <a href="#" className="mr-2">
                <span className="fa fa-phone mr-1"></span> +00 1234 567
              </a>
              <a href="#">
                <span className="fa fa-paper-plane mr-1"></span> youremail@email.com
              </a>
            </p>
          </div>

          <div className="col-md-6 d-flex justify-content-md-end">
            <div className="social-media mr-4">
              <p className="mb-0 d-flex">
                <a href="#"><span className="fa fa-facebook"></span></a>
                <a href="#"><span className="fa fa-twitter"></span></a>
                <a href="#"><span className="fa fa-instagram"></span></a>
              </p>
            </div>
            <div className="reg">
              <p className="mb-0">
                <a href="#" className="mr-2">Sign Up</a>
                <a href="/login">Log In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
