import readline from 'readline';
import os from 'os';
import {
  getUserName,
  getStartDir,
  getCurrentPathMessage
} from './utils/helpers.js';
import { doCommand } from './utils/commands.js';


const fileManagerTask = () => {
  const userName = getUserName(process.argv) || 'anonym';
  const welcomeMessage = `Welcome to the File Manager, ${userName}!${os.EOL}`;
  const {currentDirectoryArr, sep, rootDir} = getStartDir(import.meta.url);
  const entryMessage = welcomeMessage + getCurrentPathMessage(currentDirectoryArr);
  let actuallyPathArr = [...currentDirectoryArr]

  const lineRead = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '',
  });

  process.stdout.write(entryMessage);

  lineRead.on('line', async (input) => {
    actuallyPathArr = await doCommand({ input, lineRead, currentDirectoryArr: actuallyPathArr, sep, rootDir });
  });

  lineRead.on('SIGINT', () => lineRead.close());

  lineRead.on('close', () => {
    process.stdout.write(`Thank you for using File Manager, ${userName}!${os.EOL}`);
  });
}

fileManagerTask();
