import 'bootstrap/dist/css/bootstrap.min.css'

import '../assets/css/animate.css'
import '../assets/css/owl.carousel.min.css'
import '../assets/css/owl.theme.default.min.css'
import '../assets/css/magnific-popup.css'
import '../assets/css/flaticon.css'
import '../assets/css/style.css'

import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}