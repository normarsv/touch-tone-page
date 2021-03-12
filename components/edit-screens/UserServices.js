import { faEdit, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, message, Row, Space } from "antd";
import Search from "antd/lib/input/Search";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import EditServices from "./EditServices";

const OrganizationServices = ({
  userInfo,
  servicesContent,
  editServiceContent,
}) => {
  const [editable, setEditable] = useState(servicesContent.editable);
  const [fieldsValues, setFieldsValues] = useState({
    name: userInfo.firstName + " " + userInfo.lastName,
    email: userInfo.email,
  });
  const router = useRouter();

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
          <h1 className="title-style">{servicesContent.title}</h1>
        </Row>

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
              onClick={() =>
                router.push("/list-organizations/edit/organizationName")
              }
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          )}
          <Space direction="vertical">
            <h4>Email</h4>
            <Input
              style={{ width: 300 }}
              value={fieldsValues.email}
              disabled={!editable}
            />
          </Space>

          {!editable && (
            <Space>
              <Button
                type="primary"
                className="primary-button-style alternate"
                onClick={() =>
                  router.push(
                    "/list-organizations/details/organizationName/list-dids"
                  )
                }
              >
                <Space>
                  <FontAwesomeIcon icon={faList} />
                  See List of DIDs
                </Space>
              </Button>
              <Button
                type="primary"
                className="primary-button-style alternate"
                onClick={() =>
                  router.push({
                    pathname: "/list-users",
                    query: { idOrg: "organizationName" },
                  })
                }
              >
                <Space>
                  <FontAwesomeIcon icon={faList} />
                  See List of all Users
                </Space>
              </Button>
            </Space>
          )}
        </Space>

        <Space direction="vertical">
          <h4>List of Enabled Services</h4>
          <EditServices
            editable={editable}
            serviceContent={editServiceContent}
          />
        </Space>
        <Row type="flex" justify="end">
          <Button
            onClick={openMessage}
            className="primary-button-style"
            type="primary"
          >
            {!editable ? "History Log" : "Save Changes"}
          </Button>
        </Row>
      </Space>
    </div>
  );
};

OrganizationServices.propTypes = {
  // someData: PropTypes.string,
};

export default OrganizationServices;
