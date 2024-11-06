import { ButtonHTMLAttributes, memo } from "react";
import styles from "./index.module.css";
import classNames from "classnames";

type Props = {
  variant: "default" | "outlined";
  color?: "green" | "red" | "blue" | "yellow";
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = memo((props: Props) => {
  const { className, variant, color, fullWidth, ...buttonProps } = props;

  const buttonClassName = classNames(
    styles.Button,
    className,
    styles[variant],
    styles[color ?? ""],
    fullWidth && styles.fullWidth
  );

  return (
    <button className={buttonClassName} {...buttonProps}>
      {props.children}
    </button>
  );
});

export { Button };
