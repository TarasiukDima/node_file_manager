import fsPromises from 'fs/promises';
import {
  isFileOrFolderExist,
  getCurrentPathMessage,
  getEmptyPathMessage,
  getFailOperationMessage,
  getNeedPathStr,
} from '../../utils/index.js';
import { FILE_VARIANT } from '../../settings/index.js';


export const rm = async ({ currentDirectoryArr, rootDir, args }) => {
  try {
    if (!args.length) {
      throw new Error(getEmptyPathMessage('Remove'));
    }

    const pathFileForRemove = getNeedPathStr(currentDirectoryArr, rootDir, args[0]);

    if (!pathFileForRemove) {
      throw new Error(getFailOperationMessage('Remove'));
    }

    const isFileExist = await isFileOrFolderExist(pathFileForRemove, FILE_VARIANT);

    if (!isFileExist) {
      throw new Error(getFailOperationMessage('Remove'));
    }

    await fsPromises.rm(pathFileForRemove)
      .catch((_) => {
        throw new Error(errorText);
      });
  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(
    getCurrentPathMessage(currentDirectoryArr)
  );
};
