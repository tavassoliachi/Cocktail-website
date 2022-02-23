export const handleAnswer = (
  e,
  el,
  ansSelected,
  setAnsSelected,
  questionN,
  generateQuestion,
  setQuestionN,
  setStarted,
  setScore,
  score
) => {
  if (!ansSelected) {
    el.correct && setScore(score + 1);
    e.target.style.backgroundColor = el.correct ? "green" : "red";
    e.target.style.color = "white";
    setAnsSelected(true);
  }
  setTimeout(() => {
    if (questionN !== 10) {
      generateQuestion();
    } else {
      setQuestionN(11);
      setStarted(false);
    }
    e.target.style.backgroundColor = "white";
    e.target.style.color = "black";
  }, 1000);
};
