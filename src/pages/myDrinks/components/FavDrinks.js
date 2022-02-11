import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RenderDrink from "../../homepage/components/RenderDrink";
import styles from "../styles.module.css";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
export default function FavDrinks() {
  const favDrinks = useSelector((data) => data.userDrinks.data?.favourites);
  const [favDrinksN, setFavDrinksN] = useState(8);
  const [favLoading, setFavLoading] = useState(false);
  const [favDrinkKeys, setFavDrinkKeys] = useState({
    drinks: [],
    sorted: "0",
  });

  const sortedList = favDrinks && Object.keys(favDrinks).sort(sortFavDrinks);
  const sorterdListBackwards = sortedList && [...sortedList].reverse();
  const list = favDrinks && Object.keys(favDrinks);
  useEffect(() => {
    favDrinks &&
      setFavDrinkKeys({ drinks: Object.keys(favDrinks), sorted: "0" });
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
  const handleSortChange = () => {
    switch (favDrinkKeys.sorted) {
      case "0":
        setFavDrinkKeys({ drinks: sortedList, sorted: "1" });
        break;
      case "1":
        setFavDrinkKeys({ drinks: sorterdListBackwards, sorted: "2" });
        break;
      case "2":
        setFavDrinkKeys({ drinks: Object.keys(favDrinks), sorted: "0" });
        break;
    }
  };
  return (
    <div>
      {favDrinks && Object.keys(favDrinks).length && (
        <div className={styles.drinksHeader}>
          <h1 className={styles.title}>Favourite Drinks</h1>
          <i
            className={`fa fa-${
              favDrinkKeys.sorted === "0"
                ? "sort"
                : favDrinkKeys.sorted === "1"
                ? "sort-up"
                : "sort-down"
            }`}
            onClick={handleSortChange}
            style={{marginLeft:"1rem",paddingTop:".5rem",fontSize:"1.5rem"}}
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
