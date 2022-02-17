import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "../styles.module.css";
import QuizStart from "./QuizStart";
import QuizQuestions from "./QuizQuestions";
import { handleAnswer } from "./Functions/handleAnswer";
import { generateQuestion } from "./Functions/generateQuestion";
import { handleStart } from "./Functions/handleStart";
export default function Quiz() {
  const [options, setOptions] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [questionN, setQuestionN] = useState(0);
  const data = useSelector((data) => data);
  const [ansSelected, setAnsSelected] = useState(false);
  const allDrinks = useMemo(() =>
    data.alcoholicData.data?.drinks.concat(
      data.nonAlcoholicData.data?.drinks,
      []
    )
  );
  const renderQuestion = () => {
    generateQuestion(
      allDrinks,
      setAnsSelected,
      setQuestionN,
      setOptions,
      setImgUrl,
      questionN
    );
  };

  const handleAnswerProps = [ansSelected,setAnsSelected,questionN,renderQuestion,setQuestionN,setStarted,setScore,score]
  const handleStartProps = [data, renderQuestion, setStarted, setScore, setQuestionN]



  return (
    <div className={styles.quizCont}>
      {started ? (
        <QuizQuestions
          options={options}
          imgUrl={imgUrl}
          questionN={questionN}
          score={score}
          handleAnswer={(e,el)=>handleAnswer(e,el,...handleAnswerProps)}
          ansSelected={ansSelected}
        />
      ) : (
        <QuizStart
          score={score}
          handleStart={()=>handleStart(...handleStartProps)}
          questionN={questionN}
        />
      )}
    </div>
  );
}
