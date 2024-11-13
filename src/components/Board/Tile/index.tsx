import { memo, useContext, useEffect, useMemo, useState } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import { GameContext, Text } from "src/components";
import { useAtomValue } from "jotai";
import { Char } from "src/models";

type Props = {
  char?: string;
  index: number;
  isInWord?: boolean;
  isInRightIndex?: boolean;
  isSubmitted?: boolean;
  isMany?: boolean;
  isManyInGuess?: boolean;
  isFirstOccurrence?: boolean;
};

const Tile = (props: Props) => {
  const { guessesAtom } = useContext(GameContext);
  const guesses = useAtomValue(guessesAtom);
  const [sameLetters, setSameLetters] = useState<Char[]>([]);

  useEffect(() => {
    setSameLetters([
      ...(guesses.at(props.index)?.chars?.filter((c) => c.isManyInGuess) ?? []),
    ]);
  }, [guesses]);

  const isSameLetterInRightIndex = useMemo(() => {
    return (
      sameLetters && !!sameLetters.filter((sl) => sl.isInRightIndex).length
    );
  }, [sameLetters]);

  const tileClassName = classNames(
    styles.tile,

    props.isInWord && !props.isInRightIndex && styles.letterInWord,

    props.isInRightIndex && styles.letterInRightIndex,

    props.isInWord === false && props.isSubmitted && styles.letterNotInWord,

    props.isFirstOccurrence === false &&
      props.isMany === false &&
      props.isManyInGuess &&
      !props.isInRightIndex &&
      styles.letterNotInWord,

    isSameLetterInRightIndex &&
      props.isMany === false &&
      props.isManyInGuess &&
      !props.isInRightIndex &&
      styles.letterNotInWord
  );

  return (
    <div className={tileClassName}>
      {props.char && (
        <Text variant="large" fontWeight="600">
          {props.char.toUpperCase()}
        </Text>
      )}
    </div>
  );
};

export default memo(Tile);
