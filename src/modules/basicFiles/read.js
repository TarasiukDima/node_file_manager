import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');
  const errorText = 'Read operation failed';

  try {
    const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });
    readStream.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
    readStream.on('error', () => {
      throw new Error(errorText);
    });
  } catch (error) {
    console.log(error.message);
  }
};

read();