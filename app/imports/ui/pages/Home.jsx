import React from "react";
import { Container } from "react-bootstrap";

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container className="py-4 ">
    <h1>Ask Us</h1>
    <p>
      Ask Us is a knowledge base of frequently asked questions (FAQs) related to
      information technology. Enter keywords related to your question in the
      search box, then click on "Ask Us". FAQs that match the keywords will be
      displayed. Click on the match that best answers your question. Click on
      "Ask Us" again to return to the list of matches, or enter new keywords for
      a new search.
    </p>
  </Container>
);

export default Home;
