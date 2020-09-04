import React from "react";
import PropTypes from "prop-types";
import Form from "antd/lib/form/Form";
import { Input, Row, Space, Checkbox, Button } from "antd";

export const LoginForm = ({}) => {
  return (
    <div className="login-main-div">
      <div className="login-form-div">
        <div
          style={{ width: "65%", display: "flex", justifyContent: "center" }}
        >
          <Space size="middle" direction="vertical" style={{ width: "100%" }}>
            <div>
              <h2 style={{ color: "#e4002b" }}>Log In</h2>
            </div>
            <Form>
              <Space
                size="middle"
                direction="vertical"
                style={{ width: "100%" }}
              >
                <label> Your Credential</label>
                <Input />
                <label> Password </label>
                <Input.Password />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Checkbox>Remember me</Checkbox>
                  <a>Forgot password?</a>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button style={{ width: "15rem" }} type="primary">
                    Log in
                  </Button>
                </div>
              </Space>
            </Form>
          </Space>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  someData: PropTypes.string,
};
