import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import { Home } from "./components/Home/Home.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Product from "./components/Product/Product.jsx";
import { CartContextProvider } from "./context/cartContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/product/:productId" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </React.StrictMode>
);
