import React, { useEffect, useState } from "react";

export const Flashcard = ({
  flashcard,
  checkAnswer,
  fiftyFifty,
  askAudience,
  isFiftyFiftyUsed,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [rightAnswer, setRightAnswer] = useState(null);
  const [audienceAnswers, setAudienceAnswers] = useState([]);

  useEffect(() => {
    setSelectedAnswer(null);
    setRightAnswer(null);
  }, [flashcard]);

  useEffect(() => {
    let answersByAudiance = [];
    let percentage = 0;
    if (askAudience) {
      for (let i = 0; i < flashcard.options.length; i++) {
        if (i === flashcard.options.length - 1) {
          answersByAudiance.push(100 - percentage);
        } else {
          let randomInt = getRandomIntInclusive(0, 100 - percentage);
          percentage += randomInt;
          answersByAudiance.push(randomInt);
        }
      }
    }
    setAudienceAnswers(answersByAudiance);
  }, [askAudience]);

  function check(answer, index) {
    if (answer === flashcard.answer) {
      setRightAnswer(index);
      checkAnswer(true);
    } else {
      const optionRight = flashcard.options.findIndex(
        (option) => option === flashcard.answer
      );
      setSelectedAnswer(index);
      setRightAnswer(optionRight);
      checkAnswer(false);
    }
  }

  const setOptions = () => {
    if (fiftyFifty && isFiftyFiftyUsed) {
      const filteredOptions = flashcard.options.filter(
        (option) => option !== flashcard.answer
      );
      flashcard.options = [filteredOptions[0], flashcard.answer].sort(
        () => Math.random() - 0.5
      );
    }
    return flashcard.options;
  };

  return (
    <div className={`card`}>
      <div className="front">
        <p>{flashcard.question}</p>
        <div className="flashcard-options">
          {setOptions().map((option, index) => {
            return (
              <div
                className={`flashcard-option ${
                  rightAnswer === index ? "selectedTrue" : ""
                } ${
                  selectedAnswer === index && rightAnswer !== index
                    ? "selectedWrong"
                    : ""
                }`}
                key={index}
                onClick={() => check(option, index)}
              >
                {option}
                <span>
                  {askAudience &&
                    audienceAnswers.length > 0 &&
                    `${audienceAnswers[index]}%`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
