import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

function Product() {
  const { addToCart, verifyProduct } = useContext(CartContext);
  const { productId } = useParams();

  const [product, setProduct] = useState([]);
  const getData = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await res.json();
    const isInCart = verifyProduct(productId);
    setProduct({ ...data, isAdded: isInCart });
  };

  useEffect(() => {
    getData();
  }, [productId]);

  return (
    <div className="container flex flex-col justify-center p-8 md:flex-row gap-3">
      <div className="shadow-md w-full md:w-2/6">
        <img className="" src={product.image} alt="" />
      </div>
      <div className="w-full md:w-4/6 p-4">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {product.title}
          </h1>
        </div>{" "}
        <div className="lg:row-span-3 lg:mt-0 p-4">
          <h2 className="sr-only">Product information</h2>
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900 p-3">
                {product.description}
              </p>
            </div>
          </div>
          <p className="text-xl tracking-tight text-gray-900 p-4">
            Price : RS.{product.price}
          </p>
        </div>
        <button
          onClick={(e) => {
            addToCart(product);
          }}
          type="submit"
          className="mt-10 flex w-35 items-end justify-center rounded-md border border-transparent bg-sky-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {product.isAdded ? (
            <Link to={"/cart"}>Go toCart</Link>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}

export default Product;
