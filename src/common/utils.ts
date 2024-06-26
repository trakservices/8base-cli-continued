import * as path from 'node:path';
import { Readable } from 'node:stream';
import * as fs from 'node:fs';
import _ from 'lodash';
import AdmZip from 'adm-zip';
import archiver from 'archiver';
import MemoryStream from 'memorystream';

import { Context } from './context';
import { CommandController } from '../engine/controllers/commandController';
import { translations } from './translations';
import { HttpError } from '../errors';

export namespace Utils {
  export const undefault = (m: any) => {
    return m.default ? m.default : m;
  };

  export const safeExecution = (cmd: any): { result: any; error: Error } => {
    try {
      return {
        result: cmd(),
        error: null,
      };
    } catch (err) {
      return {
        result: null,
        error: err,
      };
    }
  };

  export const installFiles = (
    targetDirectory: string,
    files: Map<string, string>,
    fs: any,
    context: Context,
  ): string => {
    files.forEach((data, name) => {
      const fullName = path.join(targetDirectory, name);
      const fullPath = path.dirname(fullName);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
      }

      fs.writeFileSync(fullName, data);
      context.logger.debug(`install file = ${fullName}`);
    });
    return targetDirectory;
  };

  export const upload = async (url: string, fileStream: Readable, context: Context): Promise<void> => {
    context.logger.debug('start upload file');
    context.logger.debug(`url: ${url}`);

    const body = fileStream.read();
    await Utils.checkHttpResponse(
      fetch(url, {
        method: 'PUT',
        body,
        headers: {
          'Content-Length': body.length,
        },
      }),
    );

    context.logger.debug('upload file success');
  };

  export const archiveToMemory = async (
    directories: { source: string; dist?: string }[],
    context: Context,
  ): Promise<Readable> => {
    const memoryStream = new MemoryStream(null);

    return new Promise<Readable>((resolve, reject) => {
      const zip = archiver('zip', { zlib: { level: 0 } });

      zip.pipe(memoryStream);

      directories.forEach(sourcePath => {
        const source = fs.statSync(sourcePath.source);
        context.logger.debug(
          `archive files from directory = ${sourcePath.source} dist = ${sourcePath.dist} is file = ${source.isFile()}`,
        );

        source.isFile()
          ? zip.file(sourcePath.source, { name: sourcePath.source })
          : zip.directory(sourcePath.source, sourcePath.dist || false);
      });

      zip.on('error', (err: any) => {
        context.logger.debug(`Error while zipping build: ${err}`);
        reject(new Error(err));
      });

      zip.on('finish', () => {
        context.logger.debug('zipping finish');
        memoryStream.end();
        resolve(memoryStream);
      });

      zip.on('end', () => {
        context.logger.debug('zipping end');
      });

      zip.on('warning', (error: archiver.ArchiverError) => {
        context.logger.warn(error);
      });

      zip.finalize();
    });
  };

  export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  export const trimLastSlash = (url: string): string => {
    if (!_.isString(url) || url.length === 0) {
      return '';
    }

    return url[url.length - 1] === '/' ? url.substr(0, url.length - 1) : url;
  };

  export const commandDirMiddleware =
    (commandsDirPath: string) =>
    (commandObject: { [key: string]: any }, pathName: string): Object => {
      const cmd = commandObject.default || commandObject;
      const fileDepth = path.relative(commandsDirPath, pathName).split(path.sep).length;

      if (fileDepth <= 2 && !!cmd.command) {
        return {
          ...cmd,
          handler: CommandController.wrapHandler(cmd.handler, translations),
        };
      }
    };

  export const checkHttpResponse = async (httpResponse: Promise<Response>): Promise<Response> => {
    const response = await httpResponse;
    if (!response.ok) {
      throw new HttpError(await response.text(), response.status, response);
    }

    return response;
  };

  export const downloadArchive = async (url: string): Promise<AdmZip> => {
    const dataRequest = await checkHttpResponse(fetch(url, { method: 'GET' }));
    const dataBuffer = Buffer.from(await dataRequest.arrayBuffer());
    const archive = new AdmZip(dataBuffer);
    return archive;
  };

  export const getNpmLatestPackageVersion = async (packageName: string): Promise<string> => {
    const registryUrl = `https://registry.npmjs.org/${packageName}`;
    const dataRequest = await checkHttpResponse(fetch(registryUrl, { method: 'GET' }));
    const data = (await dataRequest.json()) as { 'dist-tags': { latest: string | null } | null } | null;

    const version = data?.['dist-tags']?.latest;
    if (!version) {
      throw new Error('Failed to receive the latest package version');
    }

    return version;
  };

  export const normalizePath = (rawPath: string): string => {
    return rawPath.replace(/\\/g, '/');
  };
}
