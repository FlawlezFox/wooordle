import words from "src/words/words.json";

export class Solution {
  word: string;
  length: number;

  constructor(length: number) {
    // TODO: use different files depending on length
    const randomInt: number = Math.floor(Math.random() * (words.length + 1));
    this.word = words[randomInt].word;
    this.length = length;
  }

  isInDictionary(guess: string) {
    if (words.find((w) => w.word === guess)) {
      return true;
    }

    return false;
  }
}
