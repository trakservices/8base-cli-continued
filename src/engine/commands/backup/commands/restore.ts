import yargs from 'yargs';
import { Context } from '../../../../common/context';
import { translations } from '../../../../common/translations';
import { ProjectConfigurationState } from '../../../../common/configuration';
import { executeAsync } from '../../../../common/execute';
import { GraphqlAsyncActions } from '../../../../consts/GraphqlActions';

type RestoreParams = { environment: string; backup: string };

export default {
  command: 'restore',

  handler: async (params: RestoreParams, context: Context) => {
    let { environment, backup } = params;
    await ProjectConfigurationState.expectConfigured(context);
    context.spinner.start(context.i18n.t('backup_restore_in_progress'));
    await executeAsync(context, GraphqlAsyncActions.backupRestore, { name: environment, backup });
    context.spinner.stop();
  },

  describe: translations.i18n.t('backup_restore_describe'),

  builder: (args: yargs.Argv): yargs.Argv =>
    args
      .usage(translations.i18n.t('backup_restore_usage'))
      .option('backup', {
        alias: 'b',
        describe: translations.i18n.t('backup_restore_set_backup_name_describe'),
        type: 'string',
        demandOption: true,
        requiresArg: true,
      })
      .option('environment', {
        alias: 'e',
        describe: translations.i18n.t('backup_restore_set_environment_describe'),
        type: 'string',
        demandOption: true,
        requiresArg: true,
      }),
};
