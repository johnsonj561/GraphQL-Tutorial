import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

class SongList extends React.Component {
  render() {
    const { data } = this.props;
    console.log('Data', data);

    if (data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <Container>
        <h1>Song List</h1>
        <ul>
          {!!data.songs &&
            data.songs.map(song => <li key={song.id}>{song.title}</li>)}
        </ul>
      </Container>
    );
  }
}

const query = gql`
  {
    songs {
      title
      id
    }
  }
`;

const Container = styled.div`
  background-color: whitesmoke;
  height: 100vh;
  padding: 20;
`;

export default graphql(query)(SongList);
