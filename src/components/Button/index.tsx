import { ButtonHTMLAttributes, memo } from "react";
import styles from "./index.module.css";
import classNames from "classnames";

type Props = {
  variant: "default" | "outlined";
  color?: "green" | "red" | "blue" | "yellow";
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = memo((props: Props) => {
  const buttonClassName = classNames(
    styles.Button,
    props.className,
    styles[props.variant],
    styles[props.color ?? ""],
    props.fullWidth && styles.fullWidth
  );
  return (
    <button className={buttonClassName} {...props}>
      {props.children}
    </button>
  );
});

export { Button };
