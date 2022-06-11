import readline from 'readline';
import os from 'os';
import { getUserName, getStartDirname } from './utils/helpers.js';
import { doCommand } from './utils/commands.js';


const fileManagerTask = () => {
  const userName = getUserName(process.argv) || 'anonym';
  const welcomeMessage = `Welcome to the File Manager, ${userName}!${os.EOL}`;
  const exitMessage = `Thank you for using File Manager, ${userName}!${os.EOL}`;
  const directoryMessage = 'You are currently in ';
  let [currentDirectoryArr, sep] = getStartDirname(import.meta.url);
  const entryMessage = welcomeMessage + directoryMessage + currentDirectoryArr.join(sep) + os.EOL;

  const lineRead = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: entryMessage,
  });

  lineRead.prompt();

  lineRead.on('line', (input) => {
    doCommand(input, lineRead);
  });

  lineRead.on('SIGINT', () => lineRead.close());

  lineRead.on('close', () => {
    process.stdout.write(exitMessage);
  });
}

fileManagerTask();
