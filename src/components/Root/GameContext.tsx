import { atom, PrimitiveAtom } from "jotai";
import { createContext, memo, useMemo, useState } from "react";
import { Char, Game, Guess } from "src/models";

type GameAtoms = {
  charsAtom: PrimitiveAtom<Char[]>;
  guessesAtom: PrimitiveAtom<Guess[]>;
  gameAtom: PrimitiveAtom<Game>;
};

const initializeAtoms = (): GameAtoms => {
  return {
    charsAtom: atom<Char[]>([]),
    guessesAtom: atom<Guess[]>([]),
    gameAtom: atom<Game>(new Game()),
  };
};

type Props = {
  children: React.ReactNode;
};

type ContextType = GameAtoms;

const GameContext = createContext<ContextType>(
  undefined as unknown as ContextType
);

const GameProvider = memo(({ children }: Props) => {
  const [atoms] = useState(() => initializeAtoms());

  const context = useMemo<GameAtoms>(() => {
    return {
      ...atoms,
    };
  }, [atoms]);

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
});

export { GameContext, GameProvider };
