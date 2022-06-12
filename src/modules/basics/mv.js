import { createReadStream, createWriteStream, rm } from 'fs';
import { pipeline } from 'stream';
import { join, parse } from 'path';
import {
  isFileOrFolderExist,
  checkDoublePaths,
  getCurrentPathMessage,
  getEmptyPathMessage,
  getFailDoublePathsMessage,
  getFailOperationMessage,
  getNeedPathStr,
} from '../../utils/index.js';
import { FILE_VARIANT, FOLDER_VARIANT } from '../../settings/index.js';



export const mv = async ({ currentDirectoryArr, rootDir, args }) => {
  try {
    if (args.length < 2) {
      throw new Error(getEmptyPathMessage('Move'));
    }

    const pathFileForCopy = getNeedPathStr(currentDirectoryArr, rootDir, args[0]);
    const pathFolderForCopy = getNeedPathStr(currentDirectoryArr, rootDir, args[1]);

    if (!pathFileForCopy || !pathFolderForCopy) {
      throw new Error(getFailOperationMessage('Move'));
    }

    const isFileExist = await isFileOrFolderExist(pathFileForCopy, FILE_VARIANT);
    const isFolderExist = await isFileOrFolderExist(pathFolderForCopy, FOLDER_VARIANT);

    if (!isFileExist || !isFolderExist) {
      throw new Error(getFailOperationMessage('Move'));
    }

    const {base, dir} = parse(pathFileForCopy);

    if (checkDoublePaths(dir, pathFolderForCopy)) {
      throw new Error(getFailDoublePathsMessage('Move'));
    }

    const readStream = createReadStream(pathFileForCopy);
    const fullPathForNewFile = join(pathFolderForCopy, base);
    const writeStream = createWriteStream(fullPathForNewFile);

    pipeline(readStream, writeStream, (err) => {
      if (err) {
        throw new Error(getFailOperationMessage('Move'));
      } else {
        rm(pathFileForCopy, (error) => {
          if (error) {
            throw new Error(getFailOperationMessage('Move'));
          }
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }


  process.stdout.write(
    getCurrentPathMessage(currentDirectoryArr)
  );
};
