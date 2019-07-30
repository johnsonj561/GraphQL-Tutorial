import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import { signup } from '../mutations';
import { getUser } from '../queries';

const SignupForm = props => {
  const [errors, setErrors] = useState([]);

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

export default graphql(signup)(SignupForm);
