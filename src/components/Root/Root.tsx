import { memo } from "react";
import Header from "../Header";
import styles from "./index.module.css";
import Board from "../Board";
import Keyboard from "../Keyboard";
import {
  RulesDialog,
  RulesDialogProvider,
  StatsDialog,
  GameProvider,
} from "src/components";

const Root = () => {
  return (
    <div className={styles.container}>
      <GameProvider>
        <RulesDialogProvider>
          <Header />
          <RulesDialog />
        </RulesDialogProvider>
        <Board />
        <Keyboard />
        <StatsDialog />
      </GameProvider>
    </div>
  );
};

export default memo(Root);
