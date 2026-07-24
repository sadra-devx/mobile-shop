import { Outlet } from "react-router";
import Navbar from "../components/Layout/Navbar";
import { Footer } from "../components/Layout/Footer";

function MainLayout() {
  return (
    <div>
      <Navbar  />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;