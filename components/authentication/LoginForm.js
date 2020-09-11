import { useRef, useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { Input, Row, Space, Checkbox, Button, Form } from "antd";
import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";
// import { useRouter } from "next/router";
// import API from "../../API/API";

export const LoginForm = ({ showForgotPassword }) => {
  const form = useRef(null);
  const router = useRouter();
  const { loading, setLoading } = useState(false);
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
    // console.log("Success:", values);
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
                }}
              >
                <Input.Password />
              </Form.Item>
              <div className="spaced-between">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <motion.div
                  whileHover={hoverAnimation}
                  onClick={() => showForgotPassword()}
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
