import { faEraser, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Checkbox, Row, Select, Space, Switch, Table } from "antd";
import Search from "antd/lib/input/Search";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import ContentInnerHeader from "../misc/ContentInnerHeader";

const { Option } = Select;

const ListAllUsers = ({ userTableList }) => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRow(selectedRowKeys);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const hoverAnimation = {
    scale: 1.02,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  const onEditOrg = (orgName) => {
    router.push("/list-users/edit/organizationName");
  };

  function searchByOrg(input) {}

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "DID",
      dataIndex: "did",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (actions) => (
        <Space className="flex-center">
          <motion.div
            onClick={() => router.push("/list-users/details/" + actions)}
            whileHover={hoverAnimation}
          >
            Details
          </motion.div>
          |
          <motion.div
            onClick={() => router.push("/list-users/edit/" + actions)}
            whileHover={hoverAnimation}
          >
            Edit
          </motion.div>
        </Space>
      ),
    },
    {
      title: "Active / Deactivate",
      dataIndex: "status",
      render: (status) => (
        <div className="flex-center">
          <Switch
            checked={status}
            checkedChildren="ON"
            unCheckedChildren="OFF"
          />
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader />

        <Row>
          <h1 className="title-style">List All Users</h1>
        </Row>

        <Search
          placeholder="Search organization..."
          enterButton
          onSearch={(input) => searchByOrg(input)}
          style={{ width: 300 }}
        />

        <Row type="flex" justify="space-between">
          <Space size="large">
            <Space size="small">
              <Checkbox onChange={() => rowSelection}>Select all</Checkbox> |{" "}
              <FontAwesomeIcon icon={faEraser} />
            </Space>
            <Space size="small" className="spaced">
              <label>Show</label>
              <Select
                defaultValue="10"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="10">10</Option>
                <Option value="20">20</Option>
              </Select>
              <label>entries</label>
            </Space>
          </Space>
          <Row>
            <Space>
              <Search
                placeholder="Search users..."
                enterButton
                style={{ width: 300 }}
              />
              <Space>
                <Button
                  type="primary"
                  className="primary-button-style alternate"
                  onClick={() => router.push("/list-users/bulk-import")}
                >
                  <Space>
                    Bulk Import
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Space>
                </Button>
                <Button
                  type="primary"
                  className="primary-button-style alternate"
                  onClick={() => router.push("/list-users/new-user")}
                >
                  <Space>
                    New User
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Space>
                </Button>
              </Space>
            </Space>
          </Row>
        </Row>

        <Table
          rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={userTableList}
        />
      </Space>
    </div>
  );
};

ListAllUsers.propTypes = {
  // someData: PropTypes.string,
};

export default ListAllUsers;

