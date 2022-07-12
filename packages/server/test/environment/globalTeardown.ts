import { MongoMemoryServer } from "mongodb-memory-server-global";

export = async function globalTeardown() {
  const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
  await instance.stop();
};
