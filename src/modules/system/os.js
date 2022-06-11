import os from 'os';

export const osApp = (args) => {
  switch (args[0]) {
    case "--EOL": {
      console.log(JSON.stringify(os.EOL));
      break;
    }
    case "--cpus": {
      console.log(os.cpus());
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
}