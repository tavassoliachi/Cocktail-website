export const handleStart = (
  data,
  renderQuestion,
  setStarted,
  setScore,
  setQuestionN
) => {
  data.alcoholicData?.data?.drinks &&
    data.nonAlcoholicData?.data?.drinks &&
    renderQuestion();
  setStarted(true);
  setScore(0);
  setQuestionN(1);
};
