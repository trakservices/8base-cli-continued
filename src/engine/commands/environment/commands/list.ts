import * as yargs from "yargs";
import { Context } from "../../../../common/context";
import { translations } from "../../../../common/translations";
import { ProjectConfigurationState } from "../../../../common/configuraion";
import { table } from "table";

const ENVIRONMENT_TABLE_HEADER = ['Id', 'Name'];

export default {
  command: "list",
  handler: async (params: any, context: Context) => {
    ProjectConfigurationState.expectConfigured(context);
    const environments = await context.getEnvironments(context.workspaceConfig.workspaceId);
    context.logger.info(table([ENVIRONMENT_TABLE_HEADER, ...environments.map(e => [e.id, e.name])]));
  },

  describe: translations.i18n.t("environment_list_describe"),

  builder: (args: yargs.Argv): yargs.Argv =>
    args.usage(translations.i18n.t('environment_list_usage'))
};
