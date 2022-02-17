export const generateQuestion = (
  allDrinks,
  setAnsSelected,
  setQuestionN,
  setOptions,
  setImgUrl,
  questionN
) => {

  setAnsSelected(false);

  if (allDrinks?.length) {
    var randomN = [];
    var data = [];

    while (randomN.length !== 4) {
      const rand = Math.floor(Math.random() * allDrinks?.length);
      !randomN.includes(rand) && randomN.push(rand);
    }
    const correct = Math.floor(Math.random() * 4);

    randomN.forEach((el, index) => {
      const drink = allDrinks[el];
      index === correct && setImgUrl(drink.strDrinkThumb);
      return data.push({
        ...drink,
        correct: index == correct ? true : false,
      });
    });
    setOptions(data);
    setQuestionN(questionN + 1);
  }
};
