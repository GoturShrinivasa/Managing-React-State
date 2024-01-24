import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Spinner from "./Spinner";
import useFetch from "./useFetch";

export default function App() {
  const [size, setSize] = useState("");

  const {
    data: products,
    error,
    loading,
  } = useFetch("products?category=shoes");

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((product) => product.skus.find((sku) => sku.size == size))
    : products;

  if (error) throw error;
  debugger;
  if (loading) return <Spinner></Spinner>;

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          {size && (
            <p>
              There are {filteredProducts.length} items with {size} size.
            </p>
          )}
          <section id="products">{filteredProducts.map(renderProduct)}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
