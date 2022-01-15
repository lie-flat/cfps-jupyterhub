import React from 'react';
import {Form, Formik, Field, ErrorMessage} from "formik";
import Container from "../components/container";
import Title from "../components/title";
import FieldContainer from "../components/field-container";
import StyledButton from "../components/styled-button";
import StyledLink from "../components/styled-link";
import StyledErrorMessage from "../components/styled-error-message";
import StyledJupyterIcon from "../components/jupyter-icon";
import axios from "axios";
import UserIcon from "../components/user-icon";
import PasswordIcon from "../components/password-icon";
import FormLayout from "../components/form-layout";

const getParams = () => {
    return new URLSearchParams(window.location.search);
}

export default function Login() {
    const form = (
        <Formik initialValues={{username: '', password: ''}}
                onSubmit={(values, helpers) => {
                    let formData = new FormData();
                    formData.append('username', values.username);
                    formData.append('password', values.password);
                    let params = getParams();
                    let r = axios.post('/api/user-login', formData)
                    r.then(res => {
                        let redirect_uri = params.get('redirect_uri');
                        if (redirect_uri) {
                            redirect_uri += '?code=' + res.data.access_token + '&state=' + params.get('state');
                            window.location.href = redirect_uri;
                        }
                    }).catch(err => {
                        if (err?.response?.data?.detail) {
                            helpers.setFieldError('username', err.response.data.detail);
                        } else {
                            helpers.setFieldError('username', '我们这边出现了一些问题，请联系网站管理员');
                        }
                    });
                    helpers.setSubmitting(false);
                }}>
            {({isSubmitting}) => (<Form>
                <FieldContainer>
                    <UserIcon/>
                    <Field type="text" name="username" placeholder="请输入用户名" required/>
                </FieldContainer>
                <StyledErrorMessage name="username" component="div"/>
                <FieldContainer>
                    <PasswordIcon/>
                    <Field type="password" name="password" placeholder="请输入密码"/>
                </FieldContainer>
                <StyledErrorMessage name="password" component="div"/>
                <StyledButton type="submit" disabled={isSubmitting}>
                    登录
                </StyledButton>
            </Form>)}
        </Formik>
    );

    return (
        <FormLayout form={form}>
            <StyledLink href="/register">注册</StyledLink>
        </FormLayout>
    );

}