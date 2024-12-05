import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser($data: GetUserInput!) {
    getUser(data: $data) {
      id
      name
      email
    }
  }
`;
