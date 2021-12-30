import React from "react";
import { StyledContainer } from "./StyledContainer";

const Container = ({ children }) => {
  return <StyledContainer className="finder">{children}</StyledContainer>;
};

export default Container;
