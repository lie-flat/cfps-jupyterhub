import React from 'react';
import {Form, Formik, Field} from "formik";
import FieldContainer from "../components/field-container";
import StyledButton from "../components/styled-button";
import StyledLink from "../components/styled-link";
import StyledErrorMessage from "../components/styled-error-message";
import axios from "axios";
import UserIcon from "../components/user-icon";
import PasswordIcon from "../components/password-icon";
import FormLayout from "../components/form-layout";
import Head from "next/head";

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
                        } else {
                            alert("不知道您想要登录什么应用程序，即将重定向到首页，要访问 JupyterHub, 请从主页访问。");
                            window.location.href = '/';
                        }
                    }).catch(err => {
                        if (err?.response?.status === 429) {
                            helpers.setFieldError('username', '休息一下吧，您的请求过于频繁');
                        } else if (err?.response?.data?.detail) {
                            const detail = err.response.data.detail;
                            if (typeof detail == "string") {
                                helpers.setFieldError('username', detail);
                            } else {
                                helpers.setFieldError('username', "请输入用户名和密码！");
                            }
                        } else {
                            helpers.setFieldError('username', '我们这边出现了一些问题，请联系网站管理员');
                        }
                        helpers.setSubmitting(false);
                    });
                }}>
            {({isSubmitting}) => (<Form>
                <FieldContainer>
                    <UserIcon/>
                    <Field type="text" name="username" placeholder="请输入用户名" required/>
                </FieldContainer>
                <StyledErrorMessage name="username" component="div"/>
                <FieldContainer>
                    <PasswordIcon/>
                    <Field type="password" name="password" placeholder="请输入密码" required/>
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
            <Head>
                <title>登录</title>
            </Head>
            <StyledLink href="/register">没有帐号？点此注册</StyledLink>
        </FormLayout>
    );

}