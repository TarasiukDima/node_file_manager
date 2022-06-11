import fsPromises from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const list = async () => {
  const readFolder = path.join(__dirname, 'files');
  const errorText = 'FS list operation failed';

  try {
    await fsPromises.readdir(readFolder, { withFileTypes: true })
      .then((data) => {
        const filesNameArray = [];

        data.forEach((el) => {
          filesNameArray.push(el.name);
        });

        console.log(filesNameArray);
      })
      .catch((_) => {
        throw new Error(errorText);
      });
  } catch (error) {
    console.log(error.message);
  }
};

list();