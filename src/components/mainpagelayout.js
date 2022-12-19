import React from "react";

import Navs from "./navs";
import Title from "./title";

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title
        title="BOX OFFICE"
        subtitle="ARE YOU LOOKING FOR A MOVIE OR AN ACTOR ?"
      />
      <Navs />
      {children}
    </div>
  );
};

export default MainPageLayout;
