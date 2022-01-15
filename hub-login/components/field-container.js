import React from "react";
import styled from "styled-components";

const FieldContainer = styled.div`
height: 50px;
width: 100%;
display: flex;
position: relative;
margin-top: 20px;
& input {
  height: 100%;
  width: 100%;
  padding-left: 55px;
  font-size: 18px;
  outline: none;
  border: none;
  color: #595959;
  background: #dde1e7;
  border-radius: 25px;
  box-shadow: inset 2px 2px 5px #babecc,
              inset -5px -5px 10px #ffffff73;
}
& input:focus ~ label{
  box-shadow: inset 2px 2px 5px #babecc,
              inset -1px -1px 2px #ffffff73;
}

& svg {
  position: absolute;
  left: 13px;
  top: 11px;
  width: 28px;
  line-height: 30px;
  color: #595959;
}
`

export default FieldContainer;