import { Outlet } from "react-router";
import Navbar from "../components/Layout/Navbar";
import { Footer } from "../components/Layout/Footer";
import { ScrollRestoration } from "react-router";
function MainLayout() {
  return (
    <div>
      <Navbar  />
      <main>
        <Outlet />
        <ScrollRestoration />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;