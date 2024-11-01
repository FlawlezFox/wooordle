import { memo, useCallback, useContext } from "react";
import Dialog from "../Dialog";
import { StatsDialogContext } from "./Context";

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
        <div>
          <button onClick={handleShare}>share</button>
          <button onClick={handleReset}>reset</button>
        </div>
      }
      onCloseDialog={handleClose}
    >
      <div>Some content here</div>
    </Dialog>
  );
});

export { StatsDialog };
