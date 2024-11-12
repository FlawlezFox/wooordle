export type Char = {
  char: string;
  isInWord: boolean;
  isInRightIndex: boolean;
  isMany?: boolean;
  isFirstOccurrence?: boolean;
};

export type Guess = {
  word: string;
  isCorrect: boolean;
  chars?: Char[];
  message?: string;
};
