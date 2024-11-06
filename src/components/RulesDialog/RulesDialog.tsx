import { memo, useCallback, useContext } from "react";
import Dialog from "../Dialog";
import { RulesDialogContext } from "./Context";
import styles from "./index.module.css";

const RulesDialog = memo(() => {
  const { dialogRef } = useContext(RulesDialogContext);

  const handleClose = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [dialogRef]);

  return (
    <Dialog
      ref={dialogRef}
      title="Classic Game Rules"
      onCloseDialog={handleClose}
    >
      <ul className={styles.RulesDialog_ul}>
        <li>Guess the word in 6 tries</li>
        <li>The word is 5 letter long</li>
        <li>
          Color of the tiles shows how close is your guess to the right word
        </li>
      </ul>

      <ul className={styles.RulesDialog_letters}>
        <li>Gray means the word doesn’t contain this letter </li>
        <li>
          Yellow means the word contains this letter, but its not in the right
          place
        </li>
        <li>
          Green means the word contains this letter and it’s in the right place
        </li>
      </ul>
    </Dialog>
  );
});

export { RulesDialog };
