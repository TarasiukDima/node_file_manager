import { USER_NAME_ARG } from '../settings/index.js';
import { sep } from "path";

export const getUserName = (args) => {
  const argsArray = args.slice(2);
  const userName = [];

  argsArray.forEach((arg) => {
    if (arg.startsWith(USER_NAME_ARG)) {
      userName.push(arg.slice(USER_NAME_ARG.length));
    } else {
      userName.push(arg);
    }
  })
  return userName.join(' ');
};

export const replaceQuotes = (str) => {
  let newStr = str.trim();
  const arrQuotes = ['\'', '\"'];

  if (arrQuotes.includes(newStr[0])) {
    newStr = newStr.slice(1);
  }

  if (arrQuotes.includes(newStr[newStr.length - 1])) {
    newStr = newStr.slice(0, -1);
  }

  return newStr;
};

export const parseArgsString = (input) => {
  let command = input.split(' ', 1)[0] || '';
  let argsStr = input.split(' ').slice(1).join(' ');

  const newArr = argsStr.split('\'');
  if (newArr.length > 1) {
    return [command, newArr];
  }

  const newArr2 = argsStr.split('\"');
  if (newArr2.length > 1) {
    return [command, newArr2];
  }

  return [command, argsStr.split(' ')];
};

const clearSepPathArr = (arr) => {
  const newArr = arr.filter((str) => {
    if (str !== sep && str.length) {
      return str;
    }
  })

  return newArr.length
}
export const checkDoublePaths = (path1, path2) => {
  const arr1 = path1.split(path2);
  const arr2 = path2.split(path1);

  return (!clearSepPathArr(arr1) || !clearSepPathArr(arr2));
};
