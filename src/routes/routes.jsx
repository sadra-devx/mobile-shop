import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import ProductList from "../pages/ProductList/ProductList";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Cart from "../pages/Cart/Cart";
import { getProductById, getProducts } from "../api/products";

const productsLoader = async () => {
  const products = await getProducts();
  return products.filter((p) => p.isPublished);
};
const productLoader = async ({ params }) => {
  const product = await getProductById(params.id);
  return product;
};

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <ProductList />, loader: productsLoader },
      { path: "products/:category", element: <ProductList />, loader: productsLoader },
      { path: "product/:id", element: <ProductDetail />, loader: productLoader },
      { path: "cart", element: <Cart /> },
      { path: "*", element: <div>صفحه پیدا نشد</div> },
    ],
  },
]);