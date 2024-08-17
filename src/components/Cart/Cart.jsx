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
    console.log("shipping --------------", shipping);
    let totalAmount = Number(shipping) + Number(Subtotal);
    setFinalAmount(totalAmount);
  }, [Subtotal]);
  console.log("final amount ----------", finalAmount);

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
            <div className="mx-auto max-w-7xl md:mb-8  p-8 flex flex-col gap-3 md:flex-row">
              <div className="w-full md:w-2/3 p-4">
                {cart.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-27 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-300">
                      <img
                        src={product.image}
                        className="h-31 w-31 object-cover object-center p-1"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a className="p-3" href="#">
                              {product.title}
                            </a>
                          </h3>
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <MenuButton className="inline-flex w-full justify-center gap-1.5 rounded-md bg-white p-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                {product.quantity}
                                <ChevronDownIcon
                                  aria-hidden="true"
                                  className="-mr-1 h-5 w-5 text-gray-400"
                                />
                              </MenuButton>
                            </div>

                            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                              <div className="py-1">
                                {[1, 2, 3, 4, 6, 7, 8].map((quantity) => (
                                  <MenuItem key={quantity} value={quantity}>
                                    {() => (
                                      <button
                                        onClick={(e) => {
                                          updateCart(product, e.target.value);
                                        }}
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
                        </div>
                        <p className="mt-1 text-sm text-gray-500"></p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="ml-4 size-9 text-slate-900 font-semibold">
                          Rs.{product.price}
                        </p>
                        <div className="flex">
                          <button
                            onClick={(e) => {
                              removeFromCart(product);
                            }}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
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
