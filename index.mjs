import Solver, { bestWord } from "./Solver.mjs";
import { check, dictionary } from "./utils.mjs";

let solution = process.argv[2];
if (!dictionary.includes(solution)) {
  throw new Error(`${solution} is not a valid word`);
}

const startWord = dictionary.reduce(bestWord);
const solver = new Solver({
  startWord,
  dict: dictionary,
  checkWord: check(solution),
});
solver.solve();
solver.print();
