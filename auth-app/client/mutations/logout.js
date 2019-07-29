import gql from 'graphql-tag';

export const logout = gql`
  mutation Logout {
    logout {
      email
    }
  }
`;
