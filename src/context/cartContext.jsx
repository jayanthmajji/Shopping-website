import React, { useState, useEffect } from "react";

export const CartContext = React.createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  const addToCart = (product) => {
    if (product.isAdded === false) {
      product.isAdded = true;
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((cartItem) => cartItem.id !== product.id));
  };

  const updateCart = (product, quantity) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.id === product.id
          ? {
              ...cartItem,
              quantity: quantity,
            }
          : cartItem
      )
    );
  };
  const clearCart = () => {
    setCart([]);
  };

  const verifyProduct = (productId) => {
    const isInCart = cart.some(({ id }) => id == productId);
    return isInCart;
  };
  //1 load data from local storage to usesate

  useEffect(() => {
    const data = localStorage.getItem("cartItems");
    if (data) {
      setCart(JSON.parse(data));
    }
  }, []);

  // 2 load data from usestate to local storage on useupdate
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        updateCart,
        clearCart,
        removeFromCart,
        verifyProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
