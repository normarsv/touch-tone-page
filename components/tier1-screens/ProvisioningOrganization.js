import { Button, Col, Input, message, Modal, Row, Select, Space } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import API from '../../API/API';
import { IsAValidEmail, IsValidPassword } from '../../scripts/General';

const { Option } = Select;

const ProvisioningOrganization = ({
  userInfo,
  visibleProvisioningOrganization,
  setVisibleProvisioningOrganization,
  refreshOrg,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentDIDS, setCurrentDIDS] = useState([]);
  const [provideOrganizations, setProvideOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState({});
  const [errorToDisplay, setErrorToDisplay] = useState('');
  console.log(userInfo);
  const api = new API(userInfo.token, userInfo.userId);

  async function handleClickProvision() {
    let errorToSend = '';
    setErrorToDisplay('');

    if (IsAValidEmail(selectedOrganization.email) === false) {
      errorToSend = 'Enter a valid Email';
    }

    if (
      IsValidPassword(
        selectedOrganization.password,
        '(?=.*[a-z])(?=.*[A-Z])(?=.{9,})'
      ) === false
    ) {
      if (errorToSend !== '') {
        errorToSend = errorToSend + ', ';
      }
      errorToSend = errorToSend + 'Enter a valid Password';
    }
    /*
    if (IsAValidPhoneNumber(selectedOrganization.did) === false) {
      if (errorToSend !== '') {
        errorToSend = errorToSend + ', ';
      }
      errorToSend = errorToSend + 'Enter a valid Phone Number';
    }
    */

    if (errorToSend !== '') {
      setErrorToDisplay(errorToSend);
      return;
    }
    setLoading(true);

    const resProvisionOrganization = await api.POST(
      '/Organizations/provide/' + selectedOrganization.orgId,
      {
        email: selectedOrganization.email,
        password: selectedOrganization.password,
        didID: selectedOrganization.didID,
        userName: selectedOrganization.userName,
        firstName: selectedOrganization.firstName,
        lastName: selectedOrganization.lastName,
      }
    );

    if (resProvisionOrganization.statusCode === 201) {
      message.success('Succesfully Provisioned Organization');
      setSelectedOrganization({});
      setVisibleProvisioningOrganization();
    } else {
      message.error(resProvisionOrganization.response.message || 'Organization Already Provisioned');
    }
    refreshOrg();
    setTimeout(() => {
      setLoading(false);
    }, 150);
  }

  async function organizationsToProvision() {
    const resOrganizationsProvide = await api.GET(
      '/Organizations/organizations-to-provide'
    );

    if (resOrganizationsProvide.response.length === 0) {
      setErrorToDisplay('No Organizations to Provision');
    }

    setProvideOrganizations(resOrganizationsProvide.response);
  }

  function handleCancel() {
    if (loading === false) {
      setSelectedOrganization({});
      setProvideOrganizations([]);
      setVisibleProvisioningOrganization();
    }
  }

  async function handleSelectedValueOrg(value) {
    const api = new API(userInfo.token, userInfo.userId);

    let testOptions = await api.GET(
      '/tools/organization-available-number/' + value
    );
    if (testOptions.response) {
      setCurrentDIDS(testOptions.response);
    }
    const selectedOrganization = provideOrganizations.find(
      (item) => item.id === value
    );
    setSelectedOrganization({
      orgId: selectedOrganization.id,
      organization: selectedOrganization.name,
      billingId: selectedOrganization.billingId,
    });
  }

  function handleSelectedValueDID(value) {
    setSelectedOrganization({
      ...selectedOrganization,
      didID: value,
    });
  }

  useEffect(() => {
    if (provideOrganizations.length === 0) {
      organizationsToProvision();
      setErrorToDisplay('');
    }
  }, [selectedOrganization]);

  return (
    <Modal
      visible={visibleProvisioningOrganization}
      centered
      onCancel={() => handleCancel()}
      footer={null}
      width={'80%'}
    >
      <Space direction='vertical' className='organization-detail-modal'>
        <h2 className='title-style'>Provision Organization</h2>
        <Row type='flex' justify='center' gutter={[4, 0]} className='header'>
          <Col span={5}>
            <h3>Name</h3>
          </Col>
          <Col span={5}>
            <h3>Account Number</h3>
          </Col>
          <Col span={5}>
            <h3>Email</h3>
          </Col>
          <Col span={5}>
            <h3>Password</h3>
          </Col>
          <Col span={4}>
            <h3>DID</h3>
          </Col>
        </Row>
        <Row type='flex' justify='center' gutter={[4, 0]} className='content'>
          <Col span={5}>
            <Select
              disabled={loading}
              className='select-arrow-boxes modals'
              placeholder='Select Organization...'
              value={selectedOrganization.organization}
              onChange={(value) => handleSelectedValueOrg(value)}
            >
              {provideOrganizations.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={5}>
            <Input disabled value={selectedOrganization.billingId}></Input>
          </Col>
          <Col span={5}>
            <Input
              disabled={loading}
              value={selectedOrganization.email}
              onChange={(e) => {
                setSelectedOrganization({
                  ...selectedOrganization,
                  email: e.target.value,
                });
              }}
            ></Input>
          </Col>
          <Col span={5}>
            <Input.Password
              disabled={loading}
              value={selectedOrganization.password}
              onChange={(e) => {
                setSelectedOrganization({
                  ...selectedOrganization,
                  password: e.target.value,
                });
              }}
            ></Input.Password>
          </Col>
          <Col span={4}>
            <Select
              disabled={loading}
              className='select-arrow-boxes modals'
              placeholder='Select DID...'
              value={selectedOrganization.didID}
              onChange={(value) => handleSelectedValueDID(value)}
            >
              {currentDIDS.map((item, index) => (
                <Option key={index} value={item.numberId}>
                  {item.number}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row type='flex' gutter={[4, 0]} className='header'>
          <Col span={5}>
            <h3>User Name</h3>
          </Col>
          <Col span={5}>
            <h3>First Name</h3>
          </Col>
          <Col span={5}>
            <h3>Last Name</h3>
          </Col>
        </Row>

        <Row type='flex' gutter={[4, 0]} className='content'>
          <Col span={5}>
            <Input
              disabled={loading}
              value={selectedOrganization.userName}
              onChange={(e) => {
                setSelectedOrganization({
                  ...selectedOrganization,
                  userName: e.target.value,
                });
              }}
            ></Input>
          </Col>
          <Col span={5}>
            <Input
              disabled={loading}
              value={selectedOrganization.firstName}
              onChange={(e) => {
                setSelectedOrganization({
                  ...selectedOrganization,
                  firstName: e.target.value,
                });
              }}
            ></Input>
          </Col>
          <Col span={5}>
            <Input
              disabled={loading}
              value={selectedOrganization.lastName}
              onChange={(e) => {
                setSelectedOrganization({
                  ...selectedOrganization,
                  lastName: e.target.value,
                });
              }}
            ></Input>
          </Col>
        </Row>

        {errorToDisplay && (
          <label className='title-style'>{errorToDisplay}</label>
        )}
        <label style={{ fontWeight: 'bold' }}>
          {
            'Password must include: At least one lower case, one upper case and be nine characters long'
          }
        </label>

        <Row type='flex' justify='end'>
          <Button
            type='primary'
            className='primary-button-style provisioning'
            disabled={
              !selectedOrganization.organization ||
              !selectedOrganization.password ||
              selectedOrganization.password === '' ||
              !selectedOrganization.email ||
              selectedOrganization.email === '' ||
              !selectedOrganization.didID ||
              selectedOrganization.didID === '' ||
              !selectedOrganization.userName ||
              selectedOrganization.userName === '' ||
              !selectedOrganization.firstName ||
              selectedOrganization.firstName === '' ||
              !selectedOrganization.lastName ||
              selectedOrganization.lastName === ''
            }
            loading={loading}
            onClick={() => handleClickProvision()}
          >
            {loading ? 'Provisioning' : 'Provision'}
          </Button>
        </Row>
      </Space>
    </Modal>
  );
};

ProvisioningOrganization.propTypes = {
  userInfo: PropTypes.object,
  visibleProvisioningOrganization: PropTypes.bool,
  setVisibleProvisioningOrganization: PropTypes.func,
};

export default ProvisioningOrganization;
