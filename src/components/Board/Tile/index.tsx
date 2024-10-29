import { memo } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import Text from "src/components/Text";

type Props = {
  char?: string;
  isInWord?: boolean;
  isInRightIndex?: boolean;
};

const Tile = (props: Props) => {
  const tileClassName = classNames(
    styles.tile,
    props.isInWord && styles.letterInWord,
    props.isInRightIndex && styles.letterInRightIndex
  );

  return (
    <div className={tileClassName}>
      {props.char && (
        <Text variant="large" fontWeight="600">
          {props.char.toUpperCase()}
        </Text>
      )}
    </div>
  );
};

export default memo(Tile);
