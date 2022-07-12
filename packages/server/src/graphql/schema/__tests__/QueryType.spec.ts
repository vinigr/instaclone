import { graphql } from "graphql";
import { getContext } from "../../../context";
import { createUser } from "../../../modules/user/fixtures/createUser";

import { schema } from "../schema";

it("should return logged user", async () => {
  const user = await createUser({});

  // language=GraphQL
  const query = `
    query Q {
      me {
        name
        username
      }
    }
  `;

  const rootValue = {};
  const contextValue = await getContext({ user });
  const variableValues = {};

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue,
    variableValues,
  });

  expect(result.errors).toBeUndefined();
  expect((result.data as any).me).not.toBeNull();
  expect((result.data as any).me.name).toBe(user.name);
  expect((result.data as any).me.username).toBe(user.username);
});
