import { Guess, Char } from "./Guess";
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
  isGameEnded?: boolean;

  constructor(wordLength?: number, gameMode?: GameMode, maxAttempts?: number) {
    this.solution = wordLength
      ? new Solution(wordLength)
      : new Solution(this.DEFAULT_WORD_LENGTH);
    this.gameMode = gameMode ?? this.DEFAULT_GAME_MODE;
    this.attempts = 0;
    this.maxAttempts = maxAttempts ?? this.DEFAULT_MAX_ATT;
    this.guesses = [];
    this.isGameEnded = false;
  }

  isRightGuess(guess: string) {
    if (!this.solution) {
      return false;
    }

    if (this.isGameEnded) {
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
                isMany:
                  this.solution.word
                    .split("")
                    .filter((c) => guess[i].startsWith(c)).length > 1,
                isFirstOccurrence: guess.indexOf(guess[i]) === i,
              });

              continue;
            }

            chars.push({
              char: guess[i],
              isInRightIndex: false,
              isInWord: true,
              isMany:
                this.solution.word
                  .split("")
                  .filter((c) => guess[i].startsWith(c)).length > 1,
              isFirstOccurrence: guess.indexOf(guess[i]) === i,
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

      this.isGameEnded = true;

      return true;
    }
  }

  addAttempt() {
    if (this.attempts === undefined) return;

    if (this.attempts < this.maxAttempts) {
      this.attempts++;
    }

    if (this.attempts === this.maxAttempts) {
      this.isGameEnded = true;
    }
  }
}
