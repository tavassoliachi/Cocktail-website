import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import QuizStart from "./QuizStart";
import QuizQuestions from "./QuizQuestions";
export default function Quiz() {
  const [options, setOptions] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [questionN, setQuestionN] = useState(0);
  const data = useSelector((data) => data);
  const [ansSelected, setAnsSelected] = useState(false);
  const handleAnswer = (el, e) => {
    if (!ansSelected) {
      el.correct && setScore(score + 1);
      e.target.style.backgroundColor = el.correct ? "green" : "red";
      e.target.style.color = "white";
      setAnsSelected(true);
    }
    setTimeout(() => {
      if (questionN !== 10) {
        handleClick();
      } else {
        setQuestionN(11);
        setStarted(false);
      }
      e.target.style.backgroundColor = "white";
      e.target.style.color = "black";
    }, 1000);
  };
  const handleClick = () => {
    const allDrinks = data.alcoholicData.data?.drinks.concat(
      data.nonAlcoholicData.data?.drinks
    );
    setAnsSelected(false);

    if (allDrinks?.length) {
      var randomN = [];
      var data2 = [];
      while (randomN.length !== 4) {
        const rand = Math.floor(
          Math.random() * (allDrinks?.length )
        );
        !randomN.includes(rand) && randomN.push(rand);
      }
      const correct = Math.floor(Math.random() * 4);

      randomN.forEach((el, index) => {
        const drink = allDrinks[el];
        index === correct && setImgUrl(drink.strDrinkThumb);
        return data2.push({
          ...drink,
          correct: index == correct ? true : false,
        });
      });
      setOptions(data2);
      setQuestionN(questionN + 1);
    }
  };
  const handleStart = () => {
    data.alcoholicData?.data?.drinks &&
      data.nonAlcoholicData?.data?.drinks &&
      handleClick();
    setStarted(true);
    setScore(0);
    setQuestionN(1);
  };
  return (
    <div className={styles.quizCont}>
      {started ? <QuizQuestions options={options} imgUrl={imgUrl} questionN={questionN} score={score} handleAnswer={handleAnswer} ansSelected={ansSelected}/> : <QuizStart score={score} handleStart={handleStart} questionN={questionN}/>}
    </div>
  );
}
