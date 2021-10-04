import Footer from "components/Footer";
import Header from "components/Header";
import React, { Fragment } from "react";

const DefaultLayout: React.FC = ({ children }) => {
  //! State

  //! Function

  //! Render
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
};

export default DefaultLayout;
