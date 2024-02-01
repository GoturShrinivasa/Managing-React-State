import React from "react";
import { useParams } from "react-router-dom"; //this is help us to read parameters from the url
import useFetch from "./useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);

  if (loading) return <Spinner></Spinner>;
  if (product.length === 0) return <PageNotFound></PageNotFound>; //render pageNotFound component when there are no product
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
