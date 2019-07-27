import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getSongs, deleteSong } from '../queries';
import { Page, Icon } from '../styled';

const SongList = props => {
  const onSongDelete = id => e => {
    props.mutate({ variables: { id } }).then(() => props.data.refetch());
  };

  const { data } = props;
  if (data.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      <h2>Song List</h2>
      <div className="card">
        <ul className="collection">
          {!data.songs.length && (
            <li className="collection-item">Add a song to get started</li>
          )}
          {!!data.songs &&
            data.songs.map(({ id, title }) => (
              <Row className="collection-item" key={id}>
                <SongTitle to={`/songs/${id}`}>{title}</SongTitle>
                <Icon className="material-icons" onClick={onSongDelete(id)}>
                  delete
                </Icon>
              </Row>
            ))}
        </ul>
      </div>
      <div className="fixed-action-btn">
        <Link className="btn-floating btn-large" to="songs/new">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </Page>
  );
};

const Row = styled.li`
  display: flex;
  justify-content: space-between;
`;

const SongTitle = styled(Link)`
  color: black;
  cursor: pointer;
  &:hover {
    color: #26a69a;
  }
`;

export default graphql(deleteSong)(graphql(getSongs)(SongList));
