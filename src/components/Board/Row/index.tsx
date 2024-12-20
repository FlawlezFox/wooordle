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
    const guessedChars = guesses[props.index]?.chars;

    setSubmittedWord([...(guessedChars ?? [])]);
  }, [guesses]);

  return (
    <div className={styles.row}>
      {[...Array(game.solution?.length)].map((_v, i) => (
        <Tile
          key={i}
          index={props.index}
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
          isMany={
            props.isCurrent
              ? chars[i]?.isMany
              : submittedWord && submittedWord[i]?.isMany
          }
          isManyInGuess={
            props.isCurrent
              ? chars[i]?.isManyInGuess
              : submittedWord && submittedWord[i]?.isManyInGuess
          }
          isFirstOccurrence={
            props.isCurrent
              ? chars[i]?.isFirstOccurrence
              : submittedWord && submittedWord[i]?.isFirstOccurrence
          }
          isSubmitted={!!(submittedWord && submittedWord[i]?.char)}
        />
      ))}
    </div>
  );
};

export default memo(Row);
