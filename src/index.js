import readline from 'readline';
import {
  doCommand,
  getCurrentPathMessage,
  getEndMessage,
  getStartDir,
  getStartMessage,
  getUserName,
} from './utils/index.js';


const fileManagerTask = () => {
  const userName = getUserName(process.argv) || 'anonym';
  const { currentDirectoryArr, sep, rootDir } = getStartDir(import.meta.url);
  let actuallyPathArr = [...currentDirectoryArr]

  const lineRead = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '',
  });

  process.stdout.write(getStartMessage(userName));
  process.stdout.write(getCurrentPathMessage(currentDirectoryArr));

  lineRead.on('line', async (input) => {
    try {
      actuallyPathArr = await doCommand({ input, lineRead, currentDirectoryArr: actuallyPathArr, sep, rootDir });
    } catch (error) {
      console.log(error.message);
    }
  });

  lineRead.on('SIGINT', () => lineRead.close());

  lineRead.on('close', () => {
    process.stdout.write(getEndMessage(userName));
  });
}

fileManagerTask();
