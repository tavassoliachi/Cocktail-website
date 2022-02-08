import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RenderDrink from "../../homepage/components/RenderDrink";
import styles from "../styles.module.css";
import { CircularProgress } from "@mui/material";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
export default function FavDrinks() {
  const favDrinks = useSelector((data) => data.userDrinks.data?.favourites);
  const [favDrinksN, setFavDrinksN] = useState(8);
  const [favLoading, setFavLoading] = useState(false);
  const [favDrinkKeys, setFavDrinkKeys] = useState({
    drinks: [],
    sorted: false,
  });

  const sortedList = favDrinks && Object.keys(favDrinks).sort(sortFavDrinks);
  const list = favDrinks && Object.keys(favDrinks);
  
  useEffect(() => {
    favDrinks &&
      setFavDrinkKeys({ drinks: Object.keys(favDrinks), sorted: false });
  }, [favDrinks]);

  function sortFavDrinks(a, b) {
    if (favDrinks[a].strDrink < favDrinks[b].strDrink) {
      return -1;
    }
    if (favDrinks[a].strDrink > favDrinks[b].strDrink) {
      return 1;
    }
    return 0;
  }
  return (
    <div>
      {favDrinks && Object.keys(favDrinks).length && (
        <div className={styles.drinksHeader}>
          <h1 className={styles.title}>Favourite Drinks</h1>
          <SortByAlphaIcon
            className={styles.sort}
            style={{ fill: favDrinkKeys.sorted ? "red" : "#06273A" }}
            onClick={() =>
              setFavDrinkKeys(
                favDrinkKeys.sorted
                  ? { drinks: list, sorted: false }
                  : { drinks: sortedList, sorted: true }
              )
            }
          />
        </div>
      )}

      <div className={styles.drinksCont}>
        {favDrinks &&
          favDrinkKeys.drinks.slice(0, favDrinksN).map((el) => {
            return (
              <div className={styles.drink}>
                <RenderDrink
                  el={favDrinks[el]}
                  category={favDrinks[el].strAlcoholic}
                />
              </div>
            );
          })}
        {favLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <CircularProgress />
          </div>
        )}
        {favDrinks && Object.keys(favDrinks).length > favDrinksN && (
          <button
            className={styles.showMore}
            onClick={() => [
              setFavLoading(true),
              setTimeout(function () {
                setFavLoading(false);
                setFavDrinksN(favDrinksN + 8);
              }, 2000),
            ]}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
