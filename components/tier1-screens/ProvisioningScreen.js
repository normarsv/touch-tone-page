import { Button, Input, message, Row, Space } from 'antd';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';

import ContentInnerHeader from '../misc/ContentInnerHeader';

const ProvisioningScreen = ({
  organizationInfo,
  servicesContent,
  editServiceContent,
}) => {
  const router = useRouter();
  // const [editable, setEditable] = useState(false);
  const [fieldsValues, setFieldsValues] = useState({
    name: 'test',
    billingId: '65478',
  });

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

  return (
    <div>
      <Space size='large' direction='vertical' style={{ width: '100%' }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className='title-style'>Organizations to Provision</h1>
        </Row>

        <Space direction='horizontal' size='middle' className='flex-end'>
          <Space direction='vertical'>
            <h4>Name</h4>
            <Input style={{ width: 300 }} value={fieldsValues.name} />
          </Space>
          <Space direction='vertical'>
            <h4>Account Number</h4>
            <Input style={{ width: 300 }} value={fieldsValues.billingId} />
          </Space>
        </Space>

        <Row type='flex' justify='end'>
          <Button
            // onClick={() => }
            className='primary-button-style'
            type='primary'
          >
            Provision
          </Button>
        </Row>
      </Space>
    </div>
  );
};

ProvisioningScreen.propTypes = {
  // someData: PropTypes.string,
};

export default ProvisioningScreen;
