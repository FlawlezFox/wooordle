import classNames from "classnames";
import { memo } from "react";
import styles from "./index.module.css";

export const Link = memo(
  ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const linkClassName = classNames(styles.Link, className);

    return (
      <a className={linkClassName} {...props}>
        {props.children}
      </a>
    );
  }
);
