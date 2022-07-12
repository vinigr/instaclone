import { GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { generateToken } from "../../../auth";
import { errorField, successField } from "../../../graphql/statusFields";

import UserModel from "../UserModel";

import UserType from "../UserType";

export default mutationWithClientMutationId({
  name: "UserRegisterWithEmail",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ name, username, email, password }) => {
    const hasUserSameEmail = await UserModel.countDocuments({
      email: email.trim().toLowerCase(),
      status: 1,
    });

    if (hasUserSameEmail) {
      return {
        error: "Email already in use",
      };
    }

    const hasUserSameUsername = await UserModel.countDocuments({
      username: username.trim().toLowerCase(),
    });

    if (hasUserSameUsername) {
      return {
        error: "Username already in use",
      };
    }

    const user = await new UserModel({
      name,
      username,
      email,
      password,
    }).save();

    return {
      token: generateToken(user),
      id: user._id,
      success: "User registered with success",
    };
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    me: {
      type: UserType,
      resolve: async ({ id }) => {
        return await UserModel.findById(id);
      },
    },
    ...errorField,
    ...successField,
  },
});
