import React from 'react'
import styles from "./styles.module.css"
export default function QuizStart({score,handleStart,questionN}) {
  return (
    <div>
          <h1 className={styles.quizTitle}>
            Test your skills in Cocktail names!
          </h1>
          {questionN == 11 && (
            <h1 style={{ color: "white" }}>Your Score is {score}/10</h1>
          )}
          <button
            onClick={handleStart}
            style={{
              backgroundColor: "white",
              border: "1px solid black",
              padding: "15px 25px",
              fontWeight: "600",
            }}
          >
            Play {questionN == 11 && "Again"}
          </button>
    </div>
  )
}
