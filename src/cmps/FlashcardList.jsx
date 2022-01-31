import React from "react";
import { Flashcard } from "./Flashcard";

export const FlashcardList = ({
  flashcards,
  currentQuestion,
  checkAnswer,
  fiftyFifty,
  askAudience,
  isFiftyFiftyUsed,
}) => {
  return (
    <div className="card-container">
      {currentQuestion > 0 && (
        <Flashcard
          flashcard={flashcards[currentQuestion - 1]}
          checkAnswer={checkAnswer}
          fiftyFifty={fiftyFifty}
          askAudience={askAudience}
          isFiftyFiftyUsed={isFiftyFiftyUsed}
        />
      )}
    </div>
  );
};
