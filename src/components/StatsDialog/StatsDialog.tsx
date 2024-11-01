import { memo, useCallback, useContext } from "react";
import Dialog from "../Dialog";
import { StatsDialogContext } from "./Context";
import { Button } from "../Button";

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
            share
          </Button>
          <Button fullWidth variant="outlined" onClick={handleReset}>
            reset
          </Button>
        </>
      }
      onCloseDialog={handleClose}
    >
      <div>Some content here</div>
    </Dialog>
  );
});

export { StatsDialog };
