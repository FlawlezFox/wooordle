import { createContext, memo, useCallback, useMemo, useRef } from "react";

type ShowDialog = () => void;

type ContextType = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  showRulesDialog: ShowDialog;
};

const Context = createContext<ContextType>(undefined as unknown as ContextType);

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

const Provider = memo(({ children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const showRulesDialog = useCallback<ShowDialog>(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  const context = useMemo(() => {
    return {
      dialogRef,
      showRulesDialog,
    };
  }, [showRulesDialog]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
});

export { Context as RulesDialogContext, Provider as RulesDialogProvider };
