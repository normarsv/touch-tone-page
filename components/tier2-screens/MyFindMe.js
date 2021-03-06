import { DatePicker, message, Row, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';

import FormGenerator from '../../components-base/FormGenerator';
import { UserContext } from '../authentication/UserContext';
import ContentInnerHeader from '../misc/ContentInnerHeader';

const { RangePicker } = DatePicker;

const MyFindMe = ({ formToDisplay }) => {
  const { userInfo } = useContext(UserContext);
  const [mockData, setMockData] = useState();
  const [targetKeys, setTargetKeys] = useState();
  const [infoByRole, setInfoByRole] = useState({});

  function TitleByRole(userInfo) {
    switch (userInfo.group) {
      case 'CorporateService':
        setInfoByRole({ title: 'Ring to Groups', role: 'CorporateService' });
        break;
      case 'OrganizationAdmin':
        setInfoByRole({ title: 'Ring to Groups', role: 'OrganizationAdmin' });
        break;

      case 'EndUser':
        setInfoByRole({ title: 'Find Me Follow Me', role: 'EndUser' });
        break;

      default:
        break;
    }
  }

  const props = {
    name: 'file',
    action: '',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const dayRange = [
    { id: 1, day: 'Monday' },
    { id: 2, day: 'Tuesday' },
    { id: 3, day: 'Wednesday' },
    { id: 4, day: 'Thursday' },
    { id: 5, day: 'Friday' },
  ];

  const getMock = () => {
    const targetKeys = [];
    const mockData = [
      { key: 1, title: 'Juan Perez ', description: '' },
      { key: 2, title: 'User Queue ', description: '' },
      { key: 3, title: 'Ring to Group ', description: '' },
      { key: 4, title: 'Auto attendant ', description: '' },
      { key: 5, title: 'External Number 2 ', description: '' },
      { key: 6, title: 'External Number 3 ', description: '' },
    ];

    setMockData(mockData);
    setTargetKeys(targetKeys);
  };

  useEffect(() => {
    getMock();
    TitleByRole(userInfo);
  }, []);

  const handleChange = (targetKeys) => {
    setTargetKeys(targetKeys);
  };

  return (
    <div>
      <Space size='large' direction='vertical'>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className='title-style'>{infoByRole.title}</h1>
        </Row>

        <FormGenerator FormOptions={formToDisplay} />
      </Space>
    </div>
  );
};

MyFindMe.propTypes = {
  // someData: PropTypes.string
};

export default MyFindMe;
