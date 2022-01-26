import { readFile } from "fs/promises";

export const dictionary = await readFile("fiveLetterWords.txt", "utf8").then((
  data,
) => data.split("\n"));

export const check = (solution) =>
  (word) => {
    if (!dictionary.includes(word)) {
      throw new Error(`${word} is not a valid word`);
    }

    return word.split("").map((letter, index) => {
      if (letter === solution[index]) {
        return [letter, 2];
      }

      if (solution.split("").includes(letter)) {
        return [letter, 1];
      }

      return [letter, 0];
    });
  };
