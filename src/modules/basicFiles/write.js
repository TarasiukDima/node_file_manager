import fs from 'fs';
import readline from 'readline';
import process from 'process';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const write = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');
  const writeStream = fs.createWriteStream(filePath, { flags: 'a' });
  const startWriteText = 'Write something, please!\n';
  const endWriteText = 'The end!';

  const lineRead = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: startWriteText,
  });

  lineRead.prompt();

  lineRead.on('line', (input) => {
    (input.trim() == 'exit')
      ? lineRead.close()
      : writeStream.write(input + '\n');
  });

  lineRead.on('SIGINT', () => lineRead.close());

  lineRead.on('close', () => {
    process.stdout.write(endWriteText);
    writeStream.end();
  });
};

write();
