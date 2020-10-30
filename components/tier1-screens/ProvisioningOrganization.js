import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import { Button, Col, Input, message, Row, Select, Space } from "antd";

const ProvisioningOrganization = ({
  visibleProvisioningOrganization,
  setVisibleProvisioningOrganization,
}) => {
  const [loading, setLoading] = useState(false);

  function handleClickProvision() {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      message.success("Success!");
    }, 2000);
  }

  return (
    <Modal
      // title={organizationDetailsInfo.name + " Details"}
      visible={visibleProvisioningOrganization}
      centered
      onCancel={() => setVisibleProvisioningOrganization()}
      footer={null}
    >
      <Space direction="vertical" className="organization-detail-modal">
        <h2 className="title-style">Provision Organization</h2>
        <Row type="flex" justify="center" gutter={[4, 0]} className="header">
          <Col span={12}>
            <h3>Name</h3>
          </Col>
          <Col span={12}>
            <h3>Billing ID in Rev.io</h3>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={[4, 0]} className="content">
          <Col span={12}>
            <Select className="select-arrow-boxes modals"></Select>
          </Col>
          <Col span={12}>
            <Input></Input>
          </Col>
        </Row>

        <Row type="flex" justify="end">
          <Button
            type="primary"
            className="primary-button-style provisioning"
            loading={loading}
            onClick={() => handleClickProvision()}
          >
            {loading ? "Provisioning" : "Provision"}
          </Button>
        </Row>
      </Space>
    </Modal>
  );
};

ProvisioningOrganization.propTypes = {
  someData: PropTypes.string,
};

export default ProvisioningOrganization;
