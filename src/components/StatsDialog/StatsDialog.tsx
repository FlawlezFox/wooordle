import { memo, useCallback, useContext, useState } from "react";
import Dialog from "../Dialog";
import { StatsDialogContext } from "./Context";
import { Button } from "../Button";
import { Message } from "./Message";
import { useAtom, useAtomValue } from "jotai";
import { GameContext } from "../Root";
import Stats from "./Stats";
import styles from "./index.module.css";
import { RESET } from "jotai/utils";

const StatsDialog = memo(() => {
  const { gameStatsAtom, dialogRef, gameResultAtom } =
    useContext(StatsDialogContext);
  const { gameAtom } = useContext(GameContext);

  const gameResult = useAtomValue(gameResultAtom);
  const game = useAtomValue(gameAtom);
  const [gameStats, setGameStats] = useAtom(gameStatsAtom);
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = useCallback(() => {
    if (!navigator.clipboard) return;

    if (!isCopied) {
      navigator.clipboard.writeText(`Games played: ${gameStats.gamesPlayed}
        Games won: ${gameStats.gamesWon}
        Win%: ${isNaN(gameStats.winPercent) ? 0 : gameStats.winPercent}%
        Current streak: ${gameStats.streakCurrent}
        Max streak: ${gameStats.streakMax}`);

      setIsCopied((prev) => !prev);
      setTimeout(() => setIsCopied((prev) => !prev), 5000);
    }
  }, [gameStats, isCopied]);

  const handleReset = useCallback(() => {
    setGameStats(RESET);
  }, [setGameStats]);

  const handleClose = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [dialogRef]);

  return (
    <Dialog
      ref={dialogRef}
      title="Your statistics"
      actions={
        <>
          <Button
            fullWidth
            variant="default"
            color="green"
            onClick={handleShare}
          >
            {isCopied ? "Copied!" : "Share"}
          </Button>

          <Button fullWidth variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </>
      }
      onCloseDialog={handleClose}
    >
      {gameResult && (
        <Message
          isWin={gameResult === "win"}
          solution={game.solution?.word || ""}
        />
      )}

      {gameResult && <hr className={styles.StatsDialog_hr} />}

      <Stats />
    </Dialog>
  );
});

export { StatsDialog };
