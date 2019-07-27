import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Page } from '../styled';
import { getSong } from '../queries';
import CreateLyric from './CreateLyric';
import LyricList from './LyricList';

const SongDetail = props => {
  if (props.data.loading) {
    return <div>Loading...</div>;
  }
  const { title, lyrics, id } = props.data.song;
  return (
    <Page>
      <Link className="btn waves-effect waves-light" to="/">
        Back
      </Link>
      <h2>{title}</h2>
      <LyricList lyrics={lyrics} />
      <CreateLyric songId={id} />
    </Page>
  );
};

export default graphql(getSong, {
  options: props => ({ variables: { id: props.match.params.id } }),
})(SongDetail);
