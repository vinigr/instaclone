import { GraphQLObjectType } from "graphql";
import UserModel from "../../modules/user/UserModel";
import UserType from "../../modules/user/UserType";
import { nodeField, nodesField } from "../node";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    me: {
      type: UserType,
      resolve: async (root, args, context: any) => {
        return await UserModel.findById(context.user?._id);
      },
    },
  }),
});

export default QueryType;
