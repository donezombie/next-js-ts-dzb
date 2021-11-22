import Footer from "components/Footer";
import Header from "components/Header";
import React, { Fragment } from "react";

const DefaultLayout: React.FC = ({ children }) => {
  //! State

  //! Function

  //! Render
  return (
    <div id="root">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
