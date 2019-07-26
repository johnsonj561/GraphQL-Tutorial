import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Page } from '../styled';
import getSong from '../queries/getSong';
import CreateLyric from './CreateLyric';

const SongDetail = props => {
  if (props.data.loading) {
    return <div>Loading...</div>;
  }
  const { title, lyrics } = props.data.song;
  return (
    <Page>
      <Link className="btn waves-effect waves-light" to="/">
        Back
      </Link>
      <h2>{title}</h2>
      <CreateLyric />
    </Page>
  );
};

export default graphql(getSong, {
  options: props => ({ variables: { id: props.match.params.id } }),
})(SongDetail);
