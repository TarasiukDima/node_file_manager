import { writeFile } from 'fs/promises';
import { parse } from 'path';
import {
  getCurrentPathMessage,
  getEmptyPathMessage,
  getFailExtensionFileMessage,
  getFailOperationMessage,
  getNeedPathStr,
  isFileOrFolderExist,
} from '../../utils/index.js';
import { FOLDER_VARIANT } from '../../settings/index.js';

export const add = async ({ currentDirectoryArr, rootDir, args }) => {
  try {
    if (!args.length) {
      throw new Error(getEmptyPathMessage('Add'));
    }

    const pathFileForAdd = getNeedPathStr(currentDirectoryArr, rootDir, args[0]);

    if (!pathFileForAdd) {
      throw new Error(getFailOperationMessage('Add'));
    }

    const { dir, ext } = parse(pathFileForAdd);

    if (!ext) {
      throw new Error(getFailExtensionFileMessage('Add'));
    }

    const isFileExist = await isFileOrFolderExist(dir, FOLDER_VARIANT);

    if (!isFileExist) {
      throw new Error(getFailOperationMessage('Add'));
    }

    await writeFile(pathFileForAdd, '', { flag: 'w', })
      .catch(() => {
        throw new Error(errorText);
      });

  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(
    getCurrentPathMessage(currentDirectoryArr)
  );
};
