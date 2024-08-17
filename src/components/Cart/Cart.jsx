import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext";
import CheckoutSuccess from "../CheckoutSuccess";

function Cart() {
  const { cart, removeFromCart, updateCart, clearCart } =
    useContext(CartContext);
  const [Subtotal, setSubTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [shipping, setShipping] = useState(50);
  const [finalAmount, setFinalAmount] = useState(0);

  const handleCheckout = (e) => {
    setOpen(true);
  };

  useEffect(() => {
    let totalAmount = Number(shipping) + Number(Subtotal);
    setFinalAmount(totalAmount);
  }, [Subtotal]);

  useEffect(() => {
    let temp = 0;
    cart.forEach((product) => {
      temp = temp + product.quantity * product.price;
    });
    setSubTotal(temp.toFixed(2));
  }, [cart]);

  return (
    <div className="mx-auto max-w-7xl md:mb-8 min-h-72 text-center p-8">
      {open ? (
        <CheckoutSuccess
          open={open}
          setOpen={setOpen}
          clearCart={clearCart}
          totalprice={finalAmount}
        />
      ) : (
        <>
          {cart.length != 0 ? (
            <div className="mx-auto max-w-7xl md:mb-8  p-4 flex flex-col gap-3 md:flex-row">
              <div className="w-full md:w-2/3 p-4">
                {cart.map((product) => (
                  <li
                    key={product.id}
                    className="flex flex-col sm:flex-row py-6 gap-3 shadow-sm mb-2"
                  >
                    <div className="w-40 sm:w-24 sm:h-auto flex-shrink-0 rounded-md">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full"
                      />
                    </div>

                    <div className="flex flex-1 flex-col sm:ml-4 p-2">
                      <div className="flex justify-between text-base sm:font-medium text-gray-900">
                        <p className="text-lg sm:text-sm text-left">
                          {product.title}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
                        <Menu
                          as="div"
                          className="relative inline-block text-left mt-2 sm:mt-0"
                        >
                          <div className="flex items-center">
                            <MenuButton className="inline-flex justify-center gap-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                              {product.quantity}
                              <ChevronDownIcon
                                aria-hidden="true"
                                className="-mr-1 h-5 w-5 text-gray-400"
                              />
                            </MenuButton>

                            <button
                              onClick={() => removeFromCart(product)}
                              type="button"
                              className="ml-3"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>

                          <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                            <div className="py-1">
                              {[1, 2, 3, 4, 6, 7, 8].map((quantity) => (
                                <MenuItem key={quantity} value={quantity}>
                                  {() => (
                                    <button
                                      onClick={() =>
                                        updateCart(product, quantity)
                                      }
                                      className="block w-full px-4 py-2 text-left text-sm"
                                    >
                                      {quantity}
                                    </button>
                                  )}
                                </MenuItem>
                              ))}
                            </div>
                          </MenuItems>
                        </Menu>

                        <p className="mt-2 sm:mt-0 text-sm text-gray-500"></p>
                      </div>

                      <div className="flex justify-between items-end text-sm mt-4 sm:mt-2">
                        <p className="text-lg sm:text-xl text-slate-900 font-semibold">
                          Rs. {product.price}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </div>

              <div className="border-t border-gray-200 px-4 py-3 sm:px-4 w-full md:w-1/3 p-4 shadow-lg">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h2>Order summary</h2>
                </div>
                <div className="flex justify-between text-base  text-gray-500 border-b-2 p-4">
                  <p>Subtotal</p>
                  <p>RS.{Subtotal}</p>
                </div>
                <div className="flex justify-between text-base  text-gray-500 border-b-2 p-4">
                  <p>Shipping estimate</p>
                  <p>RS.{50}</p>
                </div>
                <div className="flex justify-between text-base  text-gray-500 border-b-2 p-4">
                  <p>Total</p>
                  <p>RS: {finalAmount}</p>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleCheckout();
                    }}
                    className="font-medium bg-blue-400 w-full p-2"
                  >
                    Checkout
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xl font-medium text-slate-600">
              Cart is empty
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
