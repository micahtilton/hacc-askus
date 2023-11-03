import React from "react";
import { Col, Container } from "react-bootstrap";
import { useTracker } from "meteor/react-meteor-data";
import { ResolvedCollection } from "../../../api/ResolvedCollection";
import FAQRow from "./FAQRow";
import AddFAQModal from "./AddFAQModal";

Meteor.subscribe("resolved");

const ManageFAQPage = () => {
  const faqs = useTracker(() => ResolvedCollection.find({}).fetch());

  return (
    <Container>
      <Col className={"d-flex justify-content-center pt-3"}>
        <AddFAQModal />
      </Col>
      <Col>
        {faqs.map((faq, index) => (
          <FAQRow faq={faq} index={index} />
        ))}
      </Col>
    </Container>
  );
};

export default ManageFAQPage;
