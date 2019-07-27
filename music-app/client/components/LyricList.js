import React from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { Icon } from '../styled';
import { likeLyric } from '../queries';

const LyricList = props => {
  const onLike = (id, currentLikes) => () => {
    const variables = { id };
    const likes = currentLikes + 1;
    const optimisticResponse = {
      __typename: 'Mutation',
      likeLyric: { id, __typename: 'LyricType', likes },
    };
    props.mutate({ variables, optimisticResponse });
  };
  console.log(props);
  return (
    <ul className="collection">
      {props.lyrics.map(({ id, content, likes }) => (
        <Row key={id} className="collection-item">
          {content || '---'}
          <LikesContainer>
            <Icon className="material-icons" onClick={onLike(id, likes)}>
              thumb_up
            </Icon>
            <LikeCount>{likes}</LikeCount>
          </LikesContainer>
        </Row>
      ))}
    </ul>
  );
};

const Row = styled.li`
  display: flex;
  justify-content: space-between;
`;

const LikesContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LikeCount = styled.span`
  text-align: center;
  width: 30px;
`;

export default graphql(likeLyric)(LyricList);
