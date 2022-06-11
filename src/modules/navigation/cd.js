import { EOL } from 'os';
import { isAbsolute, join } from 'path';
import {
  getCurrentPathMessage,
  isFileOrFolder,
  replaceQuotes,
  validatePath
} from '../../utils/helpers.js';

const showErrorText = (errorText, directoryMessage) => {
  process.stdout.write(errorText);
  process.stdout.write(directoryMessage);
};

export const cd = async ({ currentDirectoryArr, rootDir, args, sep }) => {
  const errorTextEmptyArgs = 'CD operation failed. Need write path' + EOL;
  const errorText = 'CD operation failed.' + EOL;
  const currentDirectoryMessage = getCurrentPathMessage(currentDirectoryArr);

  if (!args.length) {
    showErrorText(errorTextEmptyArgs, currentDirectoryMessage);
    return currentDirectoryArr;
  }

  const pathFromArg = replaceQuotes(args[0] || '');
  const isAbsolutePath = isAbsolute(pathFromArg);
  let newCurrentPathArr = [...currentDirectoryArr];

  let folderPath;

  if (isAbsolutePath) {
    folderPath = validatePath(pathFromArg, rootDir);
  } else {
    folderPath = join(...newCurrentPathArr, pathFromArg);
  }

  if (!folderPath) {
    showErrorText(errorText, currentDirectoryMessage);
    return currentDirectoryArr;
  }

  const isFileOrFolderExist = await isFileOrFolder(folderPath);
  console.log('isFileOrFolderExist', isFileOrFolderExist);

  if (!isFileOrFolderExist || isFileOrFolderExist.data === 'file') {
    showErrorText(errorText, currentDirectoryMessage);
    return currentDirectoryArr;
  }

  newCurrentPathArr = folderPath.split(sep);

  process.stdout.write(
    getCurrentPathMessage(newCurrentPathArr)
  );
  return newCurrentPathArr;
}