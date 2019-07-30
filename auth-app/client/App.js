import React from 'react';
import Header from './components/Header';

const App = ({ children }) => (
  <div>
    <Header />
    <div className="container">{children}</div>
  </div>
);

export default App;
