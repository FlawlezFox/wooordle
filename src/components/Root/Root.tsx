import { memo } from "react";
import styles from "./index.module.css";
import {
  RulesDialog,
  RulesDialogProvider,
  StatsDialog,
  GameProvider,
  Header,
  Board,
  Keyboard,
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
