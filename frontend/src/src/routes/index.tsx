import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppLayout } from "../layouts/AppLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Product from "../pages/Product";

import BlogDetail from "../pages/BlogDetail";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Cart from "../pages/Cart";

// import Dashboard from "../pages/Dashboard";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
// import { Users } from "../pages/Users";
import { ProtectedRoute } from "./ProtectedRoute";

/**
 * AppRouter - main application routing configuration
 * Sets up routes and layout wrapper
 */
export function AppRouter() {
  const raw = localStorage.getItem("userData");
  const userData = JSON.parse(raw !== null ? raw : "null");

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route - No Layout */}
        
        <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
        {/* Protected Routes with Layout */}

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Routes>
                 
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/products" element={<Product />} />
                   <Route
                    path="/product-detail/:productId"
                    element={<ProductDetails />}
                  />
                  <Route
                    path="/blog-detail/:BlogId"
                    element={<BlogDetail />}
                  />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/cart" element={<Cart />} />
                  {/*
                  <Route
                    path="/partner/:partnerId/vintages"
                    element={<Vintages />}
                  />

                  <Route
                    path="/performance/:partnerId/vintage/:vintageId"
                    element={<VintagePerformance />}
                  />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/dashboard" element={<Dashboard />} /> */}
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