[
  {
    authUserId: 1035,
    organizationId: 1,
    userTypeId: 1,
    userStatusId: 1,
    sippoUserId: null,
    sippoCredentialId: null,
    isAgent: true,
    isEmailConfirmed: false,
    sippoToken: null,
    tsipSessionSignature: null,
    authUser: {
      id: 1035,
      password:
        "10000.1ck6lCmIVRaa1Y+7ODSthw==.ZyTHjma+shGXvXXr2UUXiuoBc0crNBQu3d8czh/9mhs=",
      lastLogin: null,
      isSuperuser: false,
      username: "JuanCoronado",
      firstName: "Juan",
      lastName: "Coronado",
      email: "jcoronado@guaodev.com",
      isStaff: false,
      isActive: true,
      dateJoined: "2020-10-20T22:51:34.105",
      authGroupId: 3,
      authGroup: null,
      authUserGroups: [],
      authUserUserPermissions: [],
      djangoAdminLog: [],
    },
    organization: {
      organizationId: 1,
      extensionsPrefixId: 1,
      cosId: 1,
      vmCosId: 1,
      prefixName: "Guao",
      sippoDomainId: "test.quobis.com",
      accountId: 1,
      extensionsPrefix: null,
    },
    userStatus: null,
    userType: null,
    distributorUser: [],
    meetings: [],
    organizationNumberUser: [],
    userAccounts: [],
    userExtensions: [],
    userFrequentContacts: [],
    usersGroup: [],
  },
  {
    authUserId: 1036,
    organizationId: 1,
    userTypeId: 1,
    userStatusId: 1,
    sippoUserId: null,
    sippoCredentialId: null,
    isAgent: true,
    isEmailConfirmed: false,
    sippoToken: null,
    tsipSessionSignature: null,
    authUser: {
      id: 1036,
      password:
        "10000.c6vmlwLHktEuJMrZyiBffg==.epG3solMve9J+/DAfAdxlav2hyEKOlSdxk/EgMDLKeI=",
      lastLogin: null,
      isSuperuser: false,
      username: "TestUser",
      firstName: "Test",
      lastName: "User",
      email: "test@guaodev.com",
      isStaff: false,
      isActive: true,
      dateJoined: "2020-10-20T22:51:34.105",
      authGroupId: 3,
      authGroup: null,
      authUserGroups: [],
      authUserUserPermissions: [],
      djangoAdminLog: [],
    },
    organization: {
      organizationId: 1,
      extensionsPrefixId: 1,
      cosId: 1,
      vmCosId: 1,
      prefixName: "Guao",
      sippoDomainId: "test.quobis.com",
      accountId: 1,
      extensionsPrefix: null,
    },
    userStatus: null,
    userType: null,
    distributorUser: [],
    meetings: [],
    organizationNumberUser: [],
    userAccounts: [],
    userExtensions: [],
    userFrequentContacts: [],
    usersGroup: [],
  },
  {
    authUserId: 1076,
    organizationId: 1,
    userTypeId: 1,
    userStatusId: 1,
    sippoUserId: null,
    sippoCredentialId: null,
    isAgent: false,
    isEmailConfirmed: false,
    sippoToken: null,
    tsipSessionSignature: null,
    authUser: {
      id: 1076,
      password: "#TestUser1",
      lastLogin: null,
      isSuperuser: false,
      username: "JP",
      firstName: "Juan",
      lastName: "Coronado",
      email: "JP@test.com",
      isStaff: false,
      isActive: true,
      dateJoined: "2020-10-22T22:24:27.8637615",
      authGroupId: 3,
      authGroup: null,
      authUserGroups: [],
      authUserUserPermissions: [],
      djangoAdminLog: [],
    },
    organization: {
      organizationId: 1,
      extensionsPrefixId: 1,
      cosId: 1,
      vmCosId: 1,
      prefixName: "Guao",
      sippoDomainId: "test.quobis.com",
      accountId: 1,
      extensionsPrefix: null,
    },
    userStatus: null,
    userType: null,
    distributorUser: [],
    meetings: [],
    organizationNumberUser: [],
    userAccounts: [],
    userExtensions: [],
    userFrequentContacts: [],
    usersGroup: [],
  },
  {
    authUserId: 1077,
    organizationId: 1,
    userTypeId: 1,
    userStatusId: 1,
    sippoUserId: null,
    sippoCredentialId: null,
    isAgent: false,
    isEmailConfirmed: false,
    sippoToken: null,
    tsipSessionSignature: null,
    authUser: {
      id: 1077,
      password: "#TestUser2",
      lastLogin: null,
      isSuperuser: false,
      username: "Dr Gera",
      firstName: "Gera",
      lastName: "Perez",
      email: "DrGera@test.com",
      isStaff: false,
      isActive: true,
      dateJoined: "2020-10-22T22:24:28.5675513",
      authGroupId: 3,
      authGroup: null,
      authUserGroups: [],
      authUserUserPermissions: [],
      djangoAdminLog: [],
    },
    organization: {
      organizationId: 1,
      extensionsPrefixId: 1,
      cosId: 1,
      vmCosId: 1,
      prefixName: "Guao",
      sippoDomainId: "test.quobis.com",
      accountId: 1,
      extensionsPrefix: null,
    },
    userStatus: null,
    userType: null,
    distributorUser: [],
    meetings: [],
    organizationNumberUser: [],
    userAccounts: [],
    userExtensions: [],
    userFrequentContacts: [],
    usersGroup: [],
  },
  {
    authUserId: 1078,
    organizationId: 1,
    userTypeId: 1,
    userStatusId: 1,
    sippoUserId: null,
    sippoCredentialId: null,
    isAgent: false,
    isEmailConfirmed: false,
    sippoToken: null,
    tsipSessionSignature: null,
    authUser: {
      id: 1078,
      password: "#TestUser3",
      lastLogin: null,
      isSuperuser: false,
      username: "Pedro",
      firstName: "Illse",
      lastName: "Palacios",
      email: "Pedro@test.com",
      isStaff: false,
      isActive: true,
      dateJoined: "2020-10-22T22:24:29.2675612",
      authGroupId: 3,
      authGroup: null,
      authUserGroups: [],
      authUserUserPermissions: [],
      djangoAdminLog: [],
    },
    organization: {
      organizationId: 1,
      extensionsPrefixId: 1,
      cosId: 1,
      vmCosId: 1,
      prefixName: "Guao",
      sippoDomainId: "test.quobis.com",
      accountId: 1,
      extensionsPrefix: null,
    },
    userStatus: null,
    userType: null,
    distributorUser: [],
    meetings: [],
    organizationNumberUser: [],
    userAccounts: [],
    userExtensions: [],
    userFrequentContacts: [],
    usersGroup: [],
  },
  {
    authUserId: 1079,
    organizationId: 1,
    userTypeId: 1,
    userStatusId: 1,
    sippoUserId: null,
    sippoCredentialId: null,
    isAgent: false,
    isEmailConfirmed: false,
    sippoToken: null,
    tsipSessionSignature: null,
    authUser: {
      id: 1079,
      password: "#TestUser4",
      lastLogin: null,
      isSuperuser: false,
      username: "Bruz",
      firstName: "Bruno",
      lastName: "Araujo",
      email: "Bruz@test.com",
      isStaff: false,
      isActive: true,
      dateJoined: "2020-10-22T22:24:30.3170583",
      authGroupId: 3,
      authGroup: null,
      authUserGroups: [],
      authUserUserPermissions: [],
      djangoAdminLog: [],
    },
    organization: {
      organizationId: 1,
      extensionsPrefixId: 1,
      cosId: 1,
      vmCosId: 1,
      prefixName: "Guao",
      sippoDomainId: "test.quobis.com",
      accountId: 1,
      extensionsPrefix: null,
    },
    userStatus: null,
    userType: null,
    distributorUser: [],
    meetings: [],
    organizationNumberUser: [],
    userAccounts: [],
    userExtensions: [],
    userFrequentContacts: [],
    usersGroup: [],
  },
  {
    authUserId: 1080,
    organizationId: 1,
    userTypeId: 1,
    userStatusId: 1,
    sippoUserId: null,
    sippoCredentialId: null,
    isAgent: false,
    isEmailConfirmed: false,
    sippoToken: null,
    tsipSessionSignature: null,
    authUser: {
      id: 1080,
      password: "#TestUser5",
      lastLogin: null,
      isSuperuser: false,
      username: "Vianney",
      firstName: "Vianney",
      lastName: "Reyes",
      email: "Vi@test.com",
      isStaff: false,
      isActive: true,
      dateJoined: "2020-10-22T22:24:31.0167192",
      authGroupId: 3,
      authGroup: null,
      authUserGroups: [],
      authUserUserPermissions: [],
      djangoAdminLog: [],
    },
    organization: {
      organizationId: 1,
      extensionsPrefixId: 1,
      cosId: 1,
      vmCosId: 1,
      prefixName: "Guao",
      sippoDomainId: "test.quobis.com",
      accountId: 1,
      extensionsPrefix: null,
    },
    userStatus: null,
    userType: null,
    distributorUser: [],
    meetings: [],
    organizationNumberUser: [],
    userAccounts: [],
    userExtensions: [],
    userFrequentContacts: [],
    usersGroup: [],
  },
];
