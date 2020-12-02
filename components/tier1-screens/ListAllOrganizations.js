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

const ListAllOrganizations = ({ userInfo, organizationsTableList }) => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState([]);
  const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);
  const [
    visibleProvisioningOrganization,
    setVisibleProvisioningOrganization,
  ] = useState(false);
  const [organizationDetailsInfo, setOrganizationDetailsInfo] = useState();
  const [tablePageSize, setTablePageSize] = useState({ pageSize: 10 });

  const hoverAnimation = {
    scale: 1.02,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  const onChangeTablePageSize = (value) => {
    setTablePageSize({ pageSize: value });
  };

  function handleVisible(info) {
    setVisibleDetailsModal(!visibleDetailsModal);
    setOrganizationDetailsInfo(info);
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      fixed: "left",
      width: "6rem",
    },
    {
      title: "Billing ID in Rev.io",
      dataIndex: "billingId",
      width: "10%",
    },
    {
      title: "Organization Distribuitor",
      dataIndex: "orgDist",
      width: "10%",
    },
    {
      title: "Count of DIDs",
      dataIndex: "didsCount",
      width: "7%",
    },
    {
      title: "Count of Users",
      dataIndex: "users",
      width: "7%",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "7%",
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
      width: "7%",
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
            <Select defaultValue="10" onChange={onChangeTablePageSize}>
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
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          pagination={tablePageSize}
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

        {/* Modal de para provisionar organizaciones */}
        <ProvisioningOrganization
          userInfo={userInfo}
          visibleProvisioningOrganization={visibleProvisioningOrganization}
          setVisibleProvisioningOrganization={() =>
            setVisibleProvisioningOrganization(!visibleProvisioningOrganization)
          }
        />
      </Space>
    </div>
  );
};

ListAllOrganizations.propTypes = {
  userInfo: PropTypes.object,
  organizationsTableList: PropTypes.array,
};

export default ListAllOrganizations;
