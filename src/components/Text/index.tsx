import { memo } from "react";
import styles from "./index.module.css";
import classNames from "classnames";

type TextVariant = "default" | "medium" | "large";

type FontWeight = "400" | "500" | "600" | "700";

type Props = {
  children: string;
  variant: TextVariant;
  fontWeight?: FontWeight;
  className?: string;
};

const Text = (props: Props) => {
  const textClassName = classNames(
    styles.text,
    styles[props.variant],
    styles[props.className || ""]
  );

  return (
    <p
      className={textClassName}
      style={{ fontWeight: props.fontWeight || "400" }}
    >
      {props.children}
    </p>
  );
};

export default memo(Text);
