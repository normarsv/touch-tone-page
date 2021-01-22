import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, message, Row, Space, Form, Select } from 'antd';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useEffect } from 'react';
import API from '../../API/API';
import { IsAValidEmail } from '../../scripts/General';

import ContentInnerHeader from '../misc/ContentInnerHeader';

const { Option } = Select;
const OrganizationServices = ({
  user,
  userInfo,
  servicesContent,
  successfullyEdit,
}) => {
  const router = useRouter();

  const [fieldsValues, setFieldsValues] = useState({
    username: userInfo.username,
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    did: userInfo.did,
  });

  const [editable, setEditable] = useState(false);
  const [saving, setSaving] = useState(false);

  const [userTypes, setUserTypes] = useState([]);
  useEffect(() => {
    if (userTypes.length === 0) {
      getUserTypes();
    }
  }, [userTypes]);
  const getUserTypes = async () => {
    const api = new API();
    const resUserTypes = await api.GET('/UserTypes');
    setUserTypes(resUserTypes.response);
    setFieldsValues({ ...fieldsValues, userTypeId: userInfo.userTypeId });
  };

  const key = 'updatable';
  const openMessage = () => {
    message.loading({ content: 'Saving changes...', key });
    setTimeout(() => {
      message.success({
        content: 'Changes Saved Successfully!',
        key,
        duration: 3,
      });
    }, 2000);
  };

  const saveUser = async (values) => {
    console.log('Received values of form: ', values);
    setSaving(true);
    const api = new API(user.token);
    const authUserInfo = await api.GET('/AuthUsers/' + userInfo.id);
    console.log(authUserInfo.response);
    const changeUserInfo = await api.PUT('/AuthUsers/' + userInfo.id, {
      ...authUserInfo.response,
      ...values,
    });
    console.log(changeUserInfo);
    if (changeUserInfo.response !== 200) {
      message.success({
        content: 'Changes Saved Successfully!',
        key,
        duration: 3,
      });
      if (successfullyEdit !== undefined) {
        successfullyEdit();
      }
    } else {
      message.error('Error updating, please try again');
    }
    setSaving(false);
    setEditable(false);
  };

  const currentUserId = router.query.idOrg;

  return (
    <div>
      <Space size='large' direction='vertical' style={{ width: '100%' }}>
        <ContentInnerHeader setBackOption />
        <Row>
          <h1 className='title-style'>{servicesContent.title}</h1>
        </Row>
        <Form
          initialValues={fieldsValues}
          onFinish={(values) => {
            saveUser(values);
          }}
        >
          <Space
            direction='horizontal'
            size='middle'
            className='flex-end flex-wrap'
          >
            <Space direction='vertical'>
              <h4>Email</h4>
              <Form.Item
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'The email field is required',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (IsAValidEmail(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Enter a valid email');
                    },
                  }),
                ]}
              >
                <Input
                  style={{ width: 300 }}
                  disabled={!editable || saving}
                  onChange={(e) => {
                    setFieldsValues({ ...fieldsValues, name: e.target.email });
                  }}
                />
              </Form.Item>
            </Space>
            <Space direction='vertical'>
              <h4>First Name</h4>
              <Form.Item
                name='firstName'
                rules={[
                  {
                    required: true,
                    message: 'The first name field is required',
                  },
                ]}
              >
                <Input
                  style={{ width: 300 }}
                  disabled={!editable || saving}
                  onChange={(e) => {
                    setFieldsValues({
                      ...fieldsValues,
                      firstName: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Space>
            <Space direction='vertical'>
              <h4>Last Name</h4>
              <Form.Item
                name='lastName'
                rules={[
                  {
                    required: true,
                    message: 'The last name field is required',
                  },
                ]}
              >
                <Input
                  style={{ width: 300 }}
                  disabled={!editable || saving}
                  onChange={(e) => {
                    setFieldsValues({
                      ...fieldsValues,
                      lastName: e.target.value,
                    });
                  }}
                />
              </Form.Item>
            </Space>
            <Space direction='vertical'>
              <Form.Item>
                <h4> </h4>
                <Space
                  direction='horizontal'
                  size='middle'
                  className='flex-end flex-wrap'
                >
                  <Button
                    type='primary'
                    loading={saving}
                    onClick={() => {
                      setEditable(!editable);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    type='primary'
                    disabled={!editable}
                    loading={saving}
                    htmlType='submit'
                  >
                    {'Save'}
                  </Button>
                </Space>
              </Form.Item>
            </Space>
          </Space>
        </Form>
        <Space
          direction='horizontal'
          size='middle'
          className='flex-end flex-wrap'
        >
          <Space direction='vertical'>
            <h4>Username</h4>
            <Input
              style={{ width: 300 }}
              value={fieldsValues.username}
              disabled={true}
            />
          </Space>
          <Space direction='vertical'>
            <h4>DID</h4>
            <Select
              style={{ width: 300 }}
              value={fieldsValues.did || 'NO DID'}
              disabled={true}
            />
          </Space>
          <Space direction='vertical'>
            <h4>User Type</h4>
            <Select
              style={{ width: 300 }}
              value={fieldsValues.userTypeId}
              disabled={true}
            >
              {userTypes.map((userType, index) => {
                return (
                  <Option key={userType.id} value={userType.id}>
                    {userType.description}
                  </Option>
                );
              })}
            </Select>
          </Space>
        </Space>
        {/*
        <Space direction='vertical' size='large'>
          <Space direction='vertical' size='small'>
            <h4>List of enabled Services</h4>
            <EditServices
              editable={editable}
              serviceContent={editServiceContent}
            />
          </Space>
          {telephonyFeatures && (
            <Space direction='vertical' size='small'>
              <h4>Telephony Features</h4>
              <EditServices
                editable={editable}
                serviceContent={telephonyFeatures}
              />
            </Space>
          )}
        </Space>
        */}
      </Space>
    </div>
  );
};

OrganizationServices.propTypes = {
  // someData: PropTypes.string,
};

export default OrganizationServices;
