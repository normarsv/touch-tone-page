import { Button, Col, Divider, message, Row, Select, Space } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import NewUserFormCreator from "./NewUserFormCreator";

const { Option } = Select;

const NewUser = ({ formsByUserSelected, editServiceContent }) => {
  const [formToDisplay, setFormToDisplay] = useState();

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

  const roleToSelect = [
    { id: 1, name: "Business Support", value: "businessSupport" },
    { id: 2, name: "Distributor", value: "distributor" },
    { id: 3, name: "Organization Admin", value: "organizationAdmin" },
    { id: 4, name: "Enterprise", value: "enterprise" },
    { id: 5, name: "End User", value: "endUser" },
  ];

  function renderForm(value) {
    value === "businessSupport" || value === "distributor"
      ? setFormToDisplay(formsByUserSelected.businessDistributor)
      : value === "organizationAdmin" || value === "enterprise"
      ? setFormToDisplay(formsByUserSelected.orgAdminEnterprise)
      : setFormToDisplay(formsByUserSelected.newEndUser);
  }

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">New User</h1>
        </Row>
        <Select
          onChange={(value) => renderForm(value)}
          placeholder="Select Role..."
          className="select-arrow-boxes"
        >
          {roleToSelect.map((item, index) => {
            return (
              <Option key={index} value={item.value}>
                {item.name}
              </Option>
            );
          })}
        </Select>

        <Divider orientation="center" type="horizontal" />

        <Row gutter={[0, 20]} type="flex">
          {formToDisplay &&
            formToDisplay.map((item, index) => {
              console.log(item);
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

        <Row type="flex" justify="end">
          <Space size="large">
            <Button
              onClick={() => pushRoute()}
              className="primary-button-style cancel"
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
