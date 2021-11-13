import React from "react";
import { Container } from "semantic-ui-react";
import Head from "next/head";
import Logout from "./logout";

const styles = {
  paperContainer: {
    height: "100vh",
    width: "100%",
    backgroundPosition: "center",
    // background: "#444",
    // backgroundImage: `url(${"http://localhost:3000/static/src/img/p2.jpg"})`,
    backgroundImage: `url(${"https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80"})`,
  },
};

export default (props) => {
  return (
    <div style={styles.paperContainer}>
      <Container>
        <Head>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
        </Head>

        <Logout />
        {props.children}
      </Container>
    </div>
  );
};
