import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./features.css";

const FeatureData = [
  {
    title: "Quick Learning",
    desc: "Our courses are designed to provide you with efficient, effective learning experiences that quickly enhance your skills and knowledge. Whether you're a beginner or an experienced professional, our streamlined content helps you grasp complex concepts with ease and speed.",
    icon: "ri-draft-line",
  },

  {
    title: "All Time Support",
    desc: "We offer comprehensive support to our learners at all times. Whether you have questions about course material, need help with a project, or seek career advice, our dedicated support team is here to assist you.",
    icon: "ri-discuss-line",
  },

  {
    title: "Expert-Led Courses",
    desc: "Learn from a seasoned Network and Security Engineer with years of industry experience. Our courses are designed to provide you with practical skills and real-world knowledge.",
    icon: "ri-contacts-book-line",
  },
];

const Features = () => {
  return (
    <section>
      <Container>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div className="single__feature text-center px-4">
                <h2 className="mb-3">
                  <i class={item.icon}></i>
                </h2>
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
