import Guess, { Char } from "./Guess";
import { Solution } from "./Solution";

type GameMode = "classic" | "custom";

export class Game {
  readonly DEFAULT_WORD_LENGTH = 5;
  readonly DEFAULT_GAME_MODE: GameMode = "classic";
  readonly DEFAULT_MAX_ATT = 6;

  solution?: Solution;
  gameMode: GameMode;
  attempts?: number;
  maxAttempts: number;
  guesses?: Guess[];

  constructor(wordLength?: number, gameMode?: GameMode, maxAttempts?: number) {
    this.solution = wordLength
      ? new Solution(wordLength)
      : new Solution(this.DEFAULT_WORD_LENGTH);
    this.gameMode = gameMode ?? this.DEFAULT_GAME_MODE;
    this.attempts = 0;
    this.maxAttempts = maxAttempts ?? this.DEFAULT_MAX_ATT;
    this.guesses = [];
  }

  isRightGuess(guess: string) {
    if (!this.solution) {
      return false;
    }

    if (this.attempts === this.maxAttempts) {
      console.log("No more attempts!");
      return false;
    }

    if (!this.solution.isInDictionary(guess)) {
      this.guesses?.push({
        word: guess,
        isCorrect: false,
        isNotInWordList: true,
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

        this.addAttempt();

        this.guesses?.push({
          word: guess,
          isCorrect: false,
          chars: chars,
          message: "Incorrect guess!",
        });

        return false;
      }

      this.addAttempt();

      const chars: Char[] = [];

      for (let i = 0; i < this.solution.word.length; i++) {
        chars.push({ char: guess[i], isInRightIndex: true, isInWord: true });
      }

      this.guesses?.push({
        word: guess,
        chars,
        isCorrect: true,
        message: "You guessed the word",
      });

      return true;
    }
  }

  addAttempt() {
    if (this.attempts === undefined) return;

    if (this.attempts < this.maxAttempts) {
      this.attempts++;
    }

    if (this.attempts === this.maxAttempts) {
      // TODO: set endgame flag
      console.log("Game ended. You have no more attempts");
    }
  }
}
