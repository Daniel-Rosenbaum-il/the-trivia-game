import { useRef, useState, useEffect } from "react";
import { setTimeString } from "../services/service";

export const Header = ({
  currentQuestion,
  gamerPoints,
  startTimer,
  gameStart,
  gameEnd,
  getStats,
}) => {
  const [timePassed, setTimePassed] = useState(0);
  const intervalId = useRef();

  useEffect(() => {
    startTime(startTimer);
  }, [startTimer]);

  useEffect(() => {
    if (gameEnd === false && gameStart === true) setTimePassed(0);
  }, [gameStart]);

  const startTime = (startTimer) => {
    startTimer
      ? (intervalId.current = setInterval(() => {
          setTimePassed((timePassed) => timePassed + 1);
        }, 1000))
      : clearInterval(intervalId.current);
  };

  useEffect(() => {
    if (gameEnd) {
      getStats(currentQuestion, timePassed, gamerPoints);
    }
  }, [gameEnd]);
  return (
    <header>
      <div className="container">
        <p className="logo">The TriviaGame</p>
        {/* <div className="stats"> */}
        <p>Question: {currentQuestion}</p>
        <p>Time: {setTimeString(timePassed)}</p>
        <p>Points: {gamerPoints}</p>
      </div>
      {/* </div> */}
    </header>
  );
};
