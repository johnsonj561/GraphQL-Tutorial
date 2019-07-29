import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import Header from './components/Header';

const cache = new InMemoryCache();
const uri = 'http://localhost:4000/graphql';
const link = new HttpLink({ uri });
const client = new ApolloClient({ cache, link });

const Root = () => (
  <ApolloProvider client={client}>
    <HashRouter>
      <Switch>
        <Header />
        {/* <Route path="/" component={Header} /> */}
        <Route path="/" component={() => <div>Hello</div>} />
        <Redirect from="*" to="/" />
      </Switch>
    </HashRouter>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
