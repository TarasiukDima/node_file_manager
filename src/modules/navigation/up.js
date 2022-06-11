import { getCurrentPathMessage } from '../../utils/helpers.js';

export const up = (currentDirectoryArr, rootDir) => {
  const newCurrentPathArr = [...currentDirectoryArr];
  const errorText = 'UP operation failed!';
  const lastEll = newCurrentPathArr[newCurrentPathArr.length - 1];

  try {
    if (
      newCurrentPathArr.length <= 1
      || rootDir.startsWith(lastEll)
    ) {
      throw new Error(errorText);
    } else {
      newCurrentPathArr.pop();
    }
  } catch (error) {
    console.log(error.message);
  }

  const currentDirectoryMessage = getCurrentPathMessage(newCurrentPathArr);
  process.stdout.write(currentDirectoryMessage);
  return newCurrentPathArr;
}