import { FOLDER_VARIANT } from '../../settings/index.js';
import {
  isFileOrFolderExist,
  getCurrentPathMessage,
  getEmptyPathMessage,
  getFailOperationMessage,
  getNeedPathStr,
} from '../../utils/index.js';

export const cd = async ({ currentDirectoryArr, rootDir, args, sep }) => {
  let newCurrentPathArr = [...currentDirectoryArr];

  try {
    if (!args.length) {
      throw new Error(getEmptyPathMessage('CD'));
    }

    const folderPath = getNeedPathStr(newCurrentPathArr, rootDir, args[0]);

    if (!folderPath) {
      throw new Error(getFailOperationMessage('CD'));
    }


    const isFolderExist = await isFileOrFolderExist(folderPath, FOLDER_VARIANT);

    if (!isFolderExist) {
      throw new Error(getFailOperationMessage('CD'));
    }

    newCurrentPathArr = folderPath.split(sep);
  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(
    getCurrentPathMessage(newCurrentPathArr)
  );
  return newCurrentPathArr;
}