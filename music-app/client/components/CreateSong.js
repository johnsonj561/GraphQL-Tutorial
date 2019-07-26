import React, { useState } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import fetchSongs from '../queries/fetchSongs';

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
    <Container>
      <Link className="btn waves-effect waves-light" to="/">
        Back
      </Link>
      <h2>Create a New Song</h2>
      <form onSubmit={onSubmitForm}>
        <label>Song Title:</label>
        <input type="text" onChange={onInputChange} value={title} />
      </form>
    </Container>
  );
};

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const Container = styled.div`
  background-color: whitesmoke;
  height: 100vh;
  padding: 25;
`;

export default withRouter(graphql(mutation)(CreateSong));
