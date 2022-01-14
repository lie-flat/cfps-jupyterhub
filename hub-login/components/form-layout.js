import React from "react";
import StyledJupyterIcon from "./jupyter-icon";
import Title from "./title";
import Link from "next/link";
import StyledLink from "./styled-link";
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