import os from 'os';
import { getCurrentPathMessage } from '../../utils/index.js';

const returnChz = (speed) => {
  let newSpeed = speed / 1000;
  return Math.round(newSpeed * 10) / 10;
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

export const osApp = ({currentDirectoryArr, args}) => {
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