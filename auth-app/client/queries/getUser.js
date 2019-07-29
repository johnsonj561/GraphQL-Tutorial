import gql from 'graphql-tag';

export const getUser = gql`
  query {
    user {
      id
      email
    }
  }
`;
