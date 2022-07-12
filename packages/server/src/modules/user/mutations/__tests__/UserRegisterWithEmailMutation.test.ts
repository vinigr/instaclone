import { graphql } from "graphql";
import { schema } from "../../../../graphql/schema/schema";

import { createUser } from "../../fixtures/createUser";

it("should not register with an existing email", async () => {
  const user = await createUser({
    name: "Test",
    username: "Test",
    phone: "5577999999999",
  });

  // language=GraphQL
  const query = `
    mutation M(
      $name: String!
      $email: String!
      $username: String!
      $password: String!
    ) {
      UserRegisterWithEmail(input: {
        name: $name
        email: $email
        username: $username
        password: $password
      }) {
        token
        error
      }
    }
  `;

  const rootValue = {};
  const contextValue = {};
  const variableValues = {
    name: "Test",
    username: "test",
    email: user.email,
    password: "123",
  };

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue,
    variableValues,
  });

  expect((result.data as any).UserRegisterWithEmail.token).toBe(null);
  expect((result.data as any).UserRegisterWithEmail.error).toBe(
    "Email already in use"
  );
});

it("should not register with an existing username", async () => {
  const user = await createUser({
    name: "Test",
    phone: "5577999999999",
  });

  // language=GraphQL
  const query = `
    mutation M(
      $name: String!
      $email: String!
      $username: String!
      $password: String!
    ) {
      UserRegisterWithEmail(input: {
        name: $name
        email: $email
        username: $username
        password: $password
      }) {
        token
        error
      }
    }
  `;

  const rootValue = {};
  const contextValue = {};
  const variableValues = {
    name: "Test",
    username: user.username,
    email: "test@teste.com",
    password: "123",
  };

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue,
    variableValues,
  });

  expect((result.data as any).UserRegisterWithEmail.token).toBe(null);
  expect((result.data as any).UserRegisterWithEmail.error).toBe(
    "Username already in use"
  );
});
