import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import fetchSongs from '../queries/fetchSongs';

const SongList = props => {
  const onSongDelete = id => () =>
    props.mutate({ variables: { id } }).then(() => props.data.refetch());

  const { data } = props;
  if (data.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Song List</h1>
      <div className="card">
        <ul className="collection">
          {!data.songs.length && (
            <li className="collection-item">Add a song to get started</li>
          )}
          {!!data.songs &&
            data.songs.map(({ id, title }) => (
              <li className="collection-item" key={id}>
                {title}
                <i className="material-icons" onClick={onSongDelete(id)}>
                  delete
                </i>
              </li>
            ))}
        </ul>
      </div>
      <div className="fixed-action-btn">
        <Link className="btn-floating btn-large" to="songs/new">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-color: whitesmoke;
  height: 100vh;
  padding: 25;
`;

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongs)(SongList));
