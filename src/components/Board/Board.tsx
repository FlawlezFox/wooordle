import { useCallback, useContext, useEffect, useRef } from "react";
import styles from "./index.module.css";
import Row from "./Row";
import { useWindowEventListener } from "src/hooks";
import { GameContext } from "../Root";
import { useAtom } from "jotai";

const Board = () => {
  const { charsAtom } = useContext(GameContext);
  const [chars, setChars] = useAtom(charsAtom);
  const indexRef = useRef(0);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const exp = /^[a-zA-Z]$/;
      const key = event.key;
      if (exp.test(key) && indexRef.current < 5) {
        indexRef.current++;
        setChars((prev) => [
          ...prev,
          { char: key, isInRightIndex: false, isInWord: false },
        ]);
      } else if (key.includes("Backspace") && indexRef.current > 0) {
        indexRef.current--;
        setChars((prev) => prev.filter((_c, i) => i !== indexRef.current));
      } else if (key.includes("Enter") && indexRef.current === 5) {
        console.log(chars);
      }
    },
    [chars, setChars]
  );

  useEffect(() => console.log(chars), [chars]);

  useWindowEventListener("keydown", handleKeyDown);

  return (
    <div className={styles.board}>
      <Row length={5} />
    </div>
  );
};

export default Board;
