import { ReactNode} from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet,useNavigate } from "react-router-dom";



export interface AppLayoutProps {
  children: ReactNode;
}


export function AppLayout({
  children,
}: AppLayoutProps) {
  

  return (
     <>
      <Header />
      <Navbar />
        <main className="">
          {children}
        </main>
       <Outlet />

      <Footer />
    </>
  );
}
