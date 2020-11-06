import { Button, Col, Input, message, Row, Select, Space } from "antd";
import Modal from "antd/lib/modal/Modal";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import API from "../../API/API";

const { Option } = Select;

const ProvisioningOrganization = ({
  visibleProvisioningOrganization,
  setVisibleProvisioningOrganization,
}) => {
  const [loading, setLoading] = useState(false);
  const [provideOrganizations, setProvideOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState({});
  const [errorToDisplay, setErrorToDisplay] = useState("");

  const api = new API();

  async function handleClickProvision() {
    setLoading(true);

    const resProvisionOrganization = await api.POST(
      "/Organizations/provide/" + selectedOrganization.orgId
    );

    setTimeout(() => {
      setLoading(false);

      if (resProvisionOrganization.statusCode === 201) {
        message.success("Succesfully Provisioned Organization");
        setSelectedOrganization({});
      } else {
        message.error("Organization Already Provisioned");
      }
    }, 2000);
  }

  async function organizationsToProvision() {
    const resOrganizationsProvide = await api.GET(
      "/Organizations/organizatios-to-provide"
    );

    if (resOrganizationsProvide.response.length === 0) {
      setErrorToDisplay("No Organizations to Provision");
    }

    setProvideOrganizations(resOrganizationsProvide.response);
  }

  function handleCancel() {
    setSelectedOrganization({});
    setProvideOrganizations([]);
    setVisibleProvisioningOrganization();
  }

  function handleSelectedValue(value) {
    const selectedOrganization = provideOrganizations.find(
      (item) => item.name === value
    );
    setSelectedOrganization({
      orgId: selectedOrganization.id,
      organization: selectedOrganization.name,
      billingId: selectedOrganization.billingId,
    });
  }

  useEffect(() => {
    if (provideOrganizations.length === 0) {
      organizationsToProvision();
      setErrorToDisplay("");
    }
  }, [selectedOrganization]);

  return (
    <Modal
      visible={visibleProvisioningOrganization}
      centered
      onCancel={() => handleCancel()}
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
            <Select
              className="select-arrow-boxes modals"
              placeholder="Select Organization..."
              value={selectedOrganization.organization}
              onChange={(value) => handleSelectedValue(value)}
            >
              {provideOrganizations.map((item, index) => (
                <Option value={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <Input disabled value={selectedOrganization.billingId}></Input>
          </Col>
        </Row>

        {errorToDisplay && (
          <label className="title-style">{errorToDisplay}</label>
        )}

        <Row type="flex" justify="end">
          <Button
            type="primary"
            className="primary-button-style provisioning"
            disabled={!selectedOrganization.organization}
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
