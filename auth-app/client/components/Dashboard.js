import React from 'react';
import { graphql } from 'react-apollo';
import { getUser } from '../queries';
import useProtectedRoute from '../hooks/useProtectedRoute';

const Dashboard = props => {
  useProtectedRoute(props);
  if (!props.data.user) {
    return null;
  }
  const { email } = props.data.user;
  const message = `${email} logged in`;
  return (
    <div className="container">
      <h3>{message}</h3>
    </div>
  );
};

export default graphql(getUser)(Dashboard);
