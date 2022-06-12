import {
  getCurrentPathMessage,
  getFailOperationMessage,
} from '../../utils/index.js';

export const up = (currentDirectoryArr, rootDir, errOperationName) => {
  const newCurrentPathArr = [...currentDirectoryArr];
  const lastEll = newCurrentPathArr[newCurrentPathArr.length - 1];

  try {
    if (
      newCurrentPathArr.length <= 1
      || rootDir.startsWith(lastEll)
    ) {
      throw new Error(getFailOperationMessage(errOperationName));
    } else {
      newCurrentPathArr.pop();
    }
  } catch (error) {
    console.log(error.message);
  }

  process.stdout.write(
    getCurrentPathMessage(newCurrentPathArr)
  );
  return newCurrentPathArr;
}