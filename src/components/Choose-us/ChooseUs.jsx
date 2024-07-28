import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

import chooseImg from "../../assests/images/b3.png";
import "./choose-us.css";

import ReactPlayer from "react-player";

const ChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <section className="section__padding">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="choose__content">
              <h2>Why Select Us</h2>
              <p>
              At NetSecCloud Learn, we are committed to providing you with the best educational experience in networking, security, and cloud computing. Here’s why you should choose us:
              Hands-On Learning
Gain practical experience through hands-on projects and real-world scenarios. Our interactive courses ensure you can apply what you learn immediately.

Flexible Learning
Access our comprehensive course materials anytime, anywhere. Learn at your own pace with our on-demand video lessons and flexible learning schedules.

Global Community
Join a thriving community of learners and professionals from around the world. Engage in discussions, share your progress, and collaborate on projects.
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="choose__img">
              {showVideo ? (
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=qFp27TR4Yew"
                  controls
                  width="100%"
                  height="350px"
                />
              ) : (
                <img src={chooseImg} alt="" className="w-100" />
              )}

              {!showVideo && (
                <span className="play__icon">
                  <i
                    class="ri-play-circle-line"
                    onClick={() => setShowVideo(!showVideo)}
                  ></i>
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChooseUs;
