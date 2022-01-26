const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const usage = {
  "a": 1691,
  "b": 486,
  "c": 678,
  "d": 853,
  "e": 2010,
  "f": 377,
  "g": 477,
  "h": 570,
  "i": 1155,
  "j": 66,
  "k": 405,
  "l": 1116,
  "m": 571,
  "n": 952,
  "o": 1196,
  "p": 651,
  "q": 40,
  "r": 1370,
  "s": 2001,
  "t": 1094,
  "u": 732,
  "v": 237,
  "w": 368,
  "x": 87,
  "y": 574,
  "z": 65,
};

const scoreWord = (word) => {
    return Array.from(new Set(word.split(""))).reduce((sum, letter) => sum + usage[letter], 0);
};

export const bestWord = (choice, word) => {
  const current = scoreWord(choice);
  const challenger = scoreWord(word);
  return challenger > current ? word : choice;
};

export default class Solver {
    constructor({ startWord = "audio", dict = dictionary, checkWord } = {}) {
      this.startWord = startWord;
      this.exclude = new Set();
      this.include = new Set();
      this.solution = ["", "", "", "", ""];
      this.dictionary = dict;
      this.positionalExclude = [[], [], [], [], []];
      this.results = [];
      this.guesses = [];
      this.checkWord = checkWord;
    }
  
    eligibleLetters(idx) {
      return alphabet.filter((letter) => {
        return !this.exclude.has(letter) &&
          !this.positionalExclude[idx].includes(letter);
      }).join("");
    }
  
    chooseWord() {
      if (this.guesses.length === 0) {
        this.guesses.push(this.startWord);
        return this.startWord;
      }
  
      const regex = new RegExp(
        this.solution.map((letter, idx) => {
          return letter === "" ? `[${this.eligibleLetters(idx)}]` : letter;
        }).join(""),
      );
  
      const word = this.dictionary.filter((word) => {
        return regex.test(word) &&
          Array.from(this.include).every((letter) =>
            word.split("").includes(letter)
          );
      }).reduce((choice, word) => {
          const current = scoreWord(choice);
          const challenger = scoreWord(word);
          return challenger > current ? word : choice;
      }, '');
  
      this.guesses.push(word);
      return word;
    }
  
    handleResult(result) {
      this.results.push(result);
      result.forEach(([letter, score], idx) => {
        if (score === 2) {
          this.solution[idx] = letter;
        } else if (score === 1) {
          this.include.add(letter);
          this.positionalExclude[idx].push(letter);
        } else {
          this.exclude.add(letter);
        }
      });
    }
  
    submit(word) {
      return this.checkWord(word);
    }
  
    guess() {
      return this.handleResult(this.submit(this.chooseWord()));
    }
  
    done() {
      return this.solution.filter((a) => a).length === 5;
    }
  
    solve() {
      while (!this.done()) {
        this.guess();
      }
  
      return this.guesses;
    }
  
    print() {
      const code = ['⬜','🔵','✅'];
      this.results.forEach((line) => {
        const word = line.map(([letter]) => letter).join("")
        const pictogram = line.map(([, score]) => code[score]).join("")
        console.log(`${pictogram} | ${word}`);
      });
    }
  }