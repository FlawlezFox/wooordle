import { memo, useCallback, useContext, useState } from "react";
import styles from "./index.module.css";
import IconButton from "src/components/IconButton";
import CopyIcon from "src/assets/copy.svg?react";
import RestartIcon from "src/assets/restart.svg?react";
import DoneIcon from "src/assets/done.svg?react";
import { GameContext, Text } from "src/components";
import { useAtom, useSetAtom } from "jotai";
import { Game } from "src/models";
import { StatsDialogContext } from "../Context";

type Props = {
  isWin?: boolean;
  solution?: string;
};

const Message = memo((props: Props) => {
  const { gameAtom, guessesAtom } = useContext(GameContext);
  const { dialogRef, gameResultAtom } = useContext(StatsDialogContext);
  const [game, setGame] = useAtom(gameAtom);
  const setGuesses = useSetAtom(guessesAtom);
  const setGameResult = useSetAtom(gameResultAtom);

  const [isCopied, setIsCopied] = useState(false);

  const handleRestart = useCallback(() => {
    if (game) {
      setGame(new Game(game.solution?.length, game.gameMode, game.maxAttempts));
      setGuesses([]);
      setGameResult(undefined);
      dialogRef.current?.close();
    }
  }, [dialogRef, game, setGame, setGameResult, setGuesses]);

  const handleCopy = useCallback(() => {
    if (!navigator.clipboard) return;

    if (game && game.guesses) {
      let gameResult: string = "";
      const guessesInWordList = game.guesses.filter((g) => !g.isNotInWordList);

      if (guessesInWordList.findIndex((guess) => guess.isCorrect) !== -1) {
        gameResult += `Wooordle guessed in ${guessesInWordList.length}/6\n`;
      } else {
        gameResult += `Wooordle guessed in X/6\n`;
      }

      guessesInWordList.forEach((guess, i) => {
        if (guess.isCorrect) {
          gameResult += "🟩🟩🟩🟩🟩";
          return;
        }

        guess.chars?.forEach((char) => {
          if (char.isInRightIndex) {
            gameResult += "🟩";
          } else if (char.isInWord && !char.isInRightIndex) {
            gameResult += "🟨";
          } else {
            gameResult += "⬛";
          }
        });

        if (i < guessesInWordList.length) {
          gameResult += "\n";
        }
      });

      navigator.clipboard.writeText(gameResult);

      if (!isCopied) {
        setIsCopied((prev) => !prev);
        setTimeout(() => setIsCopied((prev) => !prev), 5000);
      }
    }
  }, [game, isCopied]);

  return (
    <div className={styles.Message_container}>
      <div className={styles.Message_emoji}>
        <Text variant="large">{props.isWin ? "🏆" : "❌"}</Text>
        <div
          className={
            props.isWin ? styles.Message_greenBlur : styles.Message_redBlur
          }
        />
      </div>

      <Text variant="medium" fontWeight="600">
        {props.isWin ? "You guessed the word!" : "You lose!"}
      </Text>

      {!!props.solution && (
        <Text variant="default">
          The word was{" "}
          <span className={styles.Message_span}>
            {props.solution.toUpperCase()}
          </span>
        </Text>
      )}

      <div className={styles.Message_buttons}>
        <IconButton onClick={handleCopy}>
          {isCopied ? (
            <DoneIcon className={styles.Message_doneIcon} />
          ) : (
            <CopyIcon className={styles.Message_icon} />
          )}
        </IconButton>

        <IconButton onClick={handleRestart}>
          <RestartIcon className={styles.Message_icon} />
        </IconButton>
      </div>
    </div>
  );
});

export { Message };
