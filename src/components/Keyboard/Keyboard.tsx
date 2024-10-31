import { useCallback } from "react";
import styles from "./index.module.css";
import Key from "./Key";
import rows from "./keys.json";

const Keyboard = () => {
  const handleClickKey = useCallback((event) => {
    if (!event.target.matches("BUTTON")) return;

    const key: string = event.target.innerHTML.includes("delete")
      ? "Backspace"
      : event.target.innerHTML.includes("enter")
      ? "Enter"
      : event.target.innerHTML;
    const keyEvent = new KeyboardEvent("keydown", { key: key });
    window.dispatchEvent(keyEvent);
  }, []);

  return (
    <div className={styles.Keyboard_container} onClick={handleClickKey}>
      {rows.map((row, i) => (
        <div key={i} className={styles.Keyboard_row}>
          {row.row.map((key) => (
            <Key key={key.key} isBig={key.key.length > 1}>
              {key.name ? key.name : key.key}
            </Key>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
