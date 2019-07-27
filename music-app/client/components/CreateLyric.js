import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { addLyricToSong } from '../queries';

const CreateLyric = props => {
  const [content, setContent] = useState('');
  const onContentChange = ({ target }) => setContent(target.value);
  const onSubmit = e => {
    e.preventDefault();
    const { songId } = props;
    props.mutate({
      variables: { content, songId },
    });
    setContent('');
  };
  return (
    <form onSubmit={onSubmit}>
      <label>Add a Lyric</label>
      <input
        placeholder="Enter a new lyric..."
        type="text"
        value={content}
        onChange={onContentChange}
      />
    </form>
  );
};

export default graphql(addLyricToSong)(CreateLyric);
