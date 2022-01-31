import { setTimeString } from "../services/service";

export const Results = ({ stats }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="results">
          <p className="game-end-title">Game Over</p>
          <p>Questions: {stats.questions}</p>
          <p>Points: {stats.points}</p>
          <p>Time: {setTimeString(stats.time)}</p>
        </div>
      </div>
    </div>
  );
};
