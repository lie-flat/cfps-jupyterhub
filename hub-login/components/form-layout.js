import React from "react";
import StyledJupyterIcon from "./jupyter-icon";
import Title from "./title";
import Container from "./container";

export default function FormLayout({form, children}) {
    return (
        <Container>
            <StyledJupyterIcon/>
            <Title/>
            {form}
            {children}
        </Container>
    );
}