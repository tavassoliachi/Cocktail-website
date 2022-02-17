import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, EffectCoverflow, EffectCreative, EffectCube, EffectFlip, Navigation, Pagination } from "swiper";
import styles from "../styles.module.css";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
function DrinksSwiper({ randomDrinks }) {
  const [lang, setLang] = useState("strInstructions");
  const { t } = useTranslation();
  const navigate = useNavigate()
  return (
    <div className={styles.containerRand}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation, Pagination,EffectCoverflow]}
        loop
        effect="coverflow"
        navigation
        pagination={{ clickable: true }}
        className="customSwiper"
      >
        {randomDrinks?.map((el) => {
          const instructions = Object.keys(el).filter((elem) =>
            elem.includes("strInstructions")
          );
          return (
            <SwiperSlide className={styles.customSlide} >
              <img
                src={el.strDrinkThumb}
                style={{
                  height: "20rem",
                  objectFit: "contain",
                  borderRadius: "15px",
                }}
              />
              <div className={styles.swiperSubCont}>
                <h1>{el.strDrink}</h1>
                <div className={styles.ranInstructions}>
                  <div className={styles.stepsTitle}>{t("instructions")}</div>
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

                  <h1 className={styles.steps}>
                    {el[lang]}
                  </h1>
                </div>
              </div>
              <div className={styles.ranIngredients}>
                <h1>{t("ingredients")}</h1>

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
