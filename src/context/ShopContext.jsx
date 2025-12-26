
import React, { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  
  const [cartItems, setCartItems] = useState({});


  const [orders, setOrders] = useState([]);

  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const addToCart = (id, qty = 1) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + qty,
    }));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      const updated = { ...prev };
      if (updated[id] === 1) {
        delete updated[id];
      } else {
        updated[id] = updated[id] - 1;
      }
      return updated;
    });
  };

  const deleteFromCart = (id) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const getCartTotal = () => {
    let total = 0;
    for (const prod of products) {
      const qty = cartItems[prod._id] || 0;
      total += prod.price * qty;
    }
    return total;
  };

  
  const cartCount = Object.values(cartItems).reduce((s, n) => s + n, 0);

  
  const loginDemo = () => {
    setIsLoggedIn(true);
  };

  const logoutDemo = () => {
    setIsLoggedIn(false);
    
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        getCartTotal,
        cartCount,

        // orders
        orders,
        setOrders,

        // auth
        isLoggedIn,
        loginDemo,
        logoutDemo,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;                                                                                                            
                                                                                                                                 
