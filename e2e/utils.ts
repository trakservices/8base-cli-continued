import path from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import * as fs from 'fs-extra';
import cuid from '@paralleldrive/cuid2';
import yaml from 'yaml';
import stripAnsi from 'strip-ansi';
import { expect } from 'vitest';

import { CLI_BIN } from './consts';
import { ProjectConfig } from '../src/common/context';
import { Utils } from '../src/common/utils';

export const prepareTestEnvironment = async (
  repName: string = cuid.createId(),
): Promise<{ onComplete: () => void; repPath: string }> => {
  const dirName = cuid.createId();
  const fullPath = path.join(__dirname, `tmp_${dirName}`);

  createDir(fullPath);

  await RunCommand.init(fullPath, repName);

  return {
    repPath: path.join(fullPath, repName),
    onComplete: () => {
      fs.rmSync(fullPath, { recursive: true, force: true });
    },
  };
};

export const addResolverToProject = async (
  funcName: string,
  code: string,
  graphQLData: string,
  projectPath: string,
  ext: string = '.ts',
) => {
  const subDir = 'src';

  await fs.writeFile(path.join(projectPath, subDir, funcName).concat(ext), code);
  await fs.writeFile(path.join(projectPath, subDir, funcName).concat('.graphql'), graphQLData);
  const yamlFilePath = path.join(projectPath, '8base.yml');
  const yamlData = <ProjectConfig>yaml.parse(await fs.readFile(yamlFilePath, 'utf8'));

  yamlData.functions[funcName] = {
    handler: {
      code: path.join(subDir, funcName).concat(ext),
    },
    type: 'resolver',
    schema: path.join(subDir, funcName).concat('.graphql'),
  };

  await fs.writeFile(yamlFilePath, yaml.stringify(yamlData));
};

export const addFileToProject = async (
  fileName: string,
  fileData: string,
  projectPath: string,
  pathPrefix: string = '',
): Promise<{ relativePathToFile: string; fullPathToFile: string }> => {
  const pathToDir = path.join(projectPath, pathPrefix);
  const pathToFile: string = path.join(pathToDir, fileName);
  createDir(pathToDir);
  await fs.writeFile(pathToFile, fileData);
  return {
    relativePathToFile: Utils.normalizePath(path.join(pathPrefix, fileName)),
    fullPathToFile: pathToFile,
  };
};

export namespace RunCommand {
  export const invokeLocal = async (funcName: string, repPath: string, input?: { path?: string; data?: object }) => {
    let command: string = `invoke-local ${funcName} `;

    if (input && input.data) {
      command += `-j '${JSON.stringify(input.data)}'`;
    } else if (input && input.path) {
      command += `-p ${input.path}`;
    }

    return await execCmd(repPath, command);
  };

  export const init = async (repPath: string, repName: string) => {
    return await execCmd(repPath, `init ${repName} -w=workspaceId`);
  };
}

const execCmd = async (repPath: string, command: string) => {
  const execPromise = promisify(exec);
  const result = await execPromise(`cd ${repPath} && node ${CLI_BIN} ${command}`);
  return result.stdout;
};

const createDir = (path: string) => {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
};

export const expectInString = (template: string, expectedValue: string) => {
  const cleanString = (str: string): string => {
    return stripAnsi(
      str
        .replace(/^\s*\n+\s*/g, '')
        .replace(/\s*\n+\s*$/g, '')
        .replace(/\n+/g, ' ')
        .replace(/\s\s+/g, ' '),
    );
  };

  expect(cleanString(template)).toContain(cleanString(expectedValue));
};
