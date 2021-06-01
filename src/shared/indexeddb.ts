export class IndexedDb {
  constructor() {
    const openRequest = IndexedDb.openDb();

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('score')) {
        db.createObjectStore('score', { autoIncrement: true });
      }
    };
  }

  static openDb() : IDBOpenDBRequest {
    return indexedDB.open('ivanyatsko-JSFE2021Q1', 1);
  }

  static addData(newData : { firstName: string; lastName: string; email: string } | { score: number },
    tableName = 'score') : void {
    const openRequest = IndexedDb.openDb();

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const transaction = db.transaction(tableName, 'readwrite');
      const data = transaction.objectStore(tableName);

      data.add(newData);
    };
  }

  static async getData(tableName = 'score') : Promise<unknown> {
    const openRequest = IndexedDb.openDb();

    const promise = new Promise((resolve) => {
      openRequest.onsuccess = () => {
        const db = openRequest.result;
        const transaction = db.transaction(tableName, 'readonly').objectStore(tableName);

        const request = transaction.getAll();

        request.onsuccess = () => {
          resolve(request.result);
        };
      };
    });

    return promise;
  }
}
