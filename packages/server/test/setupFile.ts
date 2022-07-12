import mongoose from "mongoose";
import { clearDbAndRestartCounters } from "./clearDatabase";

beforeAll(async () => {
  // put your client connection code here, example with mongoose:
  await mongoose.connect(process.env.MONGO_URI!);
});

beforeEach(clearDbAndRestartCounters);

afterAll(async () => {
  // put your client disconnection code here, example with mongodb:
  await mongoose.disconnect();
});
