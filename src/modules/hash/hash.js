import fsPromises from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const calculateHash = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const errorText = 'Hash operation failed';

  try {
    await fsPromises.readFile(filePath, { encoding: 'utf-8' })
      .then((data) => {
        const hash = crypto.createHash('SHA256').update(data).digest('hex');
        console.log(hash);
      })
      .catch((_) => {
        throw new Error(errorText);
      })
  } catch (error) {
    console.log(error.message);
  }
};

calculateHash();