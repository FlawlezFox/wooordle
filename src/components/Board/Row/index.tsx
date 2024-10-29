import { memo } from "react";
import styles from "./index.module.css";
import Tile from "../Tile";

type Props = {
  length: number;
};

const Row = (props: Props) => {
  const char = "c";
  // TODO: take the word length from the gameAtom

  return (
    <div className={styles.row}>
      {[...Array(props.length)].map((v, i) => (
        <Tile key={i} char={char} />
      ))}
    </div>
  );
};

export default memo(Row);
