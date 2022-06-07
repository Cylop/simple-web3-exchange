import { Anchor, Grommet, Main, Nav } from 'grommet';
import { NavLink } from 'react-router-dom';
import './App.scss';

import { FaHome } from 'react-icons/fa';

import AppRouter from './routers/application.router';

const App: React.FC = () => (
  <Grommet>
    <Nav direction="row" background="brand" pad="medium">
      <NavLink to="">
        <Anchor icon={<FaHome />} label="Home" />
      </NavLink>
      <NavLink to="">
        <Anchor>Trading</Anchor>
      </NavLink>

      <NavLink to="deposit">
        <Anchor>Deposit</Anchor>
      </NavLink>
    </Nav>
    <Main>
      <AppRouter />
    </Main>
  </Grommet>
);

export default App;
