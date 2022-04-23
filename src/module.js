/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav>
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/settings">User Settings</Link>
          </li>
          <li>
            <Link to="/stats">Player Stats</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}

function Home(props) {
  let {
    numberOfGuessesAllowed,
    minimumNumber,
    maximumNumber,
    numberGuessedCorrectly,
    setNumberGuessedCorrectly,
    setAverageGuessesNeeded,
  } = props;
  const [roundNumber, setRoundNumber] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [guess, setGuess] = useState("");
  const [guessNumber, setGuessNumber] = useState(1);
  const [message, setMessage] = useState("");
  const [subMessage, setSubMessage] = useState("");
  const [totalGuessCount, setTotalGuessCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const startNewRound = () => {
    setAnswer(
      Math.floor(Math.random() * (maximumNumber - minimumNumber + 1)) +
        minimumNumber
    );
    setRoundNumber(roundNumber + 1);
    setGuess("");
    setGuessNumber(1);
    setMessage("");
    setSubMessage("");
    setIsDisabled(false);
  };

  const guessForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <label>Guess: </label>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />{" "}
        &nbsp;
        <input type="submit" disabled={isDisabled} />
      </form>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setGuessNumber(guessNumber + 1);

    let isGuessedCorrectly = false;

    if (guessNumber <= numberOfGuessesAllowed) {
      let total = totalGuessCount + 1;
      setTotalGuessCount(total);
      if (guess == answer) {
        setNumberGuessedCorrectly(numberGuessedCorrectly + 1);
        setMessage("You guessed correctly. Start a new round.");
        setIsDisabled(true);
        isGuessedCorrectly = true;
      }
      if (guess < answer) {
        setMessage("Your guess is too low.");
      }
      if (guess > answer) {
        setMessage("Your guess is too high.");
      }
      setAverageGuessesNeeded((total / roundNumber).toFixed(2));
    }

    if (guessNumber == numberOfGuessesAllowed && isGuessedCorrectly == false) {
      setSubMessage(` The answer was ${answer}. Please start a new round.`);
      setIsDisabled(true);
    }
  };

  return (
    <div>
      <h2>Guessing Game</h2>
      <p>Number of Guesses Allowed: {numberOfGuessesAllowed}</p>
      <p>
        Range of Numbers: {minimumNumber} - {maximumNumber}
      </p>
      <button onClick={startNewRound}>Start New Round</button>
      <br />
      <br />
      {roundNumber > 0 && guessForm()}
      {message}
      {subMessage}
    </div>
  );
}

function Settings(props) {
  const {
    numberOfGuessesAllowed,
    minimumNumber,
    maximumNumber,
    setNumberOfGuessesAllowed,
    setMinimumNumber,
    setMaximumNumber,
  } = props;
  return (
    <div>
      <h2>User Settings</h2>
      <form>
        <label htmlFor="numberGuesses">Number of Guesses Allowed: </label>
        <input
          type="number"
          name="numberGuesses"
          id="numberGuesses"
          defaultValue={numberOfGuessesAllowed}
          onChange={(e) => setNumberOfGuessesAllowed(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="minNum">Minimum Number of Guessing Range: </label>
        <input
          type="number"
          name="minNum"
          id="minNum"
          defaultValue={minimumNumber}
          onChange={(e) => setMinimumNumber(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="maxNum">Maximum Number of Guessing Range: </label>
        <input
          type="number"
          name="maxNum"
          id="maxNum"
          defaultValue={maximumNumber}
          onChange={(e) => setMaximumNumber(e.target.value)}
        />
      </form>
    </div>
  );
}

function Stats(props) {
  const { numberGuessedCorrectly, averageGuessesNeeded } = props;
  return (
    <div>
      <h2>Player Stats</h2>
      <p>Number Guessed Correctly: {numberGuessedCorrectly} </p>
      <p>Average Guesses Needed: {averageGuessesNeeded} </p>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404</h2>
    </div>
  );
}

export function GuessApp() {
  const [numberOfGuessesAllowed, setNumberOfGuessesAllowed] = useState(3);
  const [minimumNumber, setMinimumNumber] = useState(1);
  const [maximumNumber, setMaximumNumber] = useState(100);
  const [numberGuessedCorrectly, setNumberGuessedCorrectly] = useState(0);
  const [averageGuessesNeeded, setAverageGuessesNeeded] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Home
                numberOfGuessesAllowed={numberOfGuessesAllowed}
                minimumNumber={minimumNumber}
                maximumNumber={maximumNumber}
                numberGuessedCorrectly={numberGuessedCorrectly}
                setNumberGuessedCorrectly={setNumberGuessedCorrectly}
                setAverageGuessesNeeded={setAverageGuessesNeeded}
              />
            }
          />
          <Route
            path="settings"
            element={
              <Settings
                numberOfGuessesAllowed={numberOfGuessesAllowed}
                minimumNumber={minimumNumber}
                maximumNumber={maximumNumber}
                setNumberOfGuessesAllowed={setNumberOfGuessesAllowed}
                setMinimumNumber={setMinimumNumber}
                setMaximumNumber={setMaximumNumber}
              />
            }
          />
          <Route
            path="stats"
            element={
              <Stats
                numberGuessedCorrectly={numberGuessedCorrectly}
                averageGuessesNeeded={averageGuessesNeeded}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
