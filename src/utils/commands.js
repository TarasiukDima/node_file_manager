export const doCommand = (input, lineRead) => {
  const invalidInput = 'Invalid input\n';
  const [command, ...args] = input.trim().split(' ');

  switch (command) {
    case 'up': {
      process.stdout.write('up');
      break;
    }
    case 'cd': {
      process.stdout.write('cd');
      break;
    }
    case 'ls': {
      process.stdout.write('ls');
      break;
    }
    case 'cat': {
      process.stdout.write('cat');
      break;
    }
    case 'add': {
      process.stdout.write('add');
      break;
    }
    case 'rn': {
      process.stdout.write('rn');
      break;
    }
    case 'cp': {
      process.stdout.write('cp');
      break;
    }
    case 'mv': {
      process.stdout.write('mv');
      break;
    }
    case 'rm': {
      process.stdout.write('rm');
      break;
    }
    case 'os': {
      process.stdout.write('os');
      break;
    }
    case 'hash': {
      process.stdout.write('hash');
      break;
    }
    case 'compress': {
      process.stdout.write('compress');
      break;
    }
    case 'decompress': {
      process.stdout.write('decompress');
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
}
