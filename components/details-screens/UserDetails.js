import { faEdit, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, message, Row, Space } from "antd";
import Search from "antd/lib/input/Search";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import EditServices from "../edit-screens/EditServices";
import ContentInnerHeader from "../misc/ContentInnerHeader";

const OrganizationServices = ({
  userInfo,
  servicesContent,
  editServiceContent,
  telephonyFeatures,
}) => {
  const router = useRouter();

  const [fieldsValues, setFieldsValues] = useState({
    name: userInfo.firstName + " " + userInfo.lastName,
    email: userInfo.email,
  });

  const [editable, setEditable] = useState(servicesContent.editable);
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

  console.log(userInfo);

  const currentUserId = router.query.idOrg;

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">{servicesContent.title}</h1>
        </Row>
        <Search placeholder="Search..." enterButton style={{ width: 300 }} />

        <Space direction="horizontal" size="middle" className="flex-end">
          <Space direction="vertical">
            <h4>Name</h4>
            <Input
              style={{ width: 300 }}
              value={fieldsValues.name}
              disabled={!editable}
            />
          </Space>
          {!editable && (
            <Button
              type="primary"
              onClick={() => router.push("/list-users/edit/" + userInfo.id)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          )}

          <Space direction="vertical">
            <h4>DID</h4>
            <Input
              style={{ width: 300 }}
              value={fieldsValues.email}
              disabled={!editable}
            />
          </Space>

          <Space direction="vertical">
            <h4>Email</h4>
            <Input
              style={{ width: 300 }}
              value={fieldsValues.email}
              disabled={!editable}
            />
          </Space>
        </Space>

        <Space direction="vertical" size="large">
          <Space direction="vertical" size="small">
            <h4>List of enabled Services</h4>
            <EditServices
              editable={editable}
              serviceContent={editServiceContent}
            />
          </Space>
          <Space direction="vertical" size="small">
            <h4>Telephony Features</h4>
            <EditServices
              editable={editable}
              serviceContent={telephonyFeatures}
            />
          </Space>
        </Space>
      </Space>
    </div>
  );
};

OrganizationServices.propTypes = {
  // someData: PropTypes.string,
};

export default OrganizationServices;
