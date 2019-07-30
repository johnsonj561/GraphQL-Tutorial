import gql from 'graphql-tag';

export const login = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;
