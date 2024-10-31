import { useCallback, useContext, useEffect, useRef } from "react";
import styles from "./index.module.css";
import Row from "./Row";
import { useWindowEventListener } from "src/hooks";
import { GameContext } from "../Root";
import { useAtom } from "jotai";
import { Guess } from "src/models";

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

      if (game.isGameEnded) return;

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

        const isRightGuess = game.isRightGuess(word);
        setGuesses([...(game.guesses ?? [])]);
        const lastGuess: Guess = game.guesses?.at(-1);

        if (!isRightGuess && lastGuess && lastGuess.isNotInWordList) {
          // TODO: make custom alert windows
          alert("The word is not in the word list");
          return;
        }

        if (lastGuess && lastGuess.isCorrect) {
          // TODO: make custom alert windows
          alert("You guessed the word");
        } else if (game.isGameEnded) {
          alert("You have no more attempts!")
        }

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
        <Row key={i} isCurrent={i === game.attempts} index={i} />
      ))}
    </div>
  );
};

export default Board;
