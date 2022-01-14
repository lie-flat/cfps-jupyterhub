import React from "react";
import styled from "styled-components";

const StyledLink = styled.a`
  margin: 25px 0 0 0;
  width: 100%;
  display: block;
  height: 50px;
  color: #000;
  font-size: 18px;
  font-weight: 600;
  background: #dde1e7;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 25px;
  box-shadow: 2px 2px 5px #babecc,
              -5px -5px 10px #ffffff73;
  line-height: 50px;
  &:focus {
    color: #3498db;
    box-shadow: inset 2px 2px 5px #babecc,
                inset -5px -5px 10px #ffffff73;
  }
`

export default StyledLink;