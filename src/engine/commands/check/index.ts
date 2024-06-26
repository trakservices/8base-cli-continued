import yargs from 'yargs';
import _ from 'lodash';
import { SchemaNameGenerator } from '@8base/schema-name-generator';

import { Context } from '../../../common/context';
import { translations } from '../../../common/translations';
import { ProjectConfigurationState } from '../../../common/configuration';
import { GraphqlActions } from '../../../consts/GraphqlActions';

type CheckParams = { views: boolean };
type Table = { name: string; origin: { type: 'VIEW' | string } };
type View = { name: string; origin: { type: 'VIEW' }; query: string };

export default {
  command: 'check',

  handler: async (params: CheckParams, context: Context) => {
    await ProjectConfigurationState.expectConfigured(context);
    switch (true) {
      case params.views:
        await views(context);
        break;
      /* there should be only one break (!) before default case to be able to specify several checks */
      default:
        await views(context);
    }
  },

  describe: translations.i18n.t('check_describe'),

  builder: (args: yargs.Argv): yargs.Argv =>
    args.usage(translations.i18n.t('check_usage')).option('views', {
      alias: 'v',
      describe: translations.i18n.t('check_views_describe'),
      type: 'boolean',
      requiresArg: false,
    }),
};

const views = async (context: Context) => {
  const query = (queryName: string) => `query CheckView { ${queryName}(first: 1) { items { id } } }`;

  const tables: Table[] = (await context.request(GraphqlActions.tablesList)).system.tablesList.items;
  const views = tables
    .filter(table => table.origin.type === 'VIEW')
    .map(view => <View>_.assign(view, { query: SchemaNameGenerator.getTableListFieldName(view.name) }));

  const rejected: string[] = [];
  for (const view of views) {
    try {
      await context.request(query(view.query));
    } catch {
      rejected.push(view.name);
    }
  }

  if (!_.isEmpty(rejected)) {
    throw new Error(translations.i18n.t('check_invalid_views', { list: rejected.join(', ') }));
  }
};
