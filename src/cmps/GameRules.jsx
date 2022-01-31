import React from "react";

export const GameRules = () => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="rules">
          <p className="rules-title">Welcome to The TriviaGame</p>
          <p>
            The rules are simple: chose a category, number of questions and
            click the generate button to start a new game, every time you click
            the generate button a new game will start. Every right answer will
            get you 10 points.
          </p>
          <p>
            You have 3 hints buttons, one for 50/50 that will cut two wrong
            answers, one for asking the computer for what he thinks is the right
            answer and one for 30 seconds delay on the clock. every hint can be
            used only once a game. Enjoy
          </p>
        </div>
      </div>
    </div>
  );
};
