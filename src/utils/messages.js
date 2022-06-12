import { EOL } from 'os';
import { join } from "path";

export const getStartMessage = (userName) => {
  return `Welcome to the File Manager, ${userName}!${EOL}`;
}

export const getEndMessage = (userName) => {
  return `Thank you for using File Manager, ${userName}!${EOL}`;
}

export const getInvalidMessage = () => {
  return 'Invalid input' + EOL;
}

export const getCurrentPathMessage = (pathArr) => {
  const pathFolder = pathArr.length > 1
    ? join(...pathArr)
    : pathArr[0];

  return `You are currently in ${pathFolder + EOL + EOL}`;
}

export const getEmptyPathMessage = (operationName) => {
  return `${operationName} operation failed. Need write path.`;
}

export const getFailOperationMessage = (operationName) => {
  return `${operationName} operation failed.`;
}

export const getFailOperationEmptyFileMessage = (operationName) => {
  return `${operationName} operation failed. Empty file.`;
}

export const getFailDecompressExtMessage = () => {
  return 'Decompress operation failed. Only files with br extension.';
}

export const getFailExtensionFileMessage = () => {
  return 'Add operation failed. Files must contain extension.';
}

export const getFailDoublePathsMessage = (operationName) => {
  return `${operationName} operation failed. Need different paths.`;
}

