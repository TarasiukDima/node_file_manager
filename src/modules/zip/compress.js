import {
  createReadStream,
  createWriteStream,
} from 'fs';
import {
  join,
  parse,
} from 'path';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream';
import {
  getCurrentPathMessage,
  getEmptyPathMessage,
  getFailOperationMessage,
  getNeedPathStr,
  isFileOrFolderExist,
} from '../../utils/index.js';
import {
  FILE_VARIANT,
  FOLDER_VARIANT,
} from '../../settings/index.js';


export const compress = async ({ currentDirectoryArr, rootDir, args }) => {
  try {
    if (!args.length) {
      throw new Error(getEmptyPathMessage('Compress'));
    }

    const pathFileForZip = getNeedPathStr(currentDirectoryArr, rootDir, args[0]);
    const pathFolderForZipFile = getNeedPathStr(currentDirectoryArr, rootDir, args[1]);

    if (!pathFileForZip || !pathFolderForZipFile) {
      throw new Error(getFailOperationMessage('Compress'));
    }

    const isFileForZipExist = await isFileOrFolderExist(pathFileForZip, FILE_VARIANT);
    const isFolderForZipExist = await isFileOrFolderExist(pathFolderForZipFile, FOLDER_VARIANT);

    if (!isFileForZipExist || !isFolderForZipExist) {
      throw new Error(getFailOperationMessage('Compress'));
    }

    const fileForZip = createReadStream(pathFileForZip);
    const { base } = parse(pathFileForZip);
    const fullPathForZipFile = join(pathFolderForZipFile, `${base}.br`)
    const zipFile = createWriteStream(fullPathForZipFile);
    const brotliCompress = createBrotliCompress();

    pipeline(fileForZip, brotliCompress, zipFile, (err) => {
      if (err) {
        throw new Error(getFailOperationMessage('Compress'));
      }
    });
  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(
    getCurrentPathMessage(currentDirectoryArr)
  );
};
