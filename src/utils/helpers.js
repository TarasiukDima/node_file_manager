import fsPromises from 'fs/promises';
import { fileURLToPath } from "url";
import { dirname, sep } from "path";

export const isExistFileOrFolder = async (folderPath) => {
  try {
    await fsPromises.stat(folderPath);
    return true;
  } catch {
    return false;
  }
};


export function getDirname(metaUrl) {
  const __filename = fileURLToPath(metaUrl);
  return dirname(__filename);
}

export function getStartDirname(metaUrl) {
  return [getDirname(metaUrl).split(sep).slice(0, -1), sep];
}


export const getUserName = (args) => {
  const argsArray = args.slice(2);
  const startUserArgString = '--username=';
  const userName = [];

  console.log(argsArray);
  argsArray.forEach((arg) => {
    if (arg.startsWith(startUserArgString)) {
      userName.push(arg.slice(startUserArgString.length));
    } else {
      userName.push(arg);
    }
  })
  return userName.join(' ');
};