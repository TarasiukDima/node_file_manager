import { createReadStream, createWriteStream } from 'fs';
import { join, parse } from 'path';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import {
  getCurrentPathMessage,
  getEmptyPathMessage,
  getFailDecompressExtMessage,
  getFailOperationMessage,
  getNeedPathStr,
  isFileOrFolderExist,
} from '../../utils/index.js';
import { FILE_VARIANT, FOLDER_VARIANT } from '../../settings/index.js';


export const decompress = async ({ currentDirectoryArr, rootDir, args }) => {
  try {
    if (!args.length) {
      throw new Error(getEmptyPathMessage('Decompress'));
    }

    const pathZipFile = getNeedPathStr(currentDirectoryArr, rootDir, args[0]);
    const pathFolderForUnzip = getNeedPathStr(currentDirectoryArr, rootDir, args[1]);

    if (!pathFolderForUnzip || !pathZipFile) {
      throw new Error(getFailOperationMessage('Decompress'));
    }

    const isFileExist = await isFileOrFolderExist(pathZipFile, FILE_VARIANT);
    const isFolderExist = await isFileOrFolderExist(pathFolderForUnzip, FOLDER_VARIANT);

    if (!isFileExist || !isFolderExist) {
      throw new Error(getFailOperationMessage('Decompress'));
    }

    const { name, ext } = parse(pathZipFile);

    if (ext !== '.br') {
      throw new Error(getFailDecompressExtMessage('Decompress'));
    }

    const zipFile = createReadStream(pathZipFile);
    const fullPathForUnzip = join(pathFolderForUnzip, name);
    const fileForUnzip = createWriteStream(fullPathForUnzip);
    const brotliDecompress = createBrotliDecompress();

    pipeline(zipFile, brotliDecompress, fileForUnzip, (err) => {
      if (err) {
        throw new Error(getFailOperationMessage('Decompress'));
      }
    });
  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(
    getCurrentPathMessage(currentDirectoryArr)
  );
};
