import { Button, Form, Input, message, Space } from "antd";
import { useRouter } from "next/dist/client/router";
import { useEffect, useRef, useState } from "react";

import API from "../../API/API";
import ContentInnerHeader from "../misc/ContentInnerHeader";

// import PropTypes from "prop-types";
// import { useRouter } from "next/router";
// import API from "../../API/API";

export const ResetPassword = ({ user }) => {
  const form = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    console.log(values);
    console.log(user);
    const api = new API(user.token);
    const changePass = await api.POST("/AuthUsers/ResetPassword", {
      password: values.password,
    });
    console.log(changePass);
    message.success("Updated Password Successfully!");
    setLoading(false);
    // console.log("Success:", values);
    //router.push('/main');
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
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Insert Password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{9,})/i.test(
                                value
                              )
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "At least 9 characters, one uppercase and one number"
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password disabled={loading} />
                    </Form.Item>
                    <label>Confirm New Password </label>
                    <Form.Item
                      name="confirmPassword"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "The two passwords that you entered do not match!"
                            );
                          },
                        }),
                      ]}
                      style={{
                        width: "100%",
                        marginBottom: 0,
                      }}
                    >
                      <Input.Password disabled={loading} />
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
                          loading={loading}
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
