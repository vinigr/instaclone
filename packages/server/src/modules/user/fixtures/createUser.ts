import { getCounter } from "../../../../test/counters";
import { DeepPartial } from "../../../../test/deepPartial";
import User, { UserDocument } from "../UserModel";

export const createUser = async (args: DeepPartial<UserDocument>) => {
  const n = getCounter("user");
  const {
    name = `User ${n}`,
    email = `user${n}@test.com`,
    password = `password123${n}321`,
    username = `user${n}`,
    ...payload
  } = args;

  return await new User({
    name,
    email,
    password,
    username,
    ...payload,
  }).save();
};
