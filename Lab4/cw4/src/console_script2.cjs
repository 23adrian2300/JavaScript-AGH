/* eslint-disable no-undef */
/* ********* */
/* CommonsJS */
/* ********* */

const fs = require('fs');
const args = process.argv.slice(2);
const { spawn } = require('child_process');
// const { exec } = require('child_process');
let counter = 0;
const filename = 'counter.txt';

/**
     * Headache
     * @author Adrian
*/
if (args.includes('--async')) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (!err) {
      counter = parseInt(data, 10);
    }
    counter++;
    fs.writeFile(filename, counter.toString(), (err) => {
      if (!err) {
        console.log(`Liczba uruchomień: ${counter}`);
      }
    });
  });
} else if (args.includes('--sync')) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    counter = parseInt(data, 10);
  } catch (err) {
    console.error(err);
  }
  counter++;
  try {
    fs.writeFileSync(filename, counter.toString());
    console.log(`Liczba uruchomień: ${counter}`);
  } catch (err) {
    console.error(err);
  }
} else {
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    const commands = chunk.trim().split(/\r?\n/);
    commands.forEach((command) => {
      const [cmd, ...args] = command.split(' ');
      const proc = spawn(cmd, args, { shell: true });

      proc.stdout.on('data', (data) => {
        console.log(data.toString());
      });

      proc.stderr.on('data', (data) => {
        console.error(data.toString());
      });

      proc.on('close', (code) => {
        console.log(`Proces zakończony z kodem wyjścia ${code}`);
      });
    });
  });

  process.stdin.on('end', () => {
    console.log('Koniec programu.');
  });

  console.log('Wprowadź komendy — naciśnięcie Ctrl+D kończy wprowadzanie danych');
}