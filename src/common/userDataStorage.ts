import { StaticConfig } from '../config';
import { StorageParameters, StorageParametersType } from '../consts/StorageParameters';
import * as path from 'node:path';
import * as fs from 'fs-extra';

const defaultStorageData = {
  [StorageParameters.authDomain]: StaticConfig.authDomain,
  [StorageParameters.authClientId]: StaticConfig.authClientId,
};

class Storage {
  private static storageFileName = '.8baserc';

  /**
   *  path to storage file is persistent
   */
  private static get pathToStorage(): string {
    return path.join(StaticConfig.homePath, this.storageFileName);
  }

  /**
   * Function check exist and create storage file.
   *
   * @returns path to instanced repository file
   */
  private static checkStorageExist() {
    const storagePath = this.pathToStorage;
    if (!fs.existsSync(storagePath)) {
      fs.writeFileSync(storagePath, this.toPrettyString(defaultStorageData));
    }
  }

  private static parseStorageData(): any {
    return fs.readJSONSync(this.pathToStorage, { throws: true });
  }

  static getStorage() {
    this.checkStorageExist();
    return this.parseStorageData();
  }

  static saveStorage(storage: any) {
    fs.writeFileSync(this.pathToStorage, this.toPrettyString(storage));
  }

  static toPrettyString(storage: any) {
    return JSON.stringify(storage, null, 2);
  }
}

export class UserDataStorage {
  /**
   * Function is not thread safe !
   * @param data
   */
  static setValues(data: { name: string; value: any }[]) {
    const storage = Storage.getStorage();
    data.map(d => (storage[d.name] = d.value));
    Storage.saveStorage(storage);
  }

  static getValue(name: StorageParametersType): any {
    const storage = Storage.getStorage();
    const storageValue = storage[name];

    if (!storageValue && !!defaultStorageData[name]) {
      this.setValues([
        {
          name,
          value: defaultStorageData[name],
        },
      ]);

      return defaultStorageData[name];
    } else if (!storageValue) {
      return null;
    }

    return storageValue;
  }

  static clearAll() {
    const storage = Storage.getStorage();
    delete storage.auth;
    delete storage.email;
    delete storage.accountId;
    delete storage.remoteCliEndpoint;
    Storage.saveStorage(storage);
  }

  static toString(): string {
    return Storage.toPrettyString(Storage.getStorage());
  }
}
