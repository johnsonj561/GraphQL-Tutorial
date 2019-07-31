import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import { signup } from '../mutations';
import { getUser } from '../queries';
import useLoginRedirect from '../hooks/useLoginRedirect';

const SignupForm = props => {
  const [errors, setErrors] = useState([]);

  useLoginRedirect(props);

  const onSubmit = (email, password) => {
    setErrors([]);
    props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query: getUser }],
      })
      .catch(err => {
        const errors = err.graphQLErrors.map(e => e.message);
        setErrors(errors);
      });
  };

  return (
    <div className="container">
      <h3>Sign Up</h3>
      <AuthForm onSubmit={onSubmit} errors={errors} />
    </div>
  );
};

export default graphql(getUser)(graphql(signup)(SignupForm));
