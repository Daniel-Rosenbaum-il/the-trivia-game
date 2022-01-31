import react, { useEffect, useRef, useState } from "react";
import { FlashcardList } from "./cmps/FlashcardList";
import { getCategories, getQuestions } from "./services/service";
import "./app.css";
import { Header } from "./cmps/Header";
import { Results } from "./cmps/Results";
import { Hints } from "./cmps/Hints";
import { Loader } from "./cmps/Loader";
import { GameRules } from "./cmps/GameRules";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gamerPoints, setGamerPoints] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [fiftyFifty, setFiftyFifty] = useState(false);
  const [askAudience, setAskAudience] = useState(false);
  const [isAskAudienceUsed, setIsAskAudienceUsed] = useState(false);
  const [isFiftyFiftyUsed, setIsFiftyFiftyUsed] = useState(false);
  const [is30SecondDelayUsed, setIs30SecondDelayUsed] = useState(false);
  const [startTimer, setStartTimer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const categories = await getCategories();
    setCategories(categories);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = amountEl.current.value;
    const category = categoryEl.current.value;
    setGame(amount, category);
  };

  const setGame = async (amount, category) => {
    setLoading(true);
    setFiftyFifty(false);
    setAskAudience(false);
    setIsFiftyFiftyUsed(false);
    setIsAskAudienceUsed(false);
    setGameEnd(false);
    setGameStart(false);
    setIs30SecondDelayUsed(false);
    const cards = await getQuestions(amount, category);
    setGameStart(true);
    setLoading(false);
    setFlashcards(cards);
    setStartTimer(true);
    setCurrentQuestion(1);
    setGamerPoints(0);
  };

  const checkAnswer = (gamerAnswer) => {
    if (gamerAnswer === true) setGamerPoints((gamerPoints) => gamerPoints + 10);
    if (currentQuestion === flashcards.length) {
      endGame();
    } else {
      setTimeout(() => {
        setCurrentQuestion((currentQuestion) => currentQuestion + 1);
      }, 1000);
    }
    if (fiftyFifty === true) {
      setFiftyFifty(false);
    }
    if (askAudience) {
      setAskAudience(false);
    }
  };

  const endGame = () => {
    setStartTimer(false);
    setTimeout(() => {
      setGameStart(false);
      setGameEnd(true);
    }, 1500);
  };

  const set50 = () => {
    if (!isFiftyFiftyUsed) {
      setFiftyFifty(true);
      setIsFiftyFiftyUsed(true);
    }
  };

  const set30SecondsDelay = () => {
    if (!is30SecondDelayUsed) {
      setStartTimer(false);
      setIs30SecondDelayUsed(true);
      setTimeout(() => {
        setStartTimer(true);
      }, 30000);
    }
  };

  const setAudienceAnswers = () => {
    if (!isAskAudienceUsed) {
      setAskAudience(true);
      setIsAskAudienceUsed(true);
    }
  };

  const getStats = (questions, time, points) => {
    const newStats = { questions: questions, time: time, points: points };
    setStats((stats) => newStats);
  };

  if (!categories || categories.length === 0) return "Loading...";
  return (
    <>
      <Header
        currentQuestion={currentQuestion}
        gamerPoints={gamerPoints}
        startTimer={startTimer}
        gameStart={gameStart}
        gameEnd={gameEnd}
        getStats={getStats}
      />
      <div className="app">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" ref={categoryEl}>
              {categories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount of questions</label>
            <input
              className="input-amount"
              type="number"
              id="amount"
              min="1"
              step="1"
              defaultValue={5}
              ref={amountEl}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">
              Generate
            </button>
          </div>
        </form>
        <div className="game-section">
          {!gameStart && !loading && !gameEnd && <GameRules />}
          {loading && <Loader />}
          {!loading && flashcards.length > 0 && (
            <Hints
              set50={set50}
              set30SecondsDelay={set30SecondsDelay}
              setAudienceAnswers={setAudienceAnswers}
              isAskAudienceUsed={isAskAudienceUsed}
              isFiftyFiftyUsed={isFiftyFiftyUsed}
              is30SecondDelayUsed={is30SecondDelayUsed}
            />
          )}
          {!loading && flashcards.length > 0 && !gameEnd && (
            <FlashcardList
              flashcards={flashcards}
              currentQuestion={currentQuestion}
              checkAnswer={checkAnswer}
              fiftyFifty={fiftyFifty}
              askAudience={askAudience}
              isFiftyFiftyUsed={isFiftyFiftyUsed}
            />
          )}
          {gameEnd && <Results stats={stats} />}
        </div>
      </div>
    </>
  );
}

export default App;
