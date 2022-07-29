export { doCommand } from './commands.js';

export {
  getUserName,
  replaceQuotes,
  parseArgsString,
  checkDoublePaths,
} from './helpers.js';

export {
  getDirname,
  getStartDir,
  isFileOrFolder,
  isFileOrFolderExist,
  validatePath,
  getNeedPathStr,
} from './pathHelpers.js';

export {
  getCurrentPathMessage,
  getEmptyPathMessage,
  getFailOperationMessage,
  getStartMessage,
  getEndMessage,
  getInvalidMessage,
  getFailOperationEmptyFileMessage,
  getFailDecompressExtMessage,
  getFailExtensionFileMessage,
  getFailDoublePathsMessage,
} from './messages.js';