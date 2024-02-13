import React, { useState } from "react";
import Spinner from "./Spinner";
import useFetch from "./useFetch";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { Link } from "react-router-dom";

export default function Products() {
  const [size, setSize] = useState("");
  const { category } = useParams();

  const {
    data: products,
    error,
    loading,
  } = useFetch("products?category=" + category);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((product) => product.skus.find((sku) => sku.size == size))
    : products;

  if (error) throw error;
  debugger;
  if (loading) return <Spinner></Spinner>;
  if (products.length === 0) return <PageNotFound></PageNotFound>;

  return (
    <>
      <main>
        <section id="filters">
          <label htmlFor="size">Filter by Size:</label>
        </section>
        {size && (
          <p>
            There are {filteredProducts.length} items with {size} size.
          </p>
        )}
        <section id="products">{filteredProducts.map(renderProduct)}</section>
      </main>
    </>
  );
}
