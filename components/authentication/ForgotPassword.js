import { useRef, useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { Input, Row, Space, Checkbox, Button, Form, message } from "antd";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
// import { useRouter } from "next/router";
// import API from "../../API/API";

export const ForgotPassword = ({ showForgotPassword }) => {
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
    // router.push("/main");
    message.warning("Check your email for a link to restore your password");
    showForgotPassword();
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const hoverAnimation = {
    x: -2,
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
              <Space size="middle" direction="vertical">
                <h2 className="title-style">Forgot your password?</h2>
                <p>
                  Enter your Email and we will send you a link to change your
                  password
                </p>
              </Space>
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
                <label>Email Address</label>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Ingresa un Correo Valido",
                    },
                    {
                      required: true,
                      message: "Ingresa un Correo Valido",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <div className="spaced-between flex-wrap">
                  <motion.div whileHover={hoverAnimation}>
                    <Space
                      onClick={() => showForgotPassword()}
                      direction="horizontal"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                      Back to login
                    </Space>
                  </motion.div>
                </div>
                <div className='login-form-button'>
                <Form.Item>
                    <Button
                      // onClick={onCheck}
                      htmlType="submit"
                      style={{ width: "15rem" }}
                      type="primary"
                    >
                      Send Email Link
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

ForgotPassword.propTypes = {};
