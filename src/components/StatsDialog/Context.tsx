import { atom, PrimitiveAtom, useSetAtom } from "jotai";
import {
  createContext,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

type GameResult = "win" | "lose" | null | undefined;
type ShowDialog = (p: { gameResult?: GameResult }) => void;

type ContextAtoms = {
  gameResultAtom: PrimitiveAtom<GameResult>;
};

const initAtoms = (): ContextAtoms => {
  return {
    gameResultAtom: atom<GameResult>(),
  };
};

type ContextType = ContextAtoms & {
  dialogRef: React.RefObject<HTMLDialogElement>;
  showStatsDialog: ShowDialog;
};

const Context = createContext<ContextType>(undefined as unknown as ContextType);

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

const Provider = memo(({ children }: Props) => {
  const [atoms] = useState(() => initAtoms());
  const dialogRef = useRef<HTMLDialogElement>(null);

  const setGameResult = useSetAtom(atoms.gameResultAtom);

  const showStatsDialog = useCallback<ShowDialog>(
    (p: { gameResult?: GameResult }) => {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }

      if (p.gameResult) {
        setGameResult(p.gameResult);
      }
    },
    [setGameResult]
  );

  const context = useMemo(() => {
    return {
      ...atoms,
      dialogRef,
      showStatsDialog,
    };
  }, [atoms, showStatsDialog]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
});

export { Context as StatsDialogContext, Provider as StatsDialogProvider };
