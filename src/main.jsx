import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import "./index.css";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/700.css";
import BasketProvider from "./context/BasketContext";

createRoot(document.getElementById("root")).render(
  <BasketProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </BasketProvider>,
);
