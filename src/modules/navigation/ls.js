import fsPromises from 'fs/promises';
import path from 'path';
import { getCurrentPathMessage } from '../../utils/helpers.js';

export const ls = async (currentDirectoryArr, rootDir) => {
  const errorText = 'LS operation failed';
  const currentDirectoryMessage = getCurrentPathMessage(currentDirectoryArr);
  const lastEll = currentDirectoryArr[currentDirectoryArr.length - 1];
  let readFolder;

  if (
    currentDirectoryArr.length <= 1
    || rootDir.startsWith(lastEll)
  ) {
    readFolder = rootDir;
  } else {
    readFolder = path.join(...currentDirectoryArr);
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
        throw new Error(errorText);
      });
  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(currentDirectoryMessage);
};