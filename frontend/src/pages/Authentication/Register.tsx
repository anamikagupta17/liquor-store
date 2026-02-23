import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const URI = "http://localhost";

export function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const stringToByteArray = (str: string) => {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) return toast.error("Name is required");
    if (!emailId) return toast.error("Email is required");
    if (!phone) return toast.error("Phone is required");
    if (!address) return toast.error("Address is required");
    if (!password) return toast.error("Password is required");

    const byteArray = stringToByteArray(password);
    const newPass = [...byteArray];

    try {
      const response = await fetch(`${URI}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: emailId,
          phone,
          address,
          identification: newPass
        })
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(data.message || "Registration failed");
      }

      setSubmitted(true);
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="contact-wrap w-100 p-md-5 p-4 bg-white shadow rounded">
                <h3 className="mb-4 text-center">Create Your Account</h3>

                <form className="registerForm" onSubmit={handleRegister}>

                  <div className="form-group">
                    <label className="label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="label">Address</label>
                    <textarea
                      className="form-control"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mt-4 text-center">
                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-primary w-100"
                    />
                  </div>

                  {submitted && (
                    <div className="text-success mt-3 text-center">
                      Registration submitted!
                    </div>
                  )}

                  <div className="text-center mt-3">
                    Already have an account? <a href="/login">Login</a>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
