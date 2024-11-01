import { memo, useCallback, useContext } from "react";
import Dialog from "../Dialog";
import { StatsDialogContext } from "./Context";
import { Button } from "../Button";
import { Message } from "./Message";

const StatsDialog = memo(() => {
  const { dialogRef } = useContext(StatsDialogContext);

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
      <Message isWin solution="Clash"/>
    </Dialog>
  );
});

export { StatsDialog };
