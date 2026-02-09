export class StorageSetItemError extends Error {
  constructor(error: Error) {
    super(error.message);
    this.name = "StorageSetItemError";
  }
}

export function isStorageSetItemError(
  error: unknown,
): error is StorageSetItemError {
  return error instanceof StorageSetItemError;
}

export default {
  setItem(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      throw new StorageSetItemError(error as Error);
    }
  },
  getItem(key: string) {
    return localStorage.getItem(key);
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
