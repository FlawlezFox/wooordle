import { memo } from "react";
import Header from "../Header";
import styles from "./index.module.css";
import Board from "../Board";
import { GameProvider } from "./GameContext";

const Root = () => {
  return (
    <div className={styles.container}>
      <Header />
      <GameProvider>
        <Board />
      </GameProvider>
    </div>
  );
};

export default memo(Root);
