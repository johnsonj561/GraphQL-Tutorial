import gql from 'graphql-tag';

export const getSongs = gql`
  {
    songs {
      title
      id
    }
  }
`;
