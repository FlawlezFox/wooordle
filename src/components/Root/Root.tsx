import { memo } from "react";
import Header from "../Header";
import styles from "./index.module.css";
import Board from "../Board";
import { GameProvider } from "./GameContext";
import Keyboard from "../Keyboard";
import { StatsDialog } from "../StatsDialog";

const Root = () => {
  return (
    <div className={styles.container}>
      <GameProvider>
        <Header />
        <Board />
        <Keyboard />
        <StatsDialog />
      </GameProvider>
    </div>
  );
};

export default memo(Root);
