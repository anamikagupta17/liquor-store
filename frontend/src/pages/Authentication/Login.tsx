import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { saveUserData } from "../../utils/authStorage";

const URI = "http://localhost";

export function Login() {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const stringToByteArray = (str: string) => {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailId) return toast.error("Email must be provided");
    if (!password) return toast.error("Password must be provided");
    localStorage.clear();
    const byteArray = stringToByteArray(password);
    const newPass = [...byteArray];

    const response = await fetch(`${URI}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailId,
        identification: newPass
      })
    });

    const data = await response.json();

    if (response.status === 200 && data.loginSuccessfull) {
      const userData = {
        email: emailId,
        name: data.userName,
        role: data.role,
        loginSuccessfull: data.loginSuccessfull,
        accessToken: data.token
      };
      saveUserData(userData);
      setTimeout(() => {
        navigate("/admin");
        toast.success(data.message);
      }, 0);
    } else {
      toast.error(data.message || "Invalid credentials");
    }
  };

  return (
    <>
      {/* Login Section */}
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="contact-wrap w-100 p-md-5 p-4 bg-white shadow rounded">
                <h3 className="mb-4 text-center">Login to Your Account</h3>

                <form className="loginForm" onSubmit={handleLogin}>
                  <div className="form-group">
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter your email"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label className="label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mt-4 text-center">
                    <input
                      type="submit"
                      value="Login"
                      className="btn btn-primary w-100"
                    />
                  </div>

                  <div className="text-center mt-3">
                    <a href="/">Back to Home</a>
                  </div>

                  <div className="text-center mt-2">
                    Don't have an account? <a href="/register">Register</a>
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
