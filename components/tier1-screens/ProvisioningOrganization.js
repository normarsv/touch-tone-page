import React from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import { Button, Input, Space } from "antd";

const ProvisioningOrganization = ({
  visibleProvisioningOrganization,
  setVisibleProvisioningOrganization,
}) => {
  return (
    <Modal
      // title={organizationDetailsInfo.name + " Details"}
      visible={visibleProvisioningOrganization}
      centered
      onCancel={() => setVisibleProvisioningOrganization()}
      footer={null}
    >
      <Space direction="vertical">
        <Space direction="horizontal" size="large">
          <Space direction="vertical">
            <h3 className="title-style">Name</h3>
            <Input></Input>
          </Space>
          <Space direction="vertical">
            <h3 className="title-style">Billing ID in Rev.io</h3>
            <Input></Input>
          </Space>
        </Space>

        <div className="flex space-between">
          <Button
            type="primary"
            className="primary-button-style"
            onClick={() => console.log("test")}
          >
            Guardar
          </Button>
        </div>
      </Space>
    </Modal>
  );
};

ProvisioningOrganization.propTypes = {
  someData: PropTypes.string,
};

export default ProvisioningOrganization;
