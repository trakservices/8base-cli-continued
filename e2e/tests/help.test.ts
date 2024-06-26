import { it, expect } from 'vitest';

import { runner } from '../runner';

it.each([
  [['']],
  [['backup']],
  [['backup', 'create']],
  [['backup', 'list']],
  [['backup', 'restore']],
  [['check']],
  [['configure']],
  [['deploy']],
  [['describe']],
  [['export']],
  [['generate']],
  [['generate', 'app']],
  [['generate', 'scaffold']],
  [['generate', 'resolver']],
  [['generate', 'trigger']],
  [['generate', 'task']],
  [['generate', 'webhook']],
  [['generate', 'mock']],
  [['import']],
  [['init']],
  [['invoke']],
  [['invoke']],
  [['login']],
  [['logout']],
  [['logs']],
  [['package']],
  [['environment']],
  [['environment', 'set']],
  [['environment', 'branch']],
  [['environment', 'list']],
  [['environment', 'show']],
  [['migration']],
  [['migration', 'commit']],
  [['migration', 'generate']],
  [['migration', 'status']],
  [['introspection']],
])('As a user, I can use help flag for see help information about `%s`.', async cmd => {
  const { stdout } = await runner()(...cmd, '--help');

  expect(stdout).toMatchSnapshot();
});
