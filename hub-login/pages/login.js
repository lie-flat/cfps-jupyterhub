import React from 'react';
import Link from 'next/link';
import {Form, Formik, Field, ErrorMessage} from "formik";
import Container from "../components/container";
import Title from "../components/title";
import FieldContainer from "../components/field-container";
import StyledButton from "../components/styled-button";
import StyledLink from "../components/styled-link";
import StyledJupyterIcon from "../components/jupyter-icon";


export default function Login() {
    const form = (<Formik initialValues={{username: '', password: ''}}
                          onSubmit={(values, helpers) => {
                              console.log(values);
                              helpers.setSubmitting(false);
                          }}>
        {({isSubmitting}) => (<Form>
            <FieldContainer>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
                     id="Layer_1" x="0px" y="0px" viewBox="0 0 459 459"
                     xmlSpace="preserve">
                    <g>
                        <g>
                            <path
                                d="M229.5,0C102.53,0,0,102.845,0,229.5C0,356.301,102.719,459,229.5,459C356.851,459,459,355.815,459,229.5    C459,102.547,356.079,0,229.5,0z M347.601,364.67C314.887,393.338,273.4,409,229.5,409c-43.892,0-85.372-15.657-118.083-44.314    c-4.425-3.876-6.425-9.834-5.245-15.597c11.3-55.195,46.457-98.725,91.209-113.047C174.028,222.218,158,193.817,158,161    c0-46.392,32.012-84,71.5-84c39.488,0,71.5,37.608,71.5,84c0,32.812-16.023,61.209-39.369,75.035    c44.751,14.319,79.909,57.848,91.213,113.038C354.023,354.828,352.019,360.798,347.601,364.67z"/>
                        </g>
                    </g>
                </svg>
                <Field type="text" name="username" placeholder="请输入用户名" required/>
                <ErrorMessage name="username" component="div"/>
            </FieldContainer>
            <ErrorMessage name="username" component="div"/>
            <FieldContainer>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"
                     id="Capa_1" x="0px" y="0px" viewBox="0 0 203.096 203.096"
                     xmlSpace="preserve">
                    <g>
                        <path
                            d="M153.976,73.236h-3.308V49.115C150.669,22.033,128.634,0,101.549,0C74.465,0,52.43,22.033,52.43,49.115v24.121H49.12   c-9.649,0-17.5,7.851-17.5,17.5v94.859c0,9.649,7.851,17.5,17.5,17.5h104.856c9.649,0,17.5-7.851,17.5-17.5V90.736   C171.476,81.087,163.626,73.236,153.976,73.236z M67.43,49.115C67.43,30.304,82.736,15,101.549,15   c18.813,0,34.119,15.304,34.119,34.115v24.121H67.43V49.115z M156.476,185.596c0,1.355-1.145,2.5-2.5,2.5H49.12   c-1.355,0-2.5-1.145-2.5-2.5V90.736c0-1.355,1.145-2.5,2.5-2.5H59.93h83.238h10.808c1.355,0,2.5,1.145,2.5,2.5V185.596z"/>
                        <path
                            d="M101.547,116.309c-4.142,0-7.5,3.357-7.5,7.5v28.715c0,4.143,3.358,7.5,7.5,7.5c4.142,0,7.5-3.357,7.5-7.5v-28.715   C109.047,119.666,105.689,116.309,101.547,116.309z"/>
                    </g>
                </svg>
                <Field type="text" name="password" placeholder="请输入密码"/>
                <ErrorMessage name="password" component="div"/>
            </FieldContainer>
            <ErrorMessage name="password" component="div"/>
            <StyledButton type="submit" disabled={isSubmitting}>
                登录
            </StyledButton>
        </Form>)}
    </Formik>);

    return (<Container>
        <StyledJupyterIcon/>
        <Title/>
        {form}
        <Link href="/register" passHref>
            <StyledLink>注册</StyledLink>
        </Link>
    </Container>);

}