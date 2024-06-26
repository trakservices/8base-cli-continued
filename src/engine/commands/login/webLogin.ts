import cuid from '@paralleldrive/cuid2';
import open from 'open';

import { Context } from '../../../common/context';
import { SessionInfo } from '../../../interfaces/Common';
import { Utils } from '../../../common/utils';

export const webLogin = async (params: { w: string }, context: Context): Promise<SessionInfo> => {
  context.spinner.start(context.i18n.t('login_in_progress'));
  const session = cuid.createId();

  await open(`${Utils.trimLastSlash(params.w)}/cli?guid=${session}`, { wait: false });

  const timeoutMs = 2000;
  let retryCount = 150; // 150 * 2s = 300s = 5 min

  let res = null;

  while (--retryCount > 0) {
    context.logger.debug(`try to fetch session ${session}`);
    try {
      const response = await Utils.checkHttpResponse(
        fetch(`${Utils.trimLastSlash(context.resolveMainServerAddress())}/loginSessionGet/${session}`),
      );
      res = (await response.json()) as { idToken: string; refreshToken: string } | null;
    } catch (e) {
      if (e.statusCode === 404) {
        context.logger.debug(`session not present`);
        await Utils.sleep(timeoutMs);
        continue;
      }
    }

    retryCount = 0;
  }

  if (!res) {
    throw new Error(context.i18n.t('login_timeout_error'));
  }

  context.setSessionInfo(res);

  return {
    idToken: res.idToken,
    refreshToken: res.refreshToken,
  };
};
