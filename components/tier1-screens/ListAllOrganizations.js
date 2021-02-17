import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Row, Select, Space, Switch, Table } from 'antd';
import { motion } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import ContentInnerHeader from '../misc/ContentInnerHeader';
import OrganizationDetailsModal from './OrganizationDetailsModal';
import ProvisioningOrganization from './ProvisioningOrganization';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const { Option } = Select;

const ListAllOrganizations = ({
  userInfo,
  organizationsTableList,
  refreshOrg,
}) => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState([]);
  const [visibleDetailsModal, setVisibleDetailsModal] = useState(false);
  const [
    visibleProvisioningOrganization,
    setVisibleProvisioningOrganization,
  ] = useState(false);
  const [organizationDetailsInfo, setOrganizationDetailsInfo] = useState();
  const [tablePageSize, setTablePageSize] = useState({ pageSize: 10 });
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const windowDimensions = useWindowDimensions();

  let searchInput = useRef();

  const hoverAnimation = {
    scale: 1.02,
    cursor: 'pointer',
    color: 'red',
    transition: { duration: 0.5 },
  };

  const onChangeTablePageSize = (value) => {
    setTablePageSize({ pageSize: value });
  };

  function handleVisible(info) {
    setVisibleDetailsModal(!visibleDetailsModal);
    setOrganizationDetailsInfo(info);
  }

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div className='seach-box'>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={'Search by ' + dataIndex}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className='search-input'
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            className='search-buttons'
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size='small'
            className='search-buttons'
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: windowDimensions.width < 900 ? 'none': 'left',
      width: '5rem',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Billing ID in Rev.io',
      dataIndex: 'billingId',
      width: '10%',
      ...getColumnSearchProps('billingId'),
    },
    {
      title: 'Organization Distributor',
      dataIndex: 'orgDist',
      width: '10%',
      ...getColumnSearchProps('orgDist'),
    },
    {
      title: 'Count of DIDs',
      dataIndex: 'didsCount',
      width: '7%',
    },
    {
      title: 'Count of Users',
      dataIndex: 'users',
      width: '7%',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '7%',
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
      title: 'Organization Status',
      dataIndex: 'status',
      width: '7%',
      render: (status) => (
        <div className='flex center'>
          <Switch
            checked={status}
            checkedChildren='ON'
            unCheckedChildren='OFF'
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Space size='large' direction='vertical' style={{ width: '100%' }}>
        <ContentInnerHeader />

        <Row>
          <h1 className='title-style'>List All Organizations</h1>
        </Row>

        {/* <Search placeholder="Search..." enterButton style={{ width: 300 }} /> */}

        <Row type='flex' justify='space-between'>
          <Space size='small' className='spaced-between'>
            <label>Show</label>
            <Select defaultValue='10' onChange={onChangeTablePageSize}>
              <Option value='10'>10</Option>
              <Option value='20'>20</Option>
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
              type='primary'
              className='primary-button-style alternate'
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
            'Showing ' +
            currentData.length +
            ' of ' +
            organizationsTableList.length +
            ' entries'
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
          refreshOrg={refreshOrg}
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
