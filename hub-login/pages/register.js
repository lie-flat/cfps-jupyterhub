import React from 'react';
import {Form, Formik, Field} from "formik";
import FieldContainer from "../components/field-container";
import StyledButton from "../components/styled-button";
import StyledLink from "../components/styled-link";
import StyledErrorMessage from "../components/styled-error-message";
import axios from "axios";
import UserIcon from "../components/user-icon";
import PasswordIcon from "../components/password-icon";
import InviteCodeIcon from "../components/invite-code-icon";
import FormLayout from "../components/form-layout";
import Head from "next/head";

import {removeEmptyValues} from "../utils";

const validateUsername = username => {
    let error;
    if (username === 'admin') {
        error = '管理员不想让你起这个名字';
    } else if (!/^[a-zA-Z0-9_]{4,16}$/.test(username)) {
        error = "用户名长度应该在4-16位之间，只能由字母、数字或下划线组成";
    }
    return error;
}

const validatePassword = password => {
    let error;
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*_=|+-]).{8,128}$/.test(password)) {
        error = "密码长度应该在8-128位之间，必须包含大写字母、小写字母、数字和#?!@$%^&*_=|+-之中的至少一个特殊字符";
    }
    return error;
}

const validate = values => {
    const errors = {};
    errors.username = validateUsername(values.username);
    errors.pwd__first = validatePassword(values.pwd__first);
    if (values.pwd__first !== values.pwd__second) {
        errors.pwd__second = "两次输入的密码不一致";
    }
    removeEmptyValues(errors);
    return errors;
}

export default function Register() {
    const form = (
        <Formik initialValues={{username: '', pwd__first: '', pwd__second: '', invite_code: ''}}
                autoComplete={false}
                validate={validate}
                onSubmit={(values, helpers) => {
                    let r = axios.post('/api/user-register/', {
                        username: values.username,
                        password: values.pwd__first,
                        invite_code: values.invite_code
                    })
                    r.then(_ => {
                        alert("注册成功, 即将跳转到登录界面");
                        window.location.href = `${window.location.origin}/login${window.location.search}`;
                    }).catch(err => {
                        if (err?.response?.status === 429) {
                            helpers.setFieldError('username', '休息一下吧，您的注册请求过于频繁');
                        } else if (err?.response?.status === 418) {
                            helpers.setFieldError('invite_code', '无效的邀请码，不知道的话就别乱试了，你试不出来的，嘿嘿 (╯°□°）╯︵ ┻━┻');
                        } else if (err?.response?.data?.detail) {
                            const detail = err.response.data.detail;
                            if (typeof detail === 'string')
                                helpers.setFieldError('username', detail);
                        } else {
                            helpers.setFieldError('username', '我们这边出现了一些问题，请联系网站管理员');
                        }
                        helpers.setSubmitting(false);
                    });
                }}>
            {({isSubmitting}) => (<Form>
                <FieldContainer>
                    <UserIcon/>
                    <Field type="text" name="username" placeholder="请输入用户名"
                           autoComplete="off" required/>
                </FieldContainer>
                <StyledErrorMessage name="username" component="div"/>
                <FieldContainer>
                    <PasswordIcon/>
                    <Field type="password" name="pwd__first" placeholder="请输入密码"
                           autoComplete="off" required/>
                </FieldContainer>
                <StyledErrorMessage name="pwd__first" component="div"/>
                <FieldContainer>
                    <PasswordIcon/>
                    <Field type="password" name="pwd__second" placeholder="请再次输入密码" autoComplete="off" required/>
                </FieldContainer>
                <StyledErrorMessage name="pwd__second" component="div"/>
                <FieldContainer>
                    <InviteCodeIcon/>
                    <Field type="text" name="invite_code" placeholder="请输入邀请码" autoComplete="off" required/>
                </FieldContainer>
                <StyledErrorMessage name="invite_code" component="div"/>
                <StyledButton type="submit" disabled={isSubmitting}>
                    注册
                </StyledButton>
            </Form>)}
        </Formik>
    );

    return (
        <FormLayout form={form}>
            <Head>
                <title>注册</title>
            </Head>
            <StyledLink href="/login">已有帐号？点此登录</StyledLink>
        </FormLayout>
    );
}
