import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { isExistFileOrFolder } from '../utils/helpers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const create = async () => {
  const newFilePath = path.join(__dirname, 'files', 'fresh.txt');
  const content = 'I am fresh and young';
  const errorText = 'FS create operation failed';
  const hasFile = await isExistFileOrFolder(newFilePath);

  try {
    if (hasFile) {
      throw new Error(errorText);
    } else {
      fs.writeFile(newFilePath, content, 'utf8', (errorWrite) => {
        if (errorWrite) {
          throw new Error(errorText)
        };
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

create();