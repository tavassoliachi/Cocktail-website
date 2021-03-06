import React from "react";
import { useState,useRef } from "react";
import styles from "../styles.module.css";
import RenderDrink from "./RenderDrink";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircularProgress from "@mui/material/CircularProgress";
import {useTranslation} from "react-i18next"
export default function Drinks({ drinks, thisCat, loading }) {
  const [drinkNum, setDrinkNum] = useState(8);
  const {t} = useTranslation();
  const loadingRef = useRef()
  const showMore = () => {
    const spinnerStyles = loadingRef.current.style
    spinnerStyles.display = "unset"
    const loadDrinks = () => {
      setDrinkNum(drinkNum + 8);
      spinnerStyles.display = "none";

    };
    setTimeout(() => {
      loadDrinks();
    }, 1500);
  };
  return (
    <div>
      <h1 className={styles.title}>
        {thisCat}
        <ArrowForwardIosIcon
          style={{ color: "#d1843b", paddingLeft: "15px" }}
        />
      </h1>
      <div>
        {loading ? (
          <CircularProgress />
        ) : drinks ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className={styles.drinksCont}>
              {drinks.slice(0, drinkNum).map((el) => {
                return (
                  <RenderDrink el={el} key={el.idDrink} category={thisCat} />
                );
              })}
            </div>
            <CircularProgress
              style={{ display: "none" }}
              ref={loadingRef}
              id={`spinner-${thisCat}`}
            />
            <button
              onClick={showMore}
              className={styles.showMore}
              id="showMore"
            >
              {t("showMore")}
            </button>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>Could not fetch drinks</p>
        )}
      </div>
    </div>
  );
}
