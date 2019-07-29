import React from 'react';
import { graphql } from 'react-apollo';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getUser } from '../queries';
import { logout } from '../mutations';

const Header = props => {
  const { loading, user } = props.data;
  const isLoggedOut = !loading && !user;
  const isLoggedIn = !loading && !!user;

  console.log(props);
  const onLogout = () => {
    props.mutate({
      refetchQueries: [{ query: getUser }],
    });
  };

  return (
    <Nav className="nav-wrapper">
      <Link to="/">Home</Link>
      <ul className="right">
        {isLoggedOut && (
          <React.Fragment>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </React.Fragment>
        )}
        {isLoggedIn && (
          <li>
            <a onClick={onLogout}>Logout</a>
          </li>
        )}
      </ul>
    </Nav>
  );
};

const Nav = styled.nav`
  padding: 0px 10px;
`;

const NavButton = styled.button``;

export default graphql(logout)(graphql(getUser)(Header));
