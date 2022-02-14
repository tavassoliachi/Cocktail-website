import React, { useEffect } from "react";
import { fetchSingleDrink } from "../../redux/actions/fetchActions";
import { useDispatch, useSelector } from "react-redux";
import DrinkComponent from "../../components/DrinkComponent";
import { singleDrink } from "../../redux/consts/reducerType";
import { Helmet } from "react-helmet";
export default function Drink() {
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  useEffect(() => {
    dispatch(fetchSingleDrink(id));
    window.scrollTo(0, 0);
    return () => {
      dispatch({ type: `${singleDrink.erase}` });
    };
  }, []);

  const drinkDATA = useSelector((el) => {
    return el.singleDrinkData;
  });
  const drink = drinkDATA.data;
  const loading = drinkDATA.loading;

  return (
    <>
    <Helmet>
        <title>{drink?.strDrink}</title>
    </Helmet>
      <DrinkComponent drink={drink} loading={loading} id={id} />
    </>
  );
}
