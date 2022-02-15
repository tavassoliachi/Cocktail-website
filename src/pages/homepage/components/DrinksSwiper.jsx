import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import styles from "../styles.module.css";

function DrinksSwiper({ randomDrinks }) {
  const [lang, setLang] = useState("strInstructions");
  return (
    <div className={styles.containerRand}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Pagination]}
        loop
        navigation
        pagination={{ clickable: true }}
      >
        {randomDrinks?.map((el) => {
          const instructions = Object.keys(el).filter((elem) =>
            elem.includes("strInstructions")
          );
          return (
            <SwiperSlide className={styles.customSlide}>
              <img
                src={el.strDrinkThumb}
                style={{ height: "23rem", borderRadius: "15px" }}
              />
              <div style={{ width: "40%" }}>
                <h1>{el.strDrink}</h1>
                <div>
                  <div className={styles.stepsTitle}>Instructions</div>
                  {instructions.map((n) => {
                    const active = lang === n;

                    return (
                      <>
                        <button
                          disabled={!el[n]}
                          className={styles.langBtn}
                          style={
                            active
                              ? { backgroundColor: "black", color: "white" }
                              : { backgroundColor: "white", color: "black" }
                          }
                          onClick={() => setLang(n)}
                        >
                          {n !== "strInstructions"
                            ? n.substring("strInstructions".length)
                            : "ENG"}
                        </button>
                      </>
                    );
                  })}

                  <h1 className={styles.steps} style={{ width: "60%" }}>
                    {el[lang]}
                  </h1>
                </div>
              </div>
              <div>
                <h1>Ingredients</h1>

                <div>
                  {Object.keys(el)
                    .filter((m) => m.includes("strIngredient") && el[m])
                    .map((k, index) => {
                      return (
                        <div>
                          <h1 className={styles.steps}>
                            {el[k]} - {el[`strMeasure${index + 1}`]}
                          </h1>
                        </div>
                      );
                    })}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default DrinksSwiper;
