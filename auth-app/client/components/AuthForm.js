import React, { useState } from 'react';
import styled from 'styled-components';

const AuthForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onInputChange = method => ({ target }) => method(target.value);

  const onSubmit = e => {
    e.preventDefault();
    props.onSubmit(email, password);
  };

  return (
    <div className="row">
      <form className="col s6" onSubmit={onSubmit}>
        <div className="input-field">
          <input
            placeholder="email"
            type="text"
            value={email}
            onChange={onInputChange(setEmail)}
          />
        </div>
        <div className="input-field">
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={onInputChange(setPassword)}
          />
        </div>
        {props.errors.map(error => (
          <ErrorMessage key={error}>{error}</ErrorMessage>
        ))}
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

const ErrorMessage = styled.div`
  color: red;
`;

export default AuthForm;
