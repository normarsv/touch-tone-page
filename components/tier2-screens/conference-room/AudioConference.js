import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Input,
  message,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Switch,
} from 'antd';
import Search from "antd/lib/input/Search";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPlusCircle,
  faTrash,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { SearchOutlined } from '@ant-design/icons';
import ContentInnerHeader from "../../misc/ContentInnerHeader";
import moment from 'moment/min/moment-with-locales.js';
import { useContext, useEffect, useRef, useState } from 'react';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import API from '../../../API/API';
import { UserContext } from '../../authentication/UserContext';
//import useForceUpdate from "use-force-update";

const { Option } = Select;

const AudioConference = ({ audioConferenceContent, getConferences }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [conferences, setConferences] = useState(audioConferenceContent);
  const windowDimensions= useWindowDimensions();
  const { userInfo } = useContext(UserContext);
  const api = new API(userInfo.token, userInfo.userId);
  let searchInput = useRef();

  // useEffect(() => {
  //   if (audioConferenceContent !== conferences ) {
  //     setConferences(audioConferenceContent);
  //   }
  //   console.log("Use Effect")
  // }, [audioConferenceContent]);

  const hoverAnimation = {
    scale: 1.02,
    cursor: "pointer",
    color: "red",
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
    setSearchedColumn('');
    setSearchText('');
  };

  const enableDisableConference = async (checked, conferenceId) =>
  {
   let conference = conferences.find(conf=> conf.ConferenceReservedId == conferenceId)
    var body = {...conference,Enabled: checked, Account:"CL-9217432342",StartDateTime:"", Emails:"jsantos@guaodev.com"};
    console.log('body: ', body)
    try{
      const response = await api.PUT('/conferences', body);
      console.log('PUT: ', response)
      if(response.statusCode == 200)
      {
       
      }
    } 
    catch{
    
    }
   let conf = await getConferences();
   console.log(' current conferences', conferences)
   console.log(' Get conferences', conf)
   setConferences(conf);

  
  }

  const getEnabledConference = (conferenceId) =>{
    let conference = conferences.find(conf=> conf.ConferenceReservedId == conferenceId)
    return conference.Enabled;
  }

  const getColumnSearchProps = (dataIndex, columnTitle) => ({
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
          placeholder={'Search by ' + columnTitle}
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
      title: "Start Date",
      dataIndex: "StartDateTime",
      render: (date) =>
            (
            <>
              <Space size="small" style={{ marginRight: "0.5rem" }}>
                <FontAwesomeIcon className="title-style" icon={faCalendarAlt} />{" "}
                {date ? moment(date).format('L'): ""}{" "}
              </Space>
              <Space size="small" style={{ marginRight: "0.5rem" }}>
              <FontAwesomeIcon className="title-style" icon={faClock} />{" "}
              {date ? moment(date).format('LT'): ""}{" "}
            </Space>
           </>
          )
       ,
      fixed: windowDimensions.width < 900 ? 'none' : 'left',
      filterMultiple: false,
      ...getColumnSearchProps('StartDateTime','Start Date'),
    },
    {
      title: "Description",
      dataIndex: "Description",
      width: "25rem",
      filterMultiple: false,
      ...getColumnSearchProps('Description','Description'),
    },
    {
      title: "Access Code",
      dataIndex: "AccessCode",
    },
    {
      title: "Actions",
      dataIndex: "ConferenceReservedId",
      render: (conferenceId) => (
        <Space className="flex center">
          <motion.div
            onClick={() =>
              router.push("/audio-conference/details/" + conferenceId)
            }
            whileHover={hoverAnimation}
          >
            Details
          </motion.div>
        </Space>
      ),
    },
    {
      title: "Enable",
      dataIndex: "ConferenceReservedId",
      render: (conferenceId) => (
        <div className="flex center">
          <Switch
            checked={getEnabledConference(conferenceId)}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            onChange={(checked)=>enableDisableConference(checked,conferenceId)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader />

        <Row>
          <h1 className="title-style">Audio Conference Room</h1>
        </Row>

        <Row type="flex" justify="space-between">
          <Row>
            {/* <Search
              placeholder="Search..."
              enterButton
              style={{ width: 300 }}
            /> */}
          </Row> 
          <Row>
            <Button
              type="primary"
              className="primary-button-style alternate"
              onClick={() => router.push("/audio-conference/new-conference")}
            >
              <Space className='flex center'>
                New Conference <FontAwesomeIcon icon={faPlusCircle} />
              </Space>
            </Button>
          </Row>
        </Row>

        <Table
          // rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={ columns}
          dataSource={conferences}
          footer={(currentData) =>
            "Showing " +
            currentData.length +
            " of " +
            currentData.length +
            " entries"
          }
        />
      </Space>
    </div>
  );
};

AudioConference.propTypes = {
  audioConferenceContent: PropTypes.array,
};

export default AudioConference;
