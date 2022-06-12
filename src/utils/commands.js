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

  switch (command) {
    case 'up': {
      newCurrentPathArr = up(newCurrentPathArr, rootDir, 'UP');
      break;
    }
    case 'cd': {
      newCurrentPathArr = (args[0] === '..')
        ? up(newCurrentPathArr, rootDir, 'CD')
        : await cd({ currentDirectoryArr: newCurrentPathArr, rootDir, args, sep });
      break;
    }
    case 'ls': {
      ls(newCurrentPathArr, rootDir);
      break;
    }
    case 'cat': {
      cat();
      break;
    }
    case 'add': {
      add();
      break;
    }
    case 'rn': {
      rn();
      break;
    }
    case 'cp': {
      cp();
      break;
    }
    case 'mv': {
      mv();
      break;
    }
    case 'rm': {
      rm();
      break;
    }
    case 'os': {
      os(newCurrentPathArr, args);
      break;
    }
    case 'hash': {
      hash({ currentDirectoryArr: newCurrentPathArr, rootDir, args });
      break;
    }
    case 'compress': {
      compress({ currentDirectoryArr: newCurrentPathArr, rootDir, args });
      break;
    }
    case 'decompress': {
      decompress({ currentDirectoryArr: newCurrentPathArr, rootDir, args });
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
