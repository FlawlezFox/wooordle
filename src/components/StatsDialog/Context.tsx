import { atom, PrimitiveAtom, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  createContext,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

export type GameStats = {
  gamesPlayed: number;
  gamesWon: number;
  winPercent: number;
  streakCurrent: number;
  streakMax: number;
};
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

const gameStatsAtom = atomWithStorage<GameStats>("gameStats", {
  gamesPlayed: 0,
  gamesWon: 0,
  winPercent: 0,
  streakCurrent: 0,
  streakMax: 0,
});

type ContextType = ContextAtoms & {
  dialogRef: React.RefObject<HTMLDialogElement>;
  showStatsDialog: ShowDialog;
  gameStatsAtom: typeof gameStatsAtom;
};

const Context = createContext<ContextType>(undefined as unknown as ContextType);

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

const Provider = memo(({ children }: Props) => {
  const [atoms] = useState(() => initAtoms());
  const dialogRef = useRef<HTMLDialogElement>(null);

  const setGameResult = useSetAtom(atoms.gameResultAtom);
  const setGameStats = useSetAtom(gameStatsAtom);

  const updateGameStats = useCallback(
    (gameResult: GameResult) => {
      if (gameResult) {
        setGameStats((prev) => ({
          ...prev,
          gamesPlayed: ++prev.gamesPlayed,
        }));
      }

      if (gameResult === "win") {
        setGameStats((prev) => {
          if (prev.streakCurrent >= prev.streakMax) {
            return {
              ...prev,
              gamesWon: ++prev.gamesWon,
              winPercent:
                Math.round((prev.gamesWon / prev.gamesPlayed) * 100) ?? 0,
              streakCurrent: ++prev.streakCurrent,
              streakMax: prev.streakCurrent,
            };
          }

          if (prev.streakCurrent < prev.streakMax) {
            return {
              ...prev,
              gamesWon: ++prev.gamesWon,
              winPercent:
                Math.round((prev.gamesWon / prev.gamesPlayed) * 100) ?? 0,
              streakCurrent: ++prev.streakCurrent,
            };
          }

          return {
            ...prev,
            gamesWon: ++prev.gamesWon,
            winPercent:
              Math.round((prev.gamesWon / prev.gamesPlayed) * 100) ?? 0,
          };
        });
      } else if (gameResult === "lose") {
        setGameStats((prev) => ({
          ...prev,
          winPercent: Math.round((prev.gamesWon / prev.gamesPlayed) * 100) ?? 0,
          streakCurrent: 0,
        }));
      }
    },
    [setGameStats]
  );

  const showStatsDialog = useCallback<ShowDialog>(
    (p: { gameResult?: GameResult }) => {
      if (dialogRef.current) {
        dialogRef.current.showModal();

        updateGameStats(p?.gameResult);
      }

      if (p?.gameResult) {
        setGameResult(p.gameResult);
      }
    },
    [setGameResult, updateGameStats]
  );

  const context = useMemo(() => {
    return {
      ...atoms,
      dialogRef,
      showStatsDialog,
      gameStatsAtom,
    };
  }, [atoms, showStatsDialog]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
});

export { Context as StatsDialogContext, Provider as StatsDialogProvider };
