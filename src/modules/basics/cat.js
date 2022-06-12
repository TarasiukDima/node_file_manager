import { createReadStream } from 'fs';
import { EOL } from 'os';
import {
  getCurrentPathMessage,
  getFailOperationMessage,
  getNeedPathStr,
  isFileOrFolderExist,
} from '../../utils/index.js';
import { FILE_VARIANT } from '../../settings/index.js';

const readStreamOurFile = async (pathFile) => {
  return await new Promise((res, rej) => {
    const readFileStream = createReadStream(pathFile, { encoding: 'utf-8' });

    readFileStream.on('data', (data) => {
      process.stdout.write(data);
    });

    readFileStream.on('end', () => {
      process.stdout.write(EOL + EOL);
      res();
    });

    readFileStream.on('error', () => {
      rej();
    });
  });
}

export const cat = async ({ currentDirectoryArr, rootDir, args }) => {
  try {
    if (!args.length) {
      throw new Error(getEmptyPathMessage('Cat'));
    }

    const pathFileForRead = getNeedPathStr(currentDirectoryArr, rootDir, args[0]);

    if (!pathFileForRead) {
      throw new Error(getFailOperationMessage('Cat'));
    }

    const isFileExist = await isFileOrFolderExist(pathFileForRead, FILE_VARIANT);

    if (!isFileExist) {
      throw new Error(getFailOperationMessage('Cat'));
    }


    await readStreamOurFile(pathFileForRead)
      .catch(() => {
        throw new Error(getFailOperationMessage('Cat'));
      });
  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(
    getCurrentPathMessage(currentDirectoryArr)
  );
};
