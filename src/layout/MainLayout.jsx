import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div>
      {/* بعداً Navbar اینجا میاد */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* بعداً Footer اینجا میاد */}
    </div>
  );
}

export default MainLayout;