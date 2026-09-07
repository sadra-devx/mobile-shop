import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import ProductList from "../pages/ProductList/ProductList";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import { getProductById, getProducts } from "../api/products";
import Basket from "../pages/Basket/Basket";
import Auth from "../pages/Auth/Auth";
import { ProtectedRoute } from "../context/ProtectedRoute";
import Profile from "../pages/Profile/Profile";
import { profileLoader } from "../pages/Profile/profileLoader";

const productsLoader = async () => {
  const products = await getProducts();
  return products.filter((p) => p.isPublished);
};
const productLoader = async ({ params }) => {
  const product = await getProductById(params.id);
  return product;
};

const basketLoader = async () => {
  const stored = localStorage.getItem("basket");
  const basketItems = stored ? JSON.parse(stored) : [];

  if (basketItems.length === 0) return [];

  const productPromises = basketItems.map((item) => getProductById(item.id));
  const products = await Promise.all(productPromises);

  return products.map((product, i) => ({
    ...product,
    quantity: basketItems[i].quantity,
  }));
};
export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <ProductList />, loader: productsLoader },
      {
        path: "products/:category",
        element: <ProductList />,
        loader: productsLoader,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
        loader: productLoader,
      },
      { path: "basket", element: <Basket />, loader: basketLoader },
      { path: "*", element: <div>صفحه پیدا نشد</div> },
      { path: "auth", element: <Auth /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "profile", element: <Profile />, loader: profileLoader },
        ],
      },
    ],
  },
]);
