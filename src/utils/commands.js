import {
  add, cat, cd, compress, cp, decompress, hash, ls, mv, os, rm, rn, up
} from "../modules/index.js";
import { getInvalidMessage, parseArgsString } from "./index.js";

export const doCommand = async ({
  input,
  lineRead,
  currentDirectoryArr,
  sep,
  rootDir
}) => {
  const [command, argsDirty] = parseArgsString(input);
  const args = argsDirty.filter((arg) => {
    if (arg !== ' ' && arg.length) {
      return arg;
    }
  });
  let newCurrentPathArr = [...currentDirectoryArr];

  const commonArgsCommand = {
    currentDirectoryArr: newCurrentPathArr,
    rootDir,
    args,
  }

  switch (command) {
    case 'up': {
      newCurrentPathArr = up(newCurrentPathArr, rootDir, 'UP');
      break;
    }
    case 'cd': {
      newCurrentPathArr = (args[0] === '..')
        ? up(newCurrentPathArr, rootDir, 'CD')
        : await cd({ ...commonArgsCommand, sep });
      break;
    }
    case 'ls': {
      ls(newCurrentPathArr, rootDir);
      break;
    }
    case 'cat': {
      cat(commonArgsCommand);
      break;
    }
    case 'add': {
      add(commonArgsCommand);
      break;
    }
    case 'rn': {
      rn(commonArgsCommand);
      break;
    }
    case 'cp': {
      cp(commonArgsCommand);
      break;
    }
    case 'mv': {
      mv(commonArgsCommand);
      break;
    }
    case 'rm': {
      rm(commonArgsCommand);
      break;
    }
    case 'os': {
      os(commonArgsCommand);
      break;
    }
    case 'hash': {
      hash(commonArgsCommand);
      break;
    }
    case 'compress': {
      compress(commonArgsCommand);
      break;
    }
    case 'decompress': {
      decompress(commonArgsCommand);
      break;
    }
    case 'exit':
    case '.exit': {
      lineRead.close()
      break;
    }
    default: {
      process.stdout.write(
        getInvalidMessage()
      );
    }
  }

  return newCurrentPathArr;
}
