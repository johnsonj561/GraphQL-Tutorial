import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import fetchSongs from '../queries/fetchSongs';
import addSong from '../queries/addSong';
import { Page } from '../styled';

const CreateSong = props => {
  const [title, setTitle] = useState('');
  const onInputChange = ({ target }) => {
    setTitle(target.value);
  };
  const onSubmitForm = e => {
    e.preventDefault();
    console.log('Submitting', title);
    props
      .mutate({
        variables: {
          title,
        },
        refetchQueries: [{ query: fetchSongs }],
      })
      .then(() => props.history.push('/'));
  };
  console.log('Props', props);
  return (
    <Page>
      <Link className="btn waves-effect waves-light" to="/">
        Back
      </Link>
      <h2>Create a New Song</h2>
      <form onSubmit={onSubmitForm}>
        <label>Song Title:</label>
        <input autoFocus type="text" onChange={onInputChange} value={title} />
      </form>
    </Page>
  );
};

export default withRouter(graphql(addSong)(CreateSong));
