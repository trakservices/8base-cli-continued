#!/usr/bin/env node

import yargs from 'yargs';
import chalk from 'chalk';

import { StaticConfig } from './config';
import { Utils } from './common/utils';
import { translations, Translations } from './common/translations';

const start = async (translations: Translations) => {
  const argv = await yargs
    .scriptName('8base')
    .usage(translations.i18n.t('8base_usage'))
    .commandDir(StaticConfig.commandsDir, {
      extensions: ['js'],
      recurse: true,
      visit: Utils.commandDirMiddleware(StaticConfig.commandsDir),
    })
    .alias('version', 'v')
    .option('v', {
      global: false,
    })
    .option('debug', {
      alias: 'd',
      describe: 'Turn on debug logs',
      type: 'boolean',
    })
    .recommendCommands()
    .strict()
    .fail((msg, err) => {
      // certain yargs validations throw strings :P
      const actual = err || new Error(msg);

      // ValidationErrors are already logged, as are package errors
      if (actual.name !== 'ValidationError') {
        if (/Did you mean/.test(actual.message)) {
          console.error('Unknown command');
        }

        console.error(actual.message);
      }

      process.exit(0);
    })
    .detectLocale(false)
    .help()
    .alias('help', 'h')
    .updateStrings({
      'Examples:': 'EXAMPLES',
      'Commands:': 'COMMANDS',
      'Options:': 'OPTIONS',
      'Positionals:': 'POSITIONALS',
    })
    .wrap(yargs.terminalWidth()).argv;

  if (!argv._[0]) {
    yargs.showHelp();
  }
};

translations
  .init()
  .then(async (translations: Translations) => {
    try {
      const latestVersion = await Utils.getNpmLatestPackageVersion(StaticConfig.packageName);

      if (StaticConfig.packageVersion !== latestVersion && process.env.SKIP_VERSION_CHECK !== 'true') {
        // eslint-disable-next-line no-console
        console.log(chalk.yellow(translations.i18n.t('8base_new_version', { latestVersion })) + '\n');
      }
    } catch (e) {}

    await start(translations);
  })
  .catch(err => console.error(err.message));
