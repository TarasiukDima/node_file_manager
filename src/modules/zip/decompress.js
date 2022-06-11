import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { isExistFileOrFolder } from '../../utils/helpers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const decompress = async () => {
  const zipFilePath = path.join(__dirname, 'files', 'fileToCompress.txt.gz');
  const unzipFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const errorText = 'Unzip operation failed';
  const hasFile = await isExistFileOrFolder(zipFilePath);

  try {
    if (hasFile) {
      const zipReadStream = fs.createReadStream(zipFilePath);
      const unzipWriteStream = fs.createWriteStream(unzipFilePath);
      const unzip = zlib.createGunzip();

      pipeline(zipReadStream, unzip, unzipWriteStream, (err) => {
        if (err) {
          throw new Error(errorText);
        }
      });
    } else {
      throw new Error(errorText);
    }
  } catch (error) {
    console.log(error.message);
  }
};

decompress();