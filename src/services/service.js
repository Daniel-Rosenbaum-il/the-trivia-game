import axios from "axios";

export async function getCategories() {
  const categories = await axios
    .get("https://opentdb.com/api_category.php")
    .then((res) => {
      return res.data.trivia_categories;
    });
  return categories;
}

export async function getQuestions(amount, category) {
  const cards = await axios
    .get("https://opentdb.com/api.php", {
      params: {
        amount: amount,
        category: category,
      },
    })
    .then((res) => {
      return res.data.results.map((result, index) => {
        const answer = _transformHtmlToString(result.correct_answer);
        const options = [
          ...result.incorrect_answers.map((answer) => {
            return _transformHtmlToString(answer);
          }),
          answer,
        ];
        return {
          id: `${index}-${Date.now()}`,
          question: _transformHtmlToString(result.question),
          answer: answer,
          options: options.sort(() => Math.random() - 0.5),
        };
      });
    });
  return cards;
}

function _transformHtmlToString(str) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value;
}
export function setTimeString(time) {
  let min = Math.floor(time / 60);
  let sec = time % 60;
  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
}
