import yargs from 'yargs';
import chalk from 'chalk';

import { Context } from '../../../../common/context';
import { translations } from '../../../../common/translations';
import { ProjectConfigurationState } from '../../../../common/configuration';

export default {
  command: 'show',

  handler: async (params: {}, context: Context) => {
    await ProjectConfigurationState.expectConfigured(context);
    const { environmentName } = context.workspaceConfig;
    context.logger.info(
      translations.i18n.t('environment_show_text', {
        environment: chalk.green(environmentName),
      }),
    );
  },

  describe: translations.i18n.t('environment_show_describe'),

  builder: (args: yargs.Argv): yargs.Argv => args.usage(translations.i18n.t('environment_show_usage')),
};
