import { Grommet, Header, Heading, Main } from 'grommet';
import * as React from 'react';
import './App.scss';
import AppRouter from './routers/application.router';

const App: React.FC = () => (
  <Grommet>
    <Header alignContent="center" background="brand">
      <Heading>Test</Heading>
    </Header>
    <Main>
      <AppRouter />
    </Main>
  </Grommet>
);

export default App;
