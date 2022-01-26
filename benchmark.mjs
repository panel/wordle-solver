import { createWriteStream } from "fs";
import { dictionary, check } from "./utils.mjs";
import Solver from "./Solver.mjs";

const toughWords = createWriteStream('toughWords.txt');

const performance = dictionary.reduce((counts, word) => {
  const solver = new Solver({ dict: dictionary, checkWord: check(word) });
  solver.solve();
  const guessCount = solver.guesses.length;
  counts[guessCount] = (counts[guessCount] || 0) + 1;
  if (guessCount > 6) {
    toughWords.write(`${word} (${guessCount})\n`);
  }
  return counts
}, {});

toughWords.close();

console.log(performance);