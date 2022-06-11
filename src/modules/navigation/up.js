import { EOL } from 'os';
import { getCurrentPathMessage } from '../../utils/helpers.js';

export const up = (currentDirectoryArr, rootDir) => {
  const newCurrentPathArr = [...currentDirectoryArr];
  const errorText = 'UP operation failed' + EOL;
  const lastEll = newCurrentPathArr[newCurrentPathArr.length - 1];
  if (
    newCurrentPathArr.length <= 1
    || rootDir.startsWith(lastEll)
  ) {
    process.stdout.write(errorText);
  } else {
    newCurrentPathArr.pop();
  }

  const currentDirectoryMessage = getCurrentPathMessage(newCurrentPathArr);
  process.stdout.write(currentDirectoryMessage);
  return newCurrentPathArr;
}