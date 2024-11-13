import { memo, useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import { GameContext } from "src/components/Root";
import { useAtomValue } from "jotai";
import { Char } from "src/models";

type Props = {
  children: string;
  onClick?: () => void;
  isBig?: boolean;
};

const Key = (props: Props) => {
  const { guessesAtom, gameAtom } = useContext(GameContext);
  const guesses = useAtomValue(guessesAtom);
  const game = useAtomValue(gameAtom);
  const [submittedChar, setSubmittedChar] = useState<Char>();

  useEffect(() => {
    if (props.children.length > 1) return;

    const guessedChars = guesses
      .at(-1)
      ?.chars?.filter((char) => props.children.includes(char.char));

    const guessedChar =
      guessedChars &&
      (guessedChars.length > 1 && guessedChars.filter(char => char.isInRightIndex)
        ? guessedChars.find(char => char.isInRightIndex)
        : guessedChars[0]);

    if (submittedChar && !submittedChar.isInWord) return;

    if (submittedChar && submittedChar.isInRightIndex) return;

    if (
      submittedChar &&
      !submittedChar.isInRightIndex &&
      !guessedChar?.isInRightIndex &&
      submittedChar.isInWord
    )
      return;

    setSubmittedChar(guessedChar);
  }, [guesses]);

  useEffect(() => {
    setSubmittedChar(undefined);
  }, [game]);

  const keyClassName = classNames(
    styles.Key_button,

    props.isBig && styles.big,

    submittedChar && submittedChar.isInRightIndex && styles.letterInRightIndex,

    submittedChar &&
      !submittedChar.isInRightIndex &&
      submittedChar.isInWord &&
      styles.letterInWord,

    submittedChar &&
      !submittedChar.isInRightIndex &&
      !submittedChar.isInWord &&
      styles.letterNotInWord
  );

  return <button className={keyClassName}>{props.children}</button>;
};

export default memo(Key);
