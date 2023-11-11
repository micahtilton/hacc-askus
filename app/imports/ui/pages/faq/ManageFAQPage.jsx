import React from "react";
import { Col, Container } from "react-bootstrap";
import { useTracker } from "meteor/react-meteor-data";
import { FAQCollection } from "../../../api/FAQCollection";
import FAQRow from "./FAQRow";
import AddFAQModal from "./AddFAQModal";

Meteor.subscribe("resolved");

const ManageFAQPage = () => {
  // Get the FAQs from the database if there are any
  const faqs = useTracker(() => FAQCollection.find({}).fetch());

  // Renders the FAQ page
  return (
    <Container>
      <Col className={"d-flex justify-content-center p-2"}>
        <AddFAQModal />
      </Col>


      {faqs.length === 0 && (
        // If there are no FAQs in the database, display this message
        <Col>
          <h1 className={"text-center"}>No FAQ's in Database</h1>
        </Col>
      )}

      <Col>
        {faqs.map((faq, index) => (
          <FAQRow faq={faq} index={index} />
        ))}
      </Col>
    </Container>
  );
};

export default ManageFAQPage;
