import { memo, useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import Tile from "../Tile";
import { GameContext } from "src/components/Root";
import { useAtomValue } from "jotai";
import { Char } from "src/models";

type Props = {
  isCurrent: boolean;
  index: number;
};

const Row = (props: Props) => {
  const { charsAtom, guessesAtom, gameAtom } = useContext(GameContext);
  const chars = useAtomValue(charsAtom);
  const guesses = useAtomValue(guessesAtom);
  const game = useAtomValue(gameAtom);
  const [submittedWord, setSubmittedWord] = useState<Char[]>();

  useEffect(() => {
    if (game.attempts === undefined) return;

    const guessedChars = guesses.filter((g) => !g.isNotInWordList)[props.index]
      ?.chars;

    setSubmittedWord([...(guessedChars ?? [])]);
  }, [guesses]);

  useEffect(() => console.log(submittedWord), [submittedWord]);

  return (
    <div className={styles.row}>
      {[...Array(game.solution?.length)].map((_v, i) => (
        <Tile
          key={i}
          char={
            props.isCurrent
              ? chars[i]?.char
              : submittedWord && submittedWord[i]?.char
          }
          isInRightIndex={
            props.isCurrent
              ? chars[i]?.isInRightIndex
              : submittedWord && submittedWord[i]?.isInRightIndex
          }
          isInWord={
            props.isCurrent
              ? chars[i]?.isInWord
              : submittedWord && submittedWord[i]?.isInWord
          }
          isSubmitted={!!(submittedWord && submittedWord[i]?.char)}
        />
      ))}
    </div>
  );
};

export default memo(Row);
