import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const rn = async () => {
  // const fileBadName = path.join(__dirname, 'files', 'wrongFilename.txt');
  // const fileGoodName = path.join(__dirname, 'files', 'properFilename.md');
  // const errorText = 'FS rename operation failed';
  // const hasBadFile = await isExistFileOrFolder(fileBadName);
  // const hasGoodFile = await isExistFileOrFolder(fileGoodName);

  // try {
  //   if (hasBadFile && !hasGoodFile) {
  //     fs.rename(fileBadName, fileGoodName, () => { })
  //   } else {
  //     throw new Error(errorText);
  //   }
  // } catch (error) {
  //   console.log(error.message);
  // }
};
