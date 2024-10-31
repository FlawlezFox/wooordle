import { useCallback, useContext, useEffect, useRef } from "react";
import styles from "./index.module.css";
import Row from "./Row";
import { useWindowEventListener } from "src/hooks";
import { GameContext } from "../Root";
import { useAtom } from "jotai";

const Board = () => {
  const { charsAtom, guessesAtom, gameAtom } = useContext(GameContext);
  const [chars, setChars] = useAtom(charsAtom);
  const [guesses, setGuesses] = useAtom(guessesAtom);
  const [game, setGame] = useAtom(gameAtom);
  const keyIndexRef = useRef(0);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const exp = /^[a-zA-Z]$/;
      const key = event.key;

      if (exp.test(key) && keyIndexRef.current < 5) {
        keyIndexRef.current++;

        setChars((prev) => [
          ...prev,
          { char: key, isInRightIndex: false, isInWord: false },
        ]);
      } else if (key.includes("Backspace") && keyIndexRef.current > 0) {
        keyIndexRef.current--;

        setChars((prev) => prev.filter((_c, i) => i !== keyIndexRef.current));
      } else if (key.includes("Enter") && keyIndexRef.current === 5) {
        const word = chars.map((c) => c.char).join("");

        game.isRightGuess(word);
        setGuesses([...(game.guesses ?? [])]);

        setChars([]);
        keyIndexRef.current = 0;
      }
    },
    [chars, game, setChars, setGuesses]
  );

  useEffect(() => console.log(game.solution?.word, game.attempts), [game]);
  
  useEffect(() => console.log(chars), [chars, game]);

  useEffect(() => console.log(guesses), [guesses]);

  useWindowEventListener("keydown", handleKeyDown);

  return (
    <div className={styles.board}>
      {[...Array(game.maxAttempts)].map((_v, i) => (
        <Row key={i} isCurrent={i === game.attempts} index={i}/>
      ))}
    </div>
  );
};

export default Board;
