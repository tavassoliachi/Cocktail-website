import React from 'react'
import styles from "./styles.module.css"
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
export default function QuizQuestions({imgUrl,questionN,score,handleAnswer,ansSelected,options}) {
  return (
    <div className={styles.questionCont}>
    <img src={imgUrl} className={styles.quizImage} />
    <div className={styles.questionSubCont}>
      <h1 className={styles.questionTitle}>Guess the name!</h1>
      <h1 className={styles.questionTitle2}>
        Question: {questionN} / 10
      </h1>
      <h1 className={styles.score}>Score: {score}</h1>

      <div style={{ marginTop: "3rem", transform: "translateX(-1rem)" }}>
        {options?.map((el) => {
          const color = ansSelected && el.correct && "green";
          const txtColor = ansSelected && el.correct && "white";
          return (
            <div
              className={styles.options}
              style={{
                backgroundColor: color || "white",
                color: txtColor || "black",
                borderRadius: "1rem",
                pointerEvents: ansSelected ? "none" : "all",
              }}
              onClick={(e) => handleAnswer(el, e)}
            >
              {el.strDrink}
              {ansSelected &&
                (el.correct ? (
                  <CheckIcon style={{ float: "right" }} />
                ) : (
                  <ClearIcon style={{ float: "right" }} />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  </div>
  )
}
