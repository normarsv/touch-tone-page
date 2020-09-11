import { Button, Checkbox, Form, Input, message, Space } from 'antd';
import { motion } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useRef, useState } from 'react';

import API from '../../API/API';
import { saveAppUser } from '../../scripts/General';

// import PropTypes from "prop-types";
// import { useRouter } from "next/router";
// import API from "../../API/API";

export const LoginForm = ({ showForgotPassword }) => {
  const form = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { onLogin, setLogin } = useState(true);
  const [showLogin, setShowLogin] = useState(true);

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
  const onFinish = async (values) => {
    setLoading(true);
    console.log("Success:", values);
    const api = new API();
    const resLogin = await api.POST("/token/", {
      username: values.email,
      password: values.password,
    });
    console.log(resLogin);
    if (resLogin.statusCode === 401) {
      message.error(resLogin.detail);
      setLoading(false);
      return;
    }
    const resString = JSON.stringify(resLogin);
    saveAppUser(resString);
    router.push("/list-organizations");
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  const hoverAnimation = {
    scale: 1.01,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
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
              name="basic"
              ref={form}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <label> Your Credential</label>
              <Form.Item
                name="email"
                rules={[
                  /*{
                    type: "email",
                    message: "Ingresa un Correo Valido",
                  },*/
                  {
                    required: true,
                    message: "Ingresa tu Correo Valido",
                  },
                ]}
              >
                <Input disabled={loading} />
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
                }}
              >
                <Input.Password disabled={loading} />
              </Form.Item>
              <div className="spaced-between">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox disabled={loading}>Remember me</Checkbox>
                </Form.Item>
                <motion.div
                  whileHover={hoverAnimation}
                  onClick={() => {
                    if (loading === false) {
                      showForgotPassword();
                    }
                  }}
                >
                  Forgot password?
                </motion.div>
              </div>
              <div className="login-form-button">
                <Form.Item>
                  <Button
                    // onClick={onCheck}
                    htmlType="submit"
                    style={{ width: "15rem" }}
                    type="primary"
                    loading={loading}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Space>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {};
