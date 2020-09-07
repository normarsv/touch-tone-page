import { useRef, useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { Input, Row, Space, Checkbox, Button, Form } from "antd";
import { Router } from "express";
// import { useRouter } from "next/router";
// import API from "../../API/API";

export const LoginForm = ({}) => {
  const form = useRef(null);
  const router = useRouter();
  const { loading, setLoading } = useState(false);
  const { onLogin, setLogin } = useState(true);

  // useEffect(() => {
  //   const onCheck = async () => {
  //     try {
  //       const values = await form.current.validateFields();
  //       onFinish(values);
  //     } catch (errorInfo) {}
  //   };
  //   const onFinish = async (values) => {
  //     if (onLogin === true) {
  //       console.log("test");
  //       // onFinishLogin(values);
  //     } else {
  //       // onFinishResetPassword(values)
  //     }
  //   };
  // }, []);

  // const onFinishLogin = async (values) => {
  //   let api = new API();
  // };

  const onFinish = (values) => {
    console.log("Success:", values);
    // router.push("/main");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-main-div">
      <div className="login-form-div">
        <div className="login-form-content-div">
          <Space size="middle" direction="vertical" style={{ width: "100%" }}>
            <div>
              <h2 className="title-style">Log In</h2>
            </div>
            <Form
              ref={form}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Space
                size="middle"
                direction="vertical"
                style={{ width: "100%" }}
              >
                <label> Your Credential</label>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Ingresa un Correo Valido",
                    },
                    {
                      required: true,
                      message: "Ingresa tu Correo Valido",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <label> Password </label>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Ingresa la contraseña",
                    },
                  ]}
                  style={{
                    width: "100%",
                    marginBottom: 0,
                  }}
                >
                  <Input.Password />
                </Form.Item>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a>Forgot password?</a>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Form.Item>
                    <Button
                      // onClick={onCheck}
                      htmlType="submit"
                      style={{ width: "15rem" }}
                      type="primary"
                    >
                      Log in
                    </Button>
                  </Form.Item>
                </div>
              </Space>
            </Form>
          </Space>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {};
