import { GraphQLString } from "graphql";

const errorField = {
  error: {
    type: GraphQLString,
    description: "Default error field resolver.",
    resolve: ({ error }: any) => error,
  },
};

const successField = {
  success: {
    type: GraphQLString,
    description: "Default success field resolver.",
    resolve: ({ success }: any) => success,
  },
};

export { errorField, successField };
