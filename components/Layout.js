import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Header from "./Header";

const styles = {
  paperContainer: {
    height: 900,
    width: 1600,
    backgroundPosition: "center",
    backgroundImage: `url(${"http://localhost:3000/static/src/img/p2.jpg"})`,
  },
};

export default (props) => {
  return (
    <div style={styles.paperContainer}>
      <Container>
        <Head>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
        </Head>

        <Header />
        {props.children}
      </Container>
    </div>
  );
};
