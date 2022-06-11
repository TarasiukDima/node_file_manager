import { isAbsolute, join } from 'path';
import {
  getCurrentPathMessage,
  isFileOrFolder,
  replaceQuotes,
  validatePath
} from '../../utils/helpers.js';

export const cd = async ({ currentDirectoryArr, rootDir, args, sep }) => {
  const errorTextEmptyArgs = 'CD operation failed. Need write path';
  const errorText = 'CD operation failed.';
  const pathFromArg = replaceQuotes(args[0] || '');
  const isAbsolutePath = isAbsolute(pathFromArg);
  let newCurrentPathArr = [...currentDirectoryArr];
  let folderPath;

  try {
    if (!args.length) {
      throw new Error(errorTextEmptyArgs);
    }

    if (isAbsolutePath) {
      folderPath = validatePath(pathFromArg, rootDir);
    } else {
      folderPath = join(...newCurrentPathArr, pathFromArg);
    }

    if (!folderPath) {
      throw new Error(errorText);
    }

    const isFileOrFolderExist = await isFileOrFolder(folderPath);

    if (!isFileOrFolderExist || isFileOrFolderExist.data === 'file') {
      throw new Error(errorText);
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