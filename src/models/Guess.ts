export type Char = {
  char: string;
  isInWord: boolean;
  isInRightIndex: boolean;
};

export type Guess = {
  word: string;
  isCorrect: boolean;
  isNotInWordList?: boolean;
  chars?: Char[];
  message?: string;
};
