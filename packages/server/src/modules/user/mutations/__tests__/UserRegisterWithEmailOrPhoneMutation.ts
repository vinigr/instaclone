import { graphql } from "graphql";
import { schema } from "../../../../graphql/schema/schema";

import { createUser } from "../../fixtures/createUser";
import UserModel from "../../UserModel";

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
      $email: String
      $username: String!
      $password: String!
    ) {
      UserRegisterWithEmailOrPhone(input: {
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

  expect((result.data as any).UserRegisterWithEmailOrPhone.token).toBeNull();
  expect((result.data as any).UserRegisterWithEmailOrPhone.error).toBe(
    "Email already in use"
  );
});

it("should not register with an existing email", async () => {
  // language=GraphQL
  const query = `
    mutation M(
      $name: String!
      $email: String
      $username: String!
      $password: String!
    ) {
      UserRegisterWithEmailOrPhone(input: {
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
    email: "teste@",
    password: "123",
  };

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue,
    variableValues,
  });

  expect((result.data as any).UserRegisterWithEmailOrPhone.token).toBeNull();
  expect((result.data as any).UserRegisterWithEmailOrPhone.error).toBe(
    "Invalid email"
  );
});

it("should not register if email or phone number is not provided", async () => {
  // language=GraphQL
  const query = `
    mutation M(
      $name: String!
      $username: String!
      $password: String!
    ) {
      UserRegisterWithEmailOrPhone(input: {
        name: $name
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
    password: "123",
  };

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue,
    variableValues,
  });

  expect((result.data as any).UserRegisterWithEmailOrPhone.token).toBeNull();
  expect((result.data as any).UserRegisterWithEmailOrPhone.error).toBe(
    "Phone or email is required"
  );
});

it("should not register with an existing phone", async () => {
  const user = await createUser({
    name: "Test",
    phone: "5577999999999",
  });

  // language=GraphQL
  const query = `
    mutation M(
      $name: String!
      $phone: String
      $username: String!
      $password: String!
    ) {
      UserRegisterWithEmailOrPhone(input: {
        name: $name
        phone: $phone
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
    phone: user.phone,
    password: "123",
  };

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue,
    variableValues,
  });

  expect((result.data as any).UserRegisterWithEmailOrPhone.token).toBeNull();
  expect((result.data as any).UserRegisterWithEmailOrPhone.error).toBe(
    "Phone already in use"
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
      $email: String
      $username: String!
      $password: String!
    ) {
      UserRegisterWithEmailOrPhone(input: {
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
    email: "test@test.com",
    password: "123",
  };

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue,
    variableValues,
  });

  expect((result.data as any).UserRegisterWithEmailOrPhone.token).toBeNull();
  expect((result.data as any).UserRegisterWithEmailOrPhone.error).toBe(
    "Username already in use"
  );
});

it("should must create a new user with email when the parameters are valid and email is informed", async () => {
  const email = "test@test.com";

  // language=GraphQL
  const query = `
    mutation M(
      $name: String!
      $email: String
      $username: String!
      $password: String!
    ) {
      UserRegisterWithEmailOrPhone(input: {
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
    email,
    password: "123",
  };

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue,
    variableValues,
  });

  expect((result.data as any).UserRegisterWithEmailOrPhone.error).toBeNull();
  expect(typeof (result.data as any).UserRegisterWithEmailOrPhone.token).toBe(
    "string"
  );

  const user = await UserModel.findOne({ email });

  expect(user).not.toBeNull();
  expect(user!.email).toBe(email);
});

it("should must create a new user with phone when the parameters are valid and phone is informed", async () => {
  const phone = "77999999999";

  // language=GraphQL
  const query = `
    mutation M(
      $name: String!
      $phone: String
      $username: String!
      $password: String!
    ) {
      UserRegisterWithEmailOrPhone(input: {
        name: $name
        phone: $phone
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
    phone,
    password: "123",
  };

  const result = await graphql({
    schema,
    source: query,
    rootValue,
    contextValue,
    variableValues,
  });

  expect((result.data as any).UserRegisterWithEmailOrPhone.error).toBeNull();
  expect(typeof (result.data as any).UserRegisterWithEmailOrPhone.token).toBe(
    "string"
  );

  const user = await UserModel.findOne({ phone });

  expect(user).not.toBeNull();
  expect(user!.phone).toBe(phone);
});
