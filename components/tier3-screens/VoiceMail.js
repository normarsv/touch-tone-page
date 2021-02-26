import { SearchOutlined } from '@ant-design/icons';
import {
  faCalendarAlt,
  faDownload,
  faEnvelope,
  faSync,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Input,
  message,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import AudioPlayerComponent from '../misc/AudioPlayerComponent';
import ContentInnerHeader from '../misc/ContentInnerHeader';
import { UserContext } from '../authentication/UserContext';
import API from '../../API/API';
import { mainIp } from '../../scripts/MainInfoData';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import moment from 'moment/min/moment-with-locales.js';
const { Option } = Select;

const VoiceMail = ({ voiceMailTableData, getVoiceMailContent }) => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [tablePageSize, setTablePageSize] = useState({ pageSize: 10 });
  const [loadingTable, setLoadingTable] = useState(false);
  const [currentVoiceMailInfo, setCurrentVoiceMailInfo] = useState(
    voiceMailTableData
  );
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const { userInfo } = useContext(UserContext);
  const windowDimensions= useWindowDimensions();
 
  let searchInput = useRef();

  const api = new API(userInfo.token);

  const onChangeTablePageSize = (value) => {
    setTablePageSize({ pageSize: value });
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRow(selectedRowKeys);
  };

  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
  };

  const sendByEmail = async (fileName) => {
    message.loading('Sending by email...');

    const sendByEmailRes = await api.GET(
      '/Email/sendVoicemail/' + fileName + '.MU'
    );

    if (sendByEmailRes.statusCode == 200) {
      message.success(sendByEmailRes.response.message);
    } else {
      message.error('Unexpected error ocurred');
    }
  };

  const voiceMailToDownload = async (fileName) => {
    // console.log('Test');
    // console.log(mainIp + '/api/VoiceMail/audio-converter/' + fileName + '.MU');
    message.loading('The download will start soon...');

    // window.open(mainIp + '/api/VoiceMail/audio-converter/' + fileName + '.MU');
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
    setSearchedColumn('');
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

  const reloadInformation = () => {
    setLoadingTable(true);
    getVoiceMailContent();
  };

  useEffect(() => {
    if (voiceMailTableData !== currentVoiceMailInfo) {
      setCurrentVoiceMailInfo(voiceMailTableData);
      setLoadingTable(false);
    }
  }, [voiceMailTableData]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date) => {
        return {props:{
          style:{
          }
        },
          children: (<Space direction="horizontal">
            <Space direction="horizontal">
              <FontAwesomeIcon className="title-style" icon={faCalendarAlt} />{' '}
              {date}{' '}
            </Space>
          </Space>)
        }
        
      },
      fixed: windowDimensions.width < 900 ? 'none' : 'left',
      filterMultiple: false,
      width: '10%',
      //...getColumnSearchProps('date'),

      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      sortDirections: ['descend', 'ascend'],

    },
    {
      title: 'Caller',
      dataIndex: 'caller', 
      filterMultiple: false,
      width:'5%',
      ...getColumnSearchProps('caller'),
     // responsive: ['md']
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      filterMultiple: false,
      width: '6%',
      responsive: ['md']
    },
    {
      title: 'Play Voice Mail',
      dataIndex: 'actions',
      width: '12%',
      render: (actions, record) => {
        return (
          <Row type="flex" justify="center" align="middle">
            <AudioPlayerComponent
              reloadComponent={loadingTable}
              fileName={record.fileName}
            />
          </Row>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '5%',
      render: (actions, record) => {
        return (
          <Row type="flex" justify="center" align="middle">
            <Space>
              <Tooltip title="Download file">
                <Button
                  type="primary"
                  style={{ borderRadius: '2rem', width: '1rem' }}
                  className="flex center primary-button-style alternate"
                  //this must be changed!!
                  href={
                    mainIp +
                    '/api/VoiceMail/audio-converter/' +
                    record.fileName +
                    '.MU'
                  }
                  download
                  onClick={() => voiceMailToDownload(record.fileName)}
                >
                  <FontAwesomeIcon icon={faDownload} />
                </Button>
              </Tooltip>

              <Tooltip title="Send File by Email">
                <Button
                  type="primary"
                  style={{ borderRadius: '2rem', width: '1rem' }}
                  className="flex center primary-button-style alternate"
                  onClick={() => sendByEmail(record.fileName)}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </Button>
              </Tooltip>
            </Space>
          </Row>
        );
      },
    },
    // {
    //   title: 'Delete Records',
    //   dataIndex: 'delete',
    //   width: '8%',
    //   render: () => (
    //     <Row type="flex" justify="center" align="middle">
    //       <FontAwesomeIcon icon={faTrash} />
    //     </Row>
    //   ),
    // },
  ];

  const variants = {
    active: {
      transform: 'rotate(360deg)',
      transition: { duration: 0.5 },
    },
    inactive: {
      transform: 'rotate(0)',
    },
  };

  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Voice Mail</h1>
        </Row>

        {/* <Search
          placeholder="Search user..."
          enterButton
          style={{ width: 300 }}
        /> */}

        <Space size="large" className="spaced-between">
          <Space size="small">
            <label>Show</label>
            <Select defaultValue="10" onChange={onChangeTablePageSize}>
              <Option value="10">10</Option>
              <Option value="20">20</Option>
            </Select>
            <label>entries</label>
            <Button type="primary" onClick={reloadInformation}>
              <motion.div variants={variants} animate={loadingTable}>
                <FontAwesomeIcon icon={faSync} />
              </motion.div>
            </Button>
          </Space>

          {/* <Button
            disabled={selectedRow.length === 0}
            className="primary-button-style cancel"
          >
            Delete Selected Records
          </Button> */}
        </Space>

        <Table
        
          // rowSelection={rowSelection}
          loading={loadingTable}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={voiceMailTableData}
          pagination={tablePageSize}
          footer={(currentData) =>
            'Showing ' +
            currentData.length +
            ' of ' +
            voiceMailTableData.length +
            ' entries'
          }
        />
      </Space>
    </div>
  );
};

VoiceMail.propTypes = {
  someData: PropTypes.string,
};

export default VoiceMail;
