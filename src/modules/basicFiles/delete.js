import fsPromises from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const remove = async () => {
  const removeFile = path.join(__dirname, 'files', 'fileToRemove.txt');
  const errorText = 'FS remove operation failed';

  try {
    await fsPromises.rm(removeFile)
      .catch((_) => {
        throw new Error(errorText);
      });
  } catch (error) {
    console.log(error.message);
  }
};

remove();