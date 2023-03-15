/* eslint-disable @typescript-eslint/consistent-type-imports */
import { gql } from 'graphql-request';

type Credentials = {
  email: string;
  password: string;
};

export const GetNextAuthUserByEmail = gql`
  query GetAuthorByEmail($email: String!) {
    author(where: { email: $email }) {
      id
      password
    }
  }
`;

export const CreateNextAuthUserByEmail = gql`
  mutation CreateNextAuthAuthourByEmail($email: String!, $password: String!) {
    createAuthor(data: { email: $email, password: $password }) {
      id
    }
  }
`;
