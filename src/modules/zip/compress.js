import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { isExistFileOrFolder } from '../utils/helpers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const compress = async () => {
  const fileForZipPath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const fileZipPath = path.join(__dirname, 'files', 'fileToCompress.txt.gz');
  const errorText = 'Zip operation failed';
  const hasFile = await isExistFileOrFolder(fileForZipPath);

  try {
    if (hasFile) {
      const zipFile = fs.createWriteStream(fileZipPath);
      const fileForZip = fs.createReadStream(fileForZipPath);
      const gzip = zlib.createGzip();

      pipeline(fileForZip, gzip, zipFile, (err) => {
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

compress();