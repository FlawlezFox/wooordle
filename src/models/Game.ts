import Guess, { Char } from "./Guess";
import { Solution } from "./Solution";

type GameMode = "classic" | "custom";

export class Game {
  solution?: Solution;
  gameMode: GameMode;
  attempts?: number;
  maxAttempts: number;
  guesses?: Guess[];

  constructor(wordLength: number, gameMode: GameMode, maxAttempts: number) {
    this.solution = new Solution(wordLength);
    this.gameMode = gameMode;
    this.attempts = 0;
    this.maxAttempts = maxAttempts;
    this.guesses = [];
  }

  isRightGuess(guess: string) {
    if (!this.solution) {
      this.guesses?.push({
        word: guess,
        isCorrect: false,
        message: "Solution word was not generated",
      });

      return false;
    }

    if (!this.solution.isInDictionary(guess)) {
      console.log(guess);
      this.guesses?.push({
        word: guess,
        isCorrect: false,
        message: "Your guess is not in the word list",
      });

      return false;
    } else {
      if (!this.solution.word.startsWith(guess)) {
        const chars: Char[] = [];

        for (let i = 0; i < this.solution.word.length; i++) {
          if (this.solution.word.includes(guess[i])) {
            if (guess[i].startsWith(this.solution.word.charAt(i))) {
              chars.push({
                char: guess[i],
                isInRightIndex: true,
                isInWord: true,
              });

              continue;
            }

            chars.push({
              char: guess[i],
              isInRightIndex: false,
              isInWord: true,
            });

            continue;
          } else {
            chars.push({
              char: guess[i],
              isInRightIndex: false,
              isInWord: false,
            });

            continue;
          }
        }

        this.guesses?.push({
          word: guess,
          isCorrect: false,
          chars: chars,
          message: "Incorrect guess!",
        });

        return false;
      }

      this.guesses?.push({
        word: guess,
        isCorrect: true,
        message: "You guessed the word",
      });

      return true;
    }
  }
}
