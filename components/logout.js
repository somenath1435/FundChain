import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

export default props => {
  return (
    <div>
      <Head>
        <title>FundChain</title>
        <link rel="icon" href="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/krinnxb23kgp75s0jyhp" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        />
      </Head>

      <Header isLogout={true}/>
      <Container text style={{ paddingTop: '7em'}}>
        {props.children}
      </Container>
    </div>
  );
};
