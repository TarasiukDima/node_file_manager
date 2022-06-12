import { createReadStream } from 'fs';
import crypto from 'crypto';
import {
  getCurrentPathMessage,
  getNeedPathStr,
  getEmptyPathMessage,
  getFailOperationMessage,
  getFailOperationEmptyFileMessage,
  isFileOrFolderExist,
} from '../../utils/index.js';
import { FILE_VARIANT } from '../../settings/index.js';

const readStreamOurFile = async (pathFile) => {
  return await new Promise((res, rej) => {
    const readFileStream = createReadStream(pathFile, { encoding: 'utf-8' });
    let hash = '';

    readFileStream.on('data', (data) => {
      hash = crypto.createHash('SHA256').update(data).digest('hex');
    });

    readFileStream.on('end', () => {
      res(hash);
    });

    readFileStream.on('error', () => {
      rej();
    });
  });
}

export const hash = async ({ currentDirectoryArr, rootDir, args }) => {
  let pathHashFileArr = [...currentDirectoryArr];

  try {
    if (!args.length) {
      throw new Error(getEmptyPathMessage('Hash'));
    }

    const fileForHashPathStr = getNeedPathStr(pathHashFileArr, rootDir, args[0]);

    if (!fileForHashPathStr) {
      throw new Error(getFailOperationMessage('Hash'));
    }

    const isFileExist = await isFileOrFolderExist(fileForHashPathStr, FILE_VARIANT);

    if (!isFileExist) {
      throw new Error(getFailOperationMessage('Hash'));
    }

    const hash = await readStreamOurFile(fileForHashPathStr)
      .catch(() => {
        throw new Error(getFailOperationMessage('Hash'));
      });

    if (hash === '') {
      throw new Error(getFailOperationEmptyFileMessage('Hash'));
    }

    console.log(hash);

  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(
    getCurrentPathMessage(currentDirectoryArr)
  );
};
