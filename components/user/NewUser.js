import { Button, Col, Divider, Input, message, Row, Space } from "antd";
import Search from "antd/lib/input/Search";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import EditServices from "../edit-screens/EditServices";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import NewUserFormCreator from "./NewUserFormCreator";

const NewUser = ({ userServicesForm, editServiceContent }) => {
  const router = useRouter();

  const key = "updatable";
  const openMessage = () => {
    message
      .loading("Action in progress..", 2.5)
      .then(() => message.success("User Created Succesfully!"))
      .then(() => router.back());
  };

  const pushRoute = () => {
    router.back();
  };

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">New User</h1>
        </Row>
        <Search placeholder="Role..." enterButton style={{ width: 300 }} />

        <Divider orientation="center" type="horizontal" />

        <Row gutter={[0, 20]} type="flex">
          {userServicesForm.map((item, index) => {
            return (
              <Col span={6}>
                <NewUserFormCreator
                  title={item.title}
                  type={item.type}
                  extraMsg={item.extraMsg}
                  icon={item.icon}
                />
              </Col>
            );
          })}
        </Row>

        <Space direction="vertical">
          <h4>List of enabled Services</h4>
          <EditServices editable serviceContent={editServiceContent} />
        </Space>
        <Row type="flex" justify="end">
          <Space size="large">
            <Button
              onClick={() => pushRoute()}
              className="primary-button-style cancel-button-style"
            >
              Cancel User
            </Button>
            <Button
              onClick={() => openMessage()}
              className="primary-button-style"
              type="primary"
            >
              Creating User
            </Button>
          </Space>
        </Row>
      </Space>
    </div>
  );
};

NewUser.propTypes = {
  // someData: PropTypes.string,
};

export default NewUser;
