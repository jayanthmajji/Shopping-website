import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

function Card({ product }) {
  const { id, price, description, image, isAdded } = product;
  const [showMore, setShowMore] = useState(false);
  const { addToCart } = useContext(CartContext);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="rounded-lg  bg-white p-6  border-white shadow-lg">
      <Link to={`/product/${id}`}>
        <div className="w-55 h-60">
          <img
            className="mx-auto hidden w-max h-full  dark:block bg-white"
            src={image}
            alt=""
          />
        </div>
      </Link>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4 p-3">
          <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
            {" "}
            Up to 35% off{" "}
          </span>

          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              data-tooltip-target="tooltip-add-to-favorites"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div>
          {showMore ? description : description.slice(0, 30) + "..."}
          <button
            onClick={toggleShowMore}
            className="text-blue-500 hover:underline"
          >
            {showMore ? "View Less" : "View More"}
          </button>
        </div>

        <ul className="mt-2 flex items-center gap-4">
          <li className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-slate-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
              />
            </svg>
            <p className="text-sm font-medium text-slate-900">Fast Delivery</p>
          </li>

          <li className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-gray-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-900">Best Price</p>
          </li>
        </ul>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-xl font-bold leading-tight text-slate-900">
            RS.{price}
          </p>

          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-slate-900 hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={(e) => {
              addToCart(product);
            }}
          >
            <svg
              className="-ms-2 me-2 h-5 w-5 text-slate-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            {!isAdded ? "AddToCart" : <Link to={"/cart"}>Go to Cart</Link>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
