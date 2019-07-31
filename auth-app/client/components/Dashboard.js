import React from 'react';
import { graphql } from 'react-apollo';
import { getUser } from '../queries';
import useProtectedRoute from '../hooks/useProtectedRoute';

const Dashboard = props => {
  useProtectedRoute(props);
  return (
    <div className="container">
      <h2>You are logged in!</h2>
    </div>
  );
};

export default graphql(getUser)(Dashboard);
