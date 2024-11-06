import { useContext } from "react";
import { StatsDialogContext } from "../Context";
import styles from "./index.module.css";
import { useAtomValue } from "jotai";
import { Text } from "src/components";

const Stats = () => {
  const { gameStatsAtom } = useContext(StatsDialogContext);
  const gameStats = useAtomValue(gameStatsAtom);

  return (
    <ul className={styles.Stats}>
      <li className={styles.Stats_li}>
        <Text variant="medium">🎮 Games played</Text>
        <Text variant="medium" fontWeight="600">
          {gameStats.gamesPlayed}
        </Text>
      </li>

      <li className={styles.Stats_li}>
        <Text variant="medium">🏆 Games won</Text>
        <Text variant="medium" fontWeight="600">
          {gameStats.gamesWon}
        </Text>
      </li>

      <li className={styles.Stats_li}>
        <Text variant="medium">📈 Win %</Text>
        <Text variant="medium" fontWeight="600">
          {isNaN(gameStats.winPercent) ? 0 : gameStats.winPercent}%
        </Text>
      </li>

      <li className={styles.Stats_li}>
        <Text variant="medium">🚀 Current streak</Text>
        <Text variant="medium" fontWeight="600">
          {gameStats.streakCurrent}
        </Text>
      </li>

      <li className={styles.Stats_li}>
        <Text variant="medium">🔥 Max streak</Text>
        <Text variant="medium" fontWeight="600">
          {gameStats.streakMax}
        </Text>
      </li>
    </ul>
  );
};

export default Stats;
