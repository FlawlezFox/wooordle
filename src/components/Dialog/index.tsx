import React, {
  DialogHTMLAttributes,
  ForwardedRef,
  forwardRef,
  memo,
} from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import Text from "../Text";
import IconButton from "../IconButton";
import CloseIcon from "src/assets/close.svg?react";

interface Props extends DialogHTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactElement;
  onCloseDialog?: () => void;
}

const Dialog = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLDialogElement>) => {
    const {
      className,
      children,
      title,
      actions,
      onCloseDialog,
      ...dialogProps
    } = props;
    const dialogClassName = classNames(styles.Dialog, className);

    return (
      <dialog ref={ref} className={dialogClassName} {...dialogProps}>
        <div className={styles.Dialog_title}>
          <Text variant="large" fontWeight="600">
            {title}
          </Text>

          <IconButton onClick={onCloseDialog}>
            <CloseIcon className={styles.Dialog_closeIcon} />
          </IconButton>
        </div>

        <div className={styles.Dialog_content}>{children}</div>

        {actions && <div className={styles.Dialog_actions}>{actions}</div>}
      </dialog>
    );
  }
);

export default memo(Dialog);
