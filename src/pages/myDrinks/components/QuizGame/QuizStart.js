import React from "react";
import styles from "../styles.module.css";
export default function QuizStart({ score, handleStart, questionN }) {
  const RenderScore = () => {
    return (
      questionN == 11 && (
        <h1 style={{ color: "white", fontWeight: "400", fontSize: "2rem" }}>
          Your Score is {score}/10
        </h1>
      )
    );
  };
  return (
    <div style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
      <h1 className={styles.quizTitle}>Test your skills in Cocktail names!</h1>
      <RenderScore />
      <button onClick={handleStart} className={styles.playBTN}>
        Play {questionN == 11 && "Again"}
      </button>
    </div>
  );
}
