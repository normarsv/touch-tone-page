import { faEdit, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, message, Row, Space } from "antd";
import Search from "antd/lib/input/Search";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import EditServices from "../edit-screens/EditServices";
import ContentInnerHeader from "../misc/ContentInnerHeader";

const ProvisioningScreen = ({
  organizationInfo,
  servicesContent,
  editServiceContent,
}) => {
  const router = useRouter();
  // const [editable, setEditable] = useState(false);
  const [fieldsValues, setFieldsValues] = useState({
    name: "test",
    billingId: "65478",
  });

  const key = "updatable";
  const openMessage = () => {
    message.loading({ content: "Saving changes...", key });
    setTimeout(() => {
      message.success({
        content: "Changes Saved Successfully!",
        key,
        duration: 3,
      });
    }, 2000);
  };

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Organizations to Provision</h1>
        </Row>

        <Space direction="horizontal" size="middle" className="flex-end">
          <Space direction="vertical">
            <h4>Name</h4>
            <Input style={{ width: 300 }} value={fieldsValues.name} />
          </Space>
          <Space direction="vertical">
            <h4>Account Number in Rev.io</h4>
            <Input style={{ width: 300 }} value={fieldsValues.billingId} />
          </Space>
        </Space>

        <Row type="flex" justify="end">
          <Button
            // onClick={() => }
            className="primary-button-style"
            type="primary"
          >
            Provision
          </Button>
        </Row>
      </Space>
    </div>
  );
};

ProvisioningScreen.propTypes = {
  // someData: PropTypes.string,
};

export default ProvisioningScreen;
