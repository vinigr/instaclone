import { GraphQLObjectType, GraphQLString } from "graphql";
import { globalIdField, connectionDefinitions } from "graphql-relay";
import { nodeInterface } from "../../graphql/node";
import { UserDocument } from "./UserModel";

const UserType = new GraphQLObjectType<UserDocument>({
  name: "User",
  description: "User data",
  fields: () => ({
    id: globalIdField("User"),
    _id: {
      type: GraphQLString,
      description: "mongoose _id",
      resolve: ({ _id }) => _id.toString(),
    },
    name: {
      type: GraphQLString,
      resolve: user => {
        return user.name;
      },
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    phone: {
      type: GraphQLString,
      resolve: user => user.phone,
    },
    username: {
      type: GraphQLString,
      resolve: user => user.username,
    },
    createdAt: {
      type: GraphQLString,
      resolve: user => user.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: user => (user.updatedAt ? user.updatedAt.toISOString() : null),
    },
  }),
  interfaces: () => [nodeInterface],
});

export default UserType;

export const UserConnection = connectionDefinitions({
  name: "User",
  nodeType: UserType,
});
