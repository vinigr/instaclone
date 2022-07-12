import { MongoMemoryServer } from "mongodb-memory-server-global";
import mongoose from "mongoose";

export = async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  (global as any).__MONGOINSTANCE = instance;
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf("/"));

  (global as any).__COUNTERS__ = {
    user: 0,
  };

  // The following is to make sure the database is clean before an test starts
  await mongoose.connect(`${process.env.MONGO_URI}/instaclone`);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};
