import { GameStats } from "../Context";
import styles from "./index.module.css";

type Props = {
  stats: GameStats;
};

const Stats = (props: Props) => {
  return (
    <ul className={styles.Stats}>
      <li className={styles.Stats_li}>
        <span className={styles.Stats_title}>🎮 Games played</span>
        <span className={styles.Stats_number}>{props.stats.gamesPlayed}</span>
      </li>

      <li className={styles.Stats_li}>
        <span className={styles.Stats_title}>🏆 Games won</span>
        <span className={styles.Stats_number}>{props.stats.gamesWon}</span>
      </li>

      <li className={styles.Stats_li}>
        <span className={styles.Stats_title}>📈 Win %</span>
        <span className={styles.Stats_number}>{props.stats.winPercent}</span>
      </li>

      <li className={styles.Stats_li}>
        <span className={styles.Stats_title}>🚀 Current streak</span>
        <span className={styles.Stats_number}>{props.stats.streakCurrent}</span>
      </li>

      <li className={styles.Stats_li}>
        <span className={styles.Stats_title}>🔥 Max streak</span>
        <span className={styles.Stats_number}>{props.stats.streakMax}</span>
      </li>
    </ul>
  );
};

export default Stats;
