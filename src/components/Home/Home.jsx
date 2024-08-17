import React, { useContext, useEffect, useState } from "react";
import Card from "../Card/Card";
import { CartContext } from "../../context/cartContext";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, verifyProduct } = useContext(CartContext);

  const getData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    const updatedData = data.map((product) => {
      const isInCart = verifyProduct(product.id);

      return { ...product, isAdded: isInCart };
    });

    setProducts(updatedData);
  };
  useEffect(() => {
    getData();
  }, [cart]);
  console.log("products", products);

  return (
    <>
      <div className="mx-auto max-w-7xl min-h-72 grid gap-5 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4 p-8">
        {products ? (
          products.map((ele, key) => <Card key={key} product={ele} />)
        ) : (
          <h1>no data</h1>
        )}
      </div>
    </>
  );
};
