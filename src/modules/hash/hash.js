import { createReadStream } from 'fs';
import { isAbsolute, join } from 'path';
import crypto from 'crypto';
import {
  getCurrentPathMessage,
  isFileOrFolder,
  replaceQuotes,
  validatePath
} from '../../utils/helpers.js';
import { FOLDER_VARIANT } from '../../settings/index.js';

export const hash = async ({ currentDirectoryArr, rootDir, args }) => {
  const errorText = 'Hash operation failed.';
  const pathFromArg = replaceQuotes(args[0] || '');
  const isAbsolutePath = isAbsolute(pathFromArg);
  let pathHashFile = [...currentDirectoryArr];
  let folderPath;

  try {
    if (!args.length) {
      throw new Error(errorTextEmptyArgs);
    }

    if (isAbsolutePath) {
      folderPath = validatePath(pathFromArg, rootDir);
    } else {
      folderPath = join(...pathHashFile, pathFromArg);
    }

    if (!folderPath) {
      throw new Error(errorText);
    }

    const isFileOrFolderExist = await isFileOrFolder(folderPath);
    if (!isFileOrFolderExist || isFileOrFolderExist.data === FOLDER_VARIANT) {
      throw new Error(errorText);
    }

    const readFileStream = createReadStream(folderPath, { encoding: 'utf-8' });
    let hash = '';

    readFileStream.on('data', (data) => {
      hash = crypto.createHash('SHA256').update(data).digest('hex');
    });

    readFileStream.on('end', () => {
      console.log(hash);
    });

    readFileStream.on('error', () => {
      throw new Error(errorText);
    });

  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(
    getCurrentPathMessage(currentDirectoryArr)
  );
};
