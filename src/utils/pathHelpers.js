import fsPromises from 'fs/promises';
import { fileURLToPath } from "url";
import { dirname, sep, parse, isAbsolute, join } from "path";
import { FILE_VARIANT, FOLDER_VARIANT } from '../settings/index.js';

export const getDirname = (metaUrl) => {
  const __filename = fileURLToPath(metaUrl);
  return dirname(__filename);
}

export const getStartDir = (metaUrl) => {
  const startDir = getDirname(metaUrl);
  const rootDir = parse(startDir).root;
  return {
    currentDirectoryArr: startDir.split(sep).slice(0, -1),
    sep,
    rootDir
  };
}

export const isFileOrFolder = async (folderPath) => {
  try {
    const stats = await fsPromises.stat(folderPath);
    if (stats.isFile()) {
      return { data: FILE_VARIANT }
    } else {
      return { data: FOLDER_VARIANT }
    }
  } catch {
    return false;
  }
};

export const isFileOrFolderExist = async (folderPath, variantEl) => {
  const isFileOrFolderExist = await isFileOrFolder(folderPath);

  if (
    !isFileOrFolderExist
    || isFileOrFolderExist.data !== variantEl
  ) {
    return false;
  }

  return true;
};


export const validatePath = (str, rootDir) => {
  const strWithoutDash = str.replaceAll(/\/|\\|\|/g, sep);
  const arrPath = strWithoutDash.split(sep);
  const newArrNotEmptyEl = arrPath.filter((pathEl) => pathEl.length);

  if (!newArrNotEmptyEl.length) return null;
  if (!rootDir.startsWith(newArrNotEmptyEl[0])) {
    newArrNotEmptyEl.unshift(rootDir);
  }
  return newArrNotEmptyEl.join(sep);
};


export const getNeedPathStr = (pathArr, rootDir, argString = '') => {
  const isAbsolutePath = isAbsolute(argString);

  return isAbsolutePath
    ? validatePath(argString, rootDir)
    : join(...pathArr, argString);
};

