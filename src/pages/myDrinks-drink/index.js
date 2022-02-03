import React from "react";
import DrinkComponent from "../../components/DrinkComponent";
import { useSelector } from "react-redux";
export default function MyDrink() {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const data = useSelector((el) => el?.userDrinks?.data?.drinks[id]);
  return <DrinkComponent id={id} loading={false} drink={data} />;
}
