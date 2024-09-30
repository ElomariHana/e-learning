import React, { Fragment } from "react";

import { Navbar, Courses, HeroSection, CompanySection, AboutUs, ChooseUs, Features, Announcements, Testimonials, Footer } from '../components';


const Home = () => {
  return (
    <Fragment>
      <Navbar />
      <HeroSection />
      <CompanySection />
      <AboutUs />
      <Courses />
      <ChooseUs />
      <Features />
      <Announcements />
      <Testimonials />
      <Footer />
    </Fragment>
  );
};

export default Home;
