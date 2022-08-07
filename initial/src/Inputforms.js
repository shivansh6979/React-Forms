import React, { useState } from "react";
import { Form, Button, Checkbox, Input, message } from "antd";
import "antd/dist/antd.min.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { constant } from "./constants/constants";
import axios from "axios";
import Image from "./Image";

const Inputforms = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const {
    baseUrl,
    emailError,
    login,
    logo,
    successMsg,
    forgot_pass,
    freeTrial,
    paragraph,
    greet,
    remember,
    passError,
  } = constant;

  const onFinish = () => {
    axios
      .post(`${baseUrl}login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res?.data?.token) {
          message.success(`${successMsg}`);
        }
      })
      .catch((error) => {
        message.error(error?.response?.data?.error);
      })
      .finally(() => {
        form.resetFields();
      });
  };

  return (
    <>
      <header className="flex my-1">
        <h1 className="logo">
          {logo}
          <span style={{ color: "orange" }}>.</span>
        </h1>
        <ul className="list flex-list ">
          <li style={{ backgroundColor: "#00416A" }} className="mx-1">
            {freeTrial}
          </li>
          <li className="loginBtn mx-1">{login}</li>
        </ul>
      </header>

      <div className="flex-content">
        <div className="form-edit">
          <h1 className="greet">{greet}</h1>
          <p className="paragraph">{paragraph}</p>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              rules={[
                {
                  required: true,
                  message: emailError,
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email Address *"
              />
            </Form.Item>
            <Form.Item
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rules={[
                {
                  required: true,
                  message: passError,
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon " />}
                type="password"
                placeholder="Password *"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>
                  <h4>{remember}</h4>
                </Checkbox>
              </Form.Item>

              <a
                className="login-form-forgot  "
                href="!#"
                style={{ color: "black", width: "" }}
              >
                <h4>{forgot_pass}</h4>
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="login-form-button"
                style={{ background: " #00416a", color: "white" }}
              >
                {login}
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Image />
      </div>
    </>
  );
};

export default Inputforms;
