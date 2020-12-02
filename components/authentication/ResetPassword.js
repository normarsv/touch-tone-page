import { useRef, useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { Input, Row, Space, Checkbox, Button, Form } from "antd";
import { useRouter } from "next/dist/client/router";
import ContentInnerHeader from "../misc/ContentInnerHeader";
// import { useRouter } from "next/router";
// import API from "../../API/API";

export const ResetPassword = ({ showForgotPassword }) => {
  const form = useRef(null);
  const router = useRouter();
  const { loading, setLoading } = useState(false);

  const onFinish = (values) => {
    // console.log("Success:", values);
    router.push("/main");
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Space direction="vertical">
        <ContentInnerHeader setBackOption />
        <Space direction="vertical" className="flex center">
          <div className="login-form-div">
            <div className="login-form-content-div">
              <Space
                size="middle"
                direction="vertical"
                style={{ width: "100%" }}
              >
                <div>
                  <h2 className="title-style">Reset Password</h2>
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
                    <label>New Password</label>
                    <Form.Item
                      name="password1"
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
                      <Input.Password />
                    </Form.Item>
                    <label>Confirm New Password </label>
                    <Form.Item
                      name="password2"
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
                          Reset Password
                        </Button>
                      </Form.Item>
                    </div>
                  </Space>
                </Form>
              </Space>
            </div>
          </div>
        </Space>
      </Space>
    </>
  );
};

ResetPassword.propTypes = {};
