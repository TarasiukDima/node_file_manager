import fsPromises from 'fs/promises';
import { join } from 'path';
import {
  getCurrentPathMessage,
  getFailOperationMessage,
} from '../../utils/index.js';

export const ls = async (currentDirectoryArr, rootDir) => {
  const lastEll = currentDirectoryArr[currentDirectoryArr.length - 1];
  let readFolder;

  if (
    currentDirectoryArr.length <= 1
    || rootDir.startsWith(lastEll)
  ) {
    readFolder = rootDir;
  } else {
    readFolder = join(...currentDirectoryArr);
  }

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
        throw new Error(getFailOperationMessage('LS'));
      });
  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(
    getCurrentPathMessage(currentDirectoryArr)
  );
};