import { createReadStream, writeFileSync } from 'fs';
import { createInterface } from 'readline';
const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
const lines = createInterface(createReadStream('fiveLetterWords.txt'));
const map = alphabet.reduce((acc, letter) => {
    acc[letter] = 0;
    return acc;
}, {})

lines.on('line', line => {
    alphabet.forEach(letter => {
        if (line.split('').includes(letter)) {
            map[letter]++;
        }
    });
});

lines.on('close', () => writeFileSync('usage.json', JSON.stringify(map)));