import { useContext } from "react";
import { StatsDialogContext } from "../Context";
import styles from "./index.module.css";
import { useAtomValue } from "jotai";

const Stats = () => {
  const { gameStatsAtom } = useContext(StatsDialogContext);
  const gameStats = useAtomValue(gameStatsAtom);

  return (
    <ul className={styles.Stats}>
      <li className={styles.Stats_li}>
        <span className={styles.Stats_title}>🎮 Games played</span>
        <span className={styles.Stats_number}>{gameStats.gamesPlayed}</span>
      </li>

      <li className={styles.Stats_li}>
        <span className={styles.Stats_title}>🏆 Games won</span>
        <span className={styles.Stats_number}>{gameStats.gamesWon}</span>
      </li>

      <li className={styles.Stats_li}>
        <span className={styles.Stats_title}>📈 Win %</span>
        <span className={styles.Stats_number}>
          {isNaN(gameStats.winPercent) ? 0 : gameStats.winPercent}
        </span>
      </li>

      <li className={styles.Stats_li}>
        <span className={styles.Stats_title}>🚀 Current streak</span>
        <span className={styles.Stats_number}>{gameStats.streakCurrent}</span>
      </li>

      <li className={styles.Stats_li}>
        <span className={styles.Stats_title}>🔥 Max streak</span>
        <span className={styles.Stats_number}>{gameStats.streakMax}</span>
      </li>
    </ul>
  );
};

export default Stats;
