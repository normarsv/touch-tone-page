import { SearchOutlined } from '@ant-design/icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Table,
} from 'antd';
import { motion } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useRef, useState } from 'react';
import API from '../../API/API';
import ContentInnerHeader from '../misc/ContentInnerHeader';

const { Option } = Select;

const ListAllUsers = ({ query, userTableList, userInfo, reloadInfo }) => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [titleToDisplay, setTitleToDisplay] = useState('');
  const [tablePageSize, setTablePageSize] = useState({ pageSize: 10 });
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  let searchInput = useRef();

  const onChangeTablePageSize = (value) => {
    setTablePageSize({ pageSize: value });
  };

  const api = new API(userInfo.token);

  async function onChangeUserState(selectedUser) {
    const resOnChangeUser = await api.PUT(
      '/tools/activate-deactivate-user/' + selectedUser.key
    );

    if (resOnChangeUser.statusCode === 200) {
      message
        .loading('Changing Status...', 2.5)
        .then(() => message.success('User Status Changed Succesfully!', 2.5));
      setTimeout(() => {
        reloadInfo();
      }, 1000);
    } else {
      message
        .loading('Changing Status...', 2.5)
        .then(() => message.error('Unable to Change This User State', 2.5));
    }
  }

  const hoverAnimation = {
    scale: 1.02,
    cursor: 'pointer',
    color: 'red',
    transition: { duration: 0.5 },
  };

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
      <div className="seach-box">
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
          className="search-input"
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className="search-buttons"
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            className="search-buttons"
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
      fixed: 'left',
      width: '6rem',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '15%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'DID',
      dataIndex: 'did',
      width: '15%',
      ...getColumnSearchProps('did'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '10%',
      render: (actions) => (
        <Space className="flex center">
          <motion.div
            onClick={() => router.push('/list-users/details/' + actions)}
            whileHover={hoverAnimation}
          >
            Details
          </motion.div>
        </Space>
      ),
    },
    {
      title: 'Activate / Deactivate',
      dataIndex: 'status',
      width: '10%',
      render: (status, record) => (
        <div className="flex center">
          <Popconfirm
            placement="left"
            title="Are you sure you want to change the status of this user?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onChangeUserState(record)}
          >
            <Switch
              checked={status}
              checkedChildren="ON"
              unCheckedChildren="OFF"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (
      userTableList.length > 0 &&
      userTableList[0].organization !== undefined
    ) {
      setTitleToDisplay(userTableList[0].organization);
    } else {
      setTitleToDisplay('');
    }
  }, []);

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: '100%' }}>
        <ContentInnerHeader />

        <h1 className="title-style">
          List All Users {titleToDisplay ? 'of ' + titleToDisplay : ''}
        </h1>
        {/* <Search placeholder="Search..." enterButton style={{ width: 300 }} /> */}

        <Row type="flex" justify="space-between">
          <Space size="large" className="spaced-between">
            <Space size="small" className="spaced">
              <label>Show</label>
              <Select defaultValue="10" onChange={onChangeTablePageSize}>
                <Option value="10">10</Option>
                <Option value="20">20</Option>
              </Select>
              <label>entries</label>
            </Space>
          </Space>

          <Row>
            <Space>
              <Space>
                <Button
                  type="primary"
                  className="primary-button-style alternate "
                  onClick={() => router.push('/list-users/bulk-import')}
                >
                  <Space className="flex center">
                    Bulk Import
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Space>
                </Button>
                <Button
                  type="primary"
                  className="primary-button-style alternate"
                  onClick={() => router.push('/list-users/new-user')}
                >
                  <Space className="flex center">
                    New User
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Space>
                </Button>
              </Space>
            </Space>
          </Row>
        </Row>

        <Table
          bordered
          scroll={{ x: 1000 }}
          columns={columns}
          dataSource={userTableList}
          pagination={tablePageSize}
          footer={(currentData) =>
            'Showing ' +
            currentData.length +
            ' of ' +
            userTableList.length +
            ' entries'
          }
        />
      </Space>
    </div>
  );
};

ListAllUsers.propTypes = {
  // someData: PropTypes.string,
};

export default ListAllUsers;
