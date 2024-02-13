import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import Detail from "./Detail";
import Cart from "./Cart";
import { Route, Routes } from "react-router-dom";

export default function App() {
  const [cart, setCart] = useState([]);

  function addToCart(id, sku) {
    setCart((items) => {
      debugger;
      const itemInCart = items.find((i) => i.sku === sku);
      debugger;
      if (itemInCart) {
        return items.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        //returns new array with new array appended
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      if (quantity === 0) {
        return items.filter((i) => i.sku !== sku);
      }
      return items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    });
  }
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
