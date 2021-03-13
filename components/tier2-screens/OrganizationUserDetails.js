import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Row, Space } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import Search from "antd/lib/input/Search";
import EditServices from "../edit-screens/EditServices";

const OrganizationUserDetails = ({ telephonyFeatures, userInfo }) => {
  const [fieldsValues, setFieldsValues] = useState({
    name: userInfo.firstName + " " + userInfo.lastName,
    did: userInfo.did,
    email: userInfo.email,
  });

  console.log(userInfo);
  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">User Details</h1>
        </Row>
        <Search placeholder="Search..." enterButton style={{ width: 300 }} />

        <Space direction="horizontal" size="middle" className="flex-end">
          <Space direction="vertical">
            <h4>Name</h4>
            <Input
              style={{ width: 300 }}
              value={fieldsValues.name}
              disabled={true}
            />
          </Space>
          <Space direction="vertical">
            <h4>DID</h4>
            <Input
              style={{ width: 300 }}
              value={fieldsValues.did}
              disabled={true}
            />
          </Space>
          <Space direction="vertical">
            <h4>Email</h4>
            <Input
              style={{ width: 300 }}
              value={fieldsValues.email}
              disabled={true}
            />
          </Space>
          <Space direction="vertical">
            <h4>Personal URL</h4>
            <Input style={{ width: 300 }} disabled={true} />
          </Space>
        </Space>

        <Space direction="vertical" size="large">
          <Space direction="vertical" size="small">
            <h4>Features</h4>
            <EditServices editable={false} serviceContent={telephonyFeatures} />
          </Space>
        </Space>
      </Space>
    </div>
  );
};

OrganizationUserDetails.propTypes = {
  // someData: PropTypes.string
};

export default OrganizationUserDetails;
