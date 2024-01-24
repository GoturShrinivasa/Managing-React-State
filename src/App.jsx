import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";
import Spinner from "./Spinner";

export default function App() {
  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);

  //calling apis using promise
  // useEffect(() => {
  //   getProducts("shoes")
  //     .then((response) => setProducts(response))
  //     .catch((e) => setError(e))
  //     .finally(() => setloading(false));
  // }, []);

  //calling apis using async and await
  useEffect(() => {
    async function init() {
      try {
        const response = await getProducts("shoes");
        setProducts(response);
      } catch (e) {
        setError(e);
      } finally {
        setloading(false);
      }
    }
    init();
  }, []);

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
