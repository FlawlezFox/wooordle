import { useCallback, useContext, useEffect, useRef } from "react";
import styles from "./index.module.css";
import Row from "./Row";
import { useWindowEventListener } from "src/hooks";
import { GameContext } from "../Root";
import { useAtom } from "jotai";
import { Guess } from "src/models";
import { StatsDialogContext } from "../StatsDialog";

const Board = () => {
  const { charsAtom, guessesAtom, gameAtom } = useContext(GameContext);
  const { showStatsDialog } = useContext(StatsDialogContext);

  const [chars, setChars] = useAtom(charsAtom);
  const [, setGuesses] = useAtom(guessesAtom);
  const [game] = useAtom(gameAtom);
  const keyIndexRef = useRef(0);

  const alertRef = useRef<HTMLDialogElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
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
        const lastGuess: Guess | undefined = game.guesses?.at(-1);

        if (!isRightGuess && lastGuess && lastGuess.isNotInWordList) {
          if (alertRef.current && !alertRef.current.open) {
            alertRef.current.show();
            setTimeout(() => alertRef.current!.close(), 2000);
          }

          return;
        }

        if (lastGuess && lastGuess.isCorrect) {
          showStatsDialog({ gameResult: "win" });
        } else if (game.isGameEnded) {
          showStatsDialog({ gameResult: "lose" });
        }

        setChars([]);
        keyIndexRef.current = 0;
      }
    },
    [chars, game, setChars, setGuesses, showStatsDialog]
  );

  useEffect(() => console.log(game.solution?.word, game.attempts), [game]);

  useWindowEventListener("keydown", handleKeyDown);

  return (
    <>
      <dialog ref={alertRef} className={styles.alert}>
        The word is not in the word list
      </dialog>

      <div className={styles.board}>
        {[...Array(game.maxAttempts)].map((_v, i) => (
          <Row key={i} isCurrent={i === game.attempts} index={i} />
        ))}
      </div>
    </>
  );
};

export default Board;
