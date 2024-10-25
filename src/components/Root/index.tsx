import { memo, useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { Game } from "src/models";

const Root = () => {
  const { theme, switchTheme } = useContext(ThemeContext);
  const [guess, setGuess] = useState<string>("");
  const [game, setGame] = useState<Game>();

  useEffect(() => console.log(game?.solution?.word), [game]);

  const handleStart = () => {
    setGame(new Game(5, "classic", 6));
  };

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setGuess(event.target.value);
    },
    []
  );

  const handleMakeGuess = () => {
    if (game) {
      game.isRightGuess(guess);
      console.log(guess);
      console.log(game.guesses);
    }
  };

  return (
    <div>
      <div className="container">Root</div>
      <button onClick={switchTheme}>{theme}</button>
      <button onClick={handleStart}>reset</button>

      <div>
        <input type="text" onChange={handleChange} />
        <button onClick={handleMakeGuess}>Guess</button>
      </div>
    </div>
  );
};

export default memo(Root);
