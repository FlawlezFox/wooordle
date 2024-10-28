import { memo, useCallback, useEffect, useState } from "react";
import { Game } from "src/models";
import Header from "../Header";
import styles from "./index.module.css";

const Root = () => {
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
    <div className={styles.container}>
      <Header />
    </div>
  );
};

export default memo(Root);
