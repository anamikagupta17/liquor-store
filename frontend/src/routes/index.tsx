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
import { Register } from "../pages/Authentication/Register";
import { Login } from "../pages/Authentication/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import PageTitle from "../components/PageTitle";

import Dashboard from "../pages/Admin/ECommerce";
import Typess from "../pages/Admin/Types";
import CreateProducts from "../pages/Admin/CreateProducts";
import ProductsAdmin from "../pages/Admin/Products"; 
import Settings from "../pages/Admin/Settings";
import AdminBlogs from "../pages/Admin/AdminBlogs";
import CreateBlog from "../pages/Admin/CreateBlog";

import DefaultLayout from "../layouts/DefaultLayoutAdmin";
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route - No Layout */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Front Route - Layout wrapper */}
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="products" element={<Product />} />
          <Route
            path="product-detail/:productId"
            element={<ProductDetails />}
          />
          <Route path="blog-detail/:BlogId" element={<BlogDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        {/* Protected Routes with Layout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          }
        >
          {/* /admin */}
          <Route
            index
            element={
              <>
                <PageTitle title="Dashboard" />
                <Dashboard />
              </>
            }
          />

          {/* /admin/dashboard */}
          <Route
            path="dashboard"
            element={
              <>
                <PageTitle title="Dashboard" />
                <Dashboard />
              </>
            }
          />

          <Route path="types" element={<Typess />} />

          <Route path="create-product" element={<CreateProducts />} />

          <Route path="products" element={<ProductsAdmin />} />

          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="create-blog" element={<CreateBlog />} />

          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
