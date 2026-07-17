import { Outlet } from "react-router";

function MainLayout() {
  return (
    <div>
      {/* بعداً Navbar اینجا میاد */}
      <main>
        <Outlet />
      </main>
      {/* بعداً Footer اینجا میاد */}
    </div>
  );
}

export default MainLayout;