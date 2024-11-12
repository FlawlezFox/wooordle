import { useCallback, useContext, useEffect, useRef } from "react";
import styles from "./index.module.css";
import Row from "./Row";
import { useWindowEventListener } from "src/hooks";
import { GameContext } from "../Root";
import { useAtom } from "jotai";
import { StatsDialogContext } from "../StatsDialog";

export const Board = () => {
  const { charsAtom, guessesAtom, gameAtom } = useContext(GameContext);
  const { showStatsDialog } = useContext(StatsDialogContext);

  const [chars, setChars] = useAtom(charsAtom);
  const [guesses, setGuesses] = useAtom(guessesAtom);
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

        if (!game.solution!.isInDictionary(word)) {
          if (alertRef.current && !alertRef.current.open) {
            alertRef.current.show();
            setTimeout(() => alertRef.current!.close(), 2000);
          }

          return;
        }

        const isRightGuess = game.isRightGuess(word);
        setGuesses([...(game.guesses ?? [])]);

        if (isRightGuess) {
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

  useWindowEventListener("keydown", handleKeyDown);

  useEffect(() => {
    console.log(game.solution?.word);
  }, [game.solution?.word]);

  useEffect(() => {
    console.log(guesses);
  }, [guesses]);

  return (
    <>
      <dialog ref={alertRef} className={styles.alert}>
        The word is not in the word list
      </dialog>

      <div className={styles.board}>
        {[...Array(game.maxAttempts)].map((_v, i) => (
          <Row
            key={i}
            isCurrent={i === (game.guesses?.length ?? 0)}
            index={i}
          />
        ))}
      </div>
    </>
  );
};
