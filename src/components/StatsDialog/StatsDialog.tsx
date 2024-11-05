import { memo, useCallback, useContext } from "react";
import Dialog from "../Dialog";
import { StatsDialogContext } from "./Context";
import { Button } from "../Button";
import { Message } from "./Message";
import { useAtomValue } from "jotai";
import { GameContext } from "../Root";
import Stats from "./Stats";
import styles from "./index.module.css";

const StatsDialog = memo(() => {
  const { gameStatsAtom, dialogRef, gameResultAtom } =
    useContext(StatsDialogContext);
  const { gameAtom } = useContext(GameContext);

  const gameResult = useAtomValue(gameResultAtom);
  const gameStats = useAtomValue(gameStatsAtom);
  const game = useAtomValue(gameAtom);

  const handleShare = useCallback(() => {}, []);

  const handleReset = useCallback(() => {}, []);

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
            Share
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

      <Stats stats={gameStats} />
    </Dialog>
  );
});

export { StatsDialog };
