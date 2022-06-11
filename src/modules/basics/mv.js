import fs from 'fs';
import fsPromises from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { isExistFileOrFolder } from '../../utils/helpers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copyDir = (folderPath, newFolderPath) => {
  fsPromises.mkdir(newFolderPath, { recursive: true })
    .then(() => {
      readFolderCopyFiles(folderPath, newFolderPath);
    })
    .catch((_) => {
      throw new Error(errorText);
    });
};

const readFolderCopyFiles = (folderPath, newFolderPath) => {
  fsPromises.readdir(folderPath, { withFileTypes: true })
    .then((filesList) => {
      copyFiles(filesList, folderPath, newFolderPath);
    })
    .catch((_) => {
      throw new Error(errorText);
    });
};

const copyFiles = (filesList, folderPath, newFolderPath) => {
  if (!filesList) return;

  filesList.forEach(oneFile => {
    if (oneFile.isFile()) {
      fs.copyFile(
        path.join(folderPath, oneFile.name),
        path.join(newFolderPath, oneFile.name),
        () => { }
      );
    } else {
      const innerFolderPath = path.join(folderPath, oneFile.name);
      const innerCopyFolderPath = path.join(newFolderPath, oneFile.name);

      fsPromises.mkdir(innerCopyFolderPath, { recursive: true })
        .then(() => {
          readFolderCopyFiles(innerFolderPath, innerCopyFolderPath);
        })
        .catch((_) => {
          throw new Error(errorText);
        });
    }
  });
};

export const mv = async () => {
  const folderPath = path.join(__dirname, 'files');
  const newFolderPath = path.join(__dirname, 'files_copy');
  const errorText = 'FS copy operation failed';
  const hasFilesFolder = await isExistFileOrFolder(folderPath);
  const hasCopyFilesFolder = await isExistFileOrFolder(newFolderPath);

  try {
    if (hasFilesFolder && !hasCopyFilesFolder) {
      copyDir(folderPath, newFolderPath)
    } else {
      throw new Error(errorText);
    }
  } catch (error) {
    console.log(error.message);
  }
};
