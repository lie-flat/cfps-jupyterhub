import React from "react";
import styled from "styled-components";
import {ErrorMessage} from "formik";


const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 1.1em;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
`

export default StyledErrorMessage;