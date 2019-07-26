import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';
import CreateSong from './components/CreateSong';

const cache = new InMemoryCache();
const uri = 'http://localhost:4000/graphql';
const link = new HttpLink({ uri });
const client = new ApolloClient({ cache, link });

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={SongList} />
          <Route exact path="/song/new" component={CreateSong} />
          <Redirect from="*" to="/" />
        </Switch>
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
