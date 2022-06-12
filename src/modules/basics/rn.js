import { rename } from 'fs';
import { FILE_VARIANT } from '../../settings/index.js';
import {
  getCurrentPathMessage,
  getEmptyPathMessage,
  getFailOperationMessage,
  getNeedPathStr,
  isFileOrFolderExist,
} from '../../utils/index.js';

export const rn = async ({ currentDirectoryArr, rootDir, args }) => {
  try {
    if (args.length < 2) {
      throw new Error(getEmptyPathMessage('Rename'));
    }

    const pathFileForRename = getNeedPathStr(currentDirectoryArr, rootDir, args[0]);
    const pathNewFile = getNeedPathStr(currentDirectoryArr, rootDir, args[1]);

    if (!pathFileForRename) {
      throw new Error(getFailOperationMessage('Rename'));
    }

    const isFileExist = await isFileOrFolderExist(pathFileForRename, FILE_VARIANT);

    if (!isFileExist) {
      throw new Error(getFailOperationMessage('Rename'));
    }

    rename(pathFileForRename, pathNewFile, (err) => {
      if (err) {
        throw new Error(getFailOperationMessage('Rename'));
      }
    });
  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(
    getCurrentPathMessage(currentDirectoryArr)
  );
};
