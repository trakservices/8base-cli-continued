import { CLI_BIN } from './consts';
import { execa } from 'execa';

const runner = (cwd?: any, env?: any) => {
  const opts = {
    cwd,
    env: Object.assign(
      {
        HOME: process.env.HOME,
        SKIP_VERSION_CHECK: true,
      },
      env,
    ),
  };

  return (...args: any[]) => execa('node', [CLI_BIN].concat(args), opts);
};

export { runner };
