import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import "./index.css";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/700.css";
import BasketProvider from "./context/BasketContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'sonner';

createRoot(document.getElementById("root")).render(
  <AuthProvider>
<Toaster position="top-center" richColors dir="rtl" />
  <BasketProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </BasketProvider>
  </AuthProvider>
);
