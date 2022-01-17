import React from "react";
import styled from "styled-components";

const RoundedImageContainer = styled.div`
  width: 95px;
  height: 95px;
  background-color: inherit;
  margin: 0 auto;
  margin-top: -100px;
  margin-bottom: 20px;
  border-radius: 50px;
  box-shadow: 0px 0px 2px #5f5f5f,
              0px 0px 0px 5px #ecf0f3,
              8px 8px 15px #a7aaaf,
             -8px -8px 15px #ffffff;

  & img {
    width: 100%;
    height: 100%;
  }
`
const StyledJupyterIcon = () => (
    <RoundedImageContainer>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon-jupyter.svg" alt="Jupyter Logo"/>
    </RoundedImageContainer>
);

export default StyledJupyterIcon;