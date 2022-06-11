import fsPromises from 'fs/promises';
import os from 'os';
import { fileURLToPath } from "url";
import { dirname, sep, parse, join } from "path";

export const isExistFileOrFolder = async (folderPath) => {
  try {
    await fsPromises.stat(folderPath);
    return true;
  } catch {
    return false;
  }
};

export const isFileOrFolder = async (folderPath) => {
  try {
    const stats = await fsPromises.stat(folderPath);
    if (stats.isFile()) {
      return {data: 'file'}
    } else {
      return {data: 'folder'}
    }
  } catch {
    return false;
  }
};


export function getDirname(metaUrl) {
  const __filename = fileURLToPath(metaUrl);
  return dirname(__filename);
}

export function getStartDir(metaUrl) {
  const startDir = getDirname(metaUrl);
  const rootDir = parse(startDir).root;
  return {
    currentDirectoryArr: startDir.split(sep).slice(0, -1),
    sep,
    rootDir
  };
}

// export function getPathStringFromArr(arr, sep) {
//   return arr.join(sep);
// }

export function getCurrentPathMessage(pathArr) {
  const pathFolder = pathArr.length > 1
    ? join(...pathArr)
    : pathArr[0];

  return `You are currently in ${pathFolder + os.EOL + os.EOL}`;
}

export const getUserName = (args) => {
  const argsArray = args.slice(2);
  const startUserArgString = '--username=';
  const userName = [];

  argsArray.forEach((arg) => {
    if (arg.startsWith(startUserArgString)) {
      userName.push(arg.slice(startUserArgString.length));
    } else {
      userName.push(arg);
    }
  })
  return userName.join(' ');
};


export const replaceQuotes = (str) => {
  let newStr = str.trim();
  const arrQuotes = ['\'', '\"'];

  if (arrQuotes.includes(newStr[0])) {
    newStr = newStr.slice(1);
  }
  if (arrQuotes.includes(newStr[newStr.length - 1])) {
    newStr = newStr.slice(0, -1);
  }
  return newStr;
};



export const validatePath = (str, rootDir) => {
  const strWithoutDash = str.replaceAll('/', sep);
  const arrPath = strWithoutDash.split(sep);
  const newArrNotEmptyEl = arrPath.filter((pathEl) => pathEl.length);

  if (!newArrNotEmptyEl.length) return;

  console.log(newArrNotEmptyEl, sep);
  if (!rootDir.startsWith(newArrNotEmptyEl[0])) {
    newArrNotEmptyEl.unshift(rootDir);
  }
  console.log('newStr', newArrNotEmptyEl);
  return newArrNotEmptyEl.join(sep);
};
