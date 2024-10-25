export type Char = {
  char: string;
  isInWord: boolean;
  isInRightIndex: boolean;
}

type Guess = {
  word: string;
  isCorrect: boolean;
  chars?: Char[];
  message?: string;
}

export default Guess;