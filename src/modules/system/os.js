import os from 'os';
import { getCurrentPathMessage } from '../../utils/index.js';

const returnChz = (speed) => {
  let newSpeed = speed;
  while (newSpeed > 10) {
    newSpeed = newSpeed / 10;
  }

  return Math.floor(newSpeed);
}

const showCPUS = () => {
  const showCpusInfo = os.cpus().map(({ model, speed }) => {
    return {
      model,
      speed_GHz: returnChz(speed),
    };
  })
  console.table(showCpusInfo);
}

export const osApp = (currentDirectoryArr, args) => {
  switch (args[0].trim()) {
    case "--EOL": {
      console.log(JSON.stringify(os.EOL));
      break;
    }
    case "--cpus": {
      showCPUS();
      break;
    }
    case "--homedir": {
      console.log(os.homedir() || os.userInfo().homedir);
      break;
    }
    case "--username": {
      console.log(os.userInfo().username);
      break;
    }
    case "--architecture": {
      console.log(os.arch());
      break;
    }
    default: {
      throw new Error('OS operation failed. Not correct args!');
    }
  }

  process.stdout.write(
    getCurrentPathMessage(currentDirectoryArr)
  );
}