import fsPromises from 'fs/promises';

export const isExistFileOrFolder = async (folderPath) => {
  try {
    await fsPromises.stat(folderPath);
    return true;
  } catch {
    return false;
  }
};
