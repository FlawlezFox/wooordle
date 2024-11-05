import { memo } from "react";
import styles from "./index.module.css";
import Text from "src/components/Text";

type Props = {
  isWin?: boolean;
  solution?: string;
};

const Message = memo((props: Props) => {
  return (
    <div className={styles.Message_container}>
      <div className={styles.Message_emoji}>
        <Text variant="large">{props.isWin ? "🏆" : "❌"}</Text>
        <div
          className={
            props.isWin ? styles.Message_greenBlur : styles.Message_redBlur
          }
        />
      </div>

      <Text variant="medium" fontWeight="600">
        {props.isWin ? "You guessed the word!" : "You lose!"}
      </Text>

      {!!props.solution && (
        <Text variant="default">
          The word was <span className={styles.Message_span}>{props.solution.toUpperCase()}</span>
        </Text>
      )}
    </div>
  );
});

export { Message };
