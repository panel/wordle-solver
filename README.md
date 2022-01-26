# Simple Wordle Solver

This is a basic solver for [wordle](https://www.powerlanguage.co.uk/wordle/) puzzles.
I really don't want to use a machine to improve my Wordle score, so it is designed
for me to check if my human intuition is better or worse than my programming skills.

My general use of this will be to solve the puzzle then use that answer to see how
fast the computer gets it.

## How to build
... you don't really need to. This really isn't tested, but I've validated that it
works with `node>=16.0`

## How to run
I run it on the command line with the command `node index.mjs {word}` for example:

```sh
> node index.mjs fancy
🔵⬜⬜⬜⬜ | arose
⬜✅⬜⬜🔵 | latin
🔵✅✅⬜✅ | candy
✅✅✅✅✅ | fancy
```

If you submit a word that isn't in the dictionary (the guesser will never guess it),
you will get an exeception. For exampe:

```sh
node index.mjs fancj
file:///Users/paulnelson/repos/wordle-solver/index.mjs:6
  throw new Error(`${solution} is not a valid word`);
        ^

Error: fancj is not a valid word
    at file:///Users/paulnelson/repos/wordle-solver/index.mjs:6:9
```
