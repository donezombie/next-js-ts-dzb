import React, { ReactElement } from "react";
import Footer from "components/Footer";
import Header from "components/Header";

interface DefaultLayoutI {
  children: ReactElement;
}

const DefaultLayout: React.FC<DefaultLayoutI> = ({ children }) => {
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
