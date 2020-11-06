import { Button, Row, Select, Space, Switch, Table } from "antd";
import Search from "antd/lib/input/Search";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import OrganizationDetailsModal from "./OrganizationDetailsModal";
import ProvisioningOrganization from "./ProvisioningOrganization";

const { Option } = Select;

const ListAllOrganizations = ({ organizationsTableList }) => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState([]);
  const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);
  const [
    visibleProvisioningOrganization,
    setVisibleProvisioningOrganization,
  ] = useState(false);
  const [organizationDetailsInfo, setOrganizationDetailsInfo] = useState();

  const onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRow(selectedRowKeys);
  };

  const hoverAnimation = {
    scale: 1.02,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  const onEditOrg = (orgName) => {
    Router.push("/list-organizations/edit/organizationName");
  };

  function handleVisible(info) {
    setVisibleDetailsModal(!visibleDetailsModal);
    setOrganizationDetailsInfo(info);
    // console.log(info);
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      width: "8rem",
    },
    {
      title: "Billing ID in Rev.io",
      dataIndex: "billingId",
      width: "9rem",
    },
    {
      title: "Organization Distribuitor",
      dataIndex: "orgDist",
      width: "10rem",
    },
    {
      title: "Count of DIDs",
      dataIndex: "didsCount",
      width: "7rem",
    },
    {
      title: "Count of Users",
      dataIndex: "users",
      width: "7rem",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "7rem",
      render: (_, record) => {
        return (
          <Space>
            <motion.div
              onClick={() => handleVisible(record)}
              whileHover={hoverAnimation}
            >
              Details
            </motion.div>
          </Space>
        );
      },
    },
    {
      title: "Organization Status",
      dataIndex: "status",
      width: "9rem",
      render: (status) => (
        <div className="flex center">
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

  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader />

        <Row>
          <h1 className="title-style">List All Organizations</h1>
        </Row>

        <Search placeholder="Search..." enterButton style={{ width: 300 }} />

        <Row type="flex" justify="space-between">
          <Space size="small" className="spaced-between">
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
          <Row>
            <Button
              onClick={() =>
                setVisibleProvisioningOrganization(
                  !visibleProvisioningOrganization
                )
              }
              type="primary"
              className="primary-button-style alternate"
            >
              Provision Organization
            </Button>
          </Row>
        </Row>

        <Table
          rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={organizationsTableList}
          footer={(currentData) =>
            "Showing " +
            currentData.length +
            " of " +
            organizationsTableList.length +
            " entries"
          }
        />

        {/* Detalles de cada elemento de la tabla */}
        {organizationDetailsInfo && (
          <OrganizationDetailsModal
            organizationDetailsInfo={organizationDetailsInfo}
            visibleDetailsModal={visibleDetailsModal}
            setVisibleDetailsModal={() =>
              setVisibleDetailsModal(!visibleDetailsModal)
            }
          />
        )}

        {/* {organizationDetailsInfo && ( */}
        <ProvisioningOrganization
          // organizationDetailsInfo={organizationDetailsInfo}
          visibleProvisioningOrganization={visibleProvisioningOrganization}
          setVisibleProvisioningOrganization={() =>
            setVisibleProvisioningOrganization(!visibleProvisioningOrganization)
          }
        />
        {/* )} */}
      </Space>
    </div>
  );
};

ListAllOrganizations.propTypes = {
  someData: PropTypes.string,
};

export default ListAllOrganizations;
