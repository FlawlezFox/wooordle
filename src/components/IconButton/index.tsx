import { ButtonHTMLAttributes, memo } from "react";
import styles from "./index.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

const IconButton = (props: Props) => {
  const { children, ...buttonProps } = props;

  return (
    <div className={styles.IconButton_container}>
      <button {...buttonProps}>{children}</button>
    </div>
  );
};

export default memo(IconButton);
