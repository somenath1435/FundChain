import React from 'react';
import { Container } from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default props => {
  const { isLogout } = props;
  return (
    <Menu fixed='top' >
      <Container>
        <Menu.Item as='a' header style={{ fontSize: '20px' }}>
          <Link route="/">
            FundChain
          </Link>
        </Menu.Item>

        {isLogout && (      <Menu.Menu position="right">
        <Link route="/" replace={true}>
          <a className="item">Logout</a>
        </Link>
      </Menu.Menu>)}
        {!isLogout && (        <Menu.Menu position="right">
          <Link route="/register">
            <a className="item">Register</a>
          </Link>

          <Link route="/login">
            <a className="item">Login</a>
          </Link>
        </Menu.Menu>)}

      </Container>
    </Menu>
  );
};
