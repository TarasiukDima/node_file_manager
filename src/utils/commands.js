import { add, cat, cd, compress, cp, decompress, hash, ls, mv, os, rm, rn, up } from "../modules/index.js";

export const doCommand = async ({
  input,
  lineRead,
  currentDirectoryArr,
  sep,
  rootDir
}) => {
  const invalidInput = 'Invalid input\n';
  const [command, ...args] = input.trim().split(' ');
  let newCurrentPathArr = [...currentDirectoryArr];

  switch (command) {
    case 'up': {
      newCurrentPathArr = up(newCurrentPathArr, rootDir);
      break;
    }
    case 'cd': {
      newCurrentPathArr = (args[0] === '..')
        ? up(newCurrentPathArr, rootDir)
        : await cd({currentDirectoryArr: newCurrentPathArr, rootDir, args, sep});
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
      os(args);
      break;
    }
    case 'hash': {
      hash();
      break;
    }
    case 'compress': {
      compress();
      break;
    }
    case 'decompress': {
      decompress();
      break;
    }
    case 'exit':
    case '.exit': {
      lineRead.close()
      break;
    }
    default: {
      process.stdout.write(invalidInput);
    }
  }

  return newCurrentPathArr;
}
