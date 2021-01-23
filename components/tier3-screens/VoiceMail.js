import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Divider,
  Progress,
  Row,
  Select,
  Slider,
  Space,
  Table,
  Tooltip,
} from 'antd';
import ContentInnerHeader from '../misc/ContentInnerHeader';
import Search from 'antd/lib/input/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faCalendarTimes,
  faDownload,
  faEnvelope,
  faEraser,
  faPlay,
  faPlusCircle,
  faSync,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { AudioPlayerProvider, useAudioPlayer } from 'react-use-audio-player';

const { Option } = Select;

const VoiceMail = ({ voiceMailTableData }) => {
  const [selectedRow, setSelectedRow] = useState([]);
  const [audioProgress, setAudioProgress] = useState();
  const [getVoiceMail, setGetVoiceMail] = useState(false);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSelectChange = (selectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRow(selectedRowKeys);
  };

  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
  };

  const AudioPlayer = ({ file }) => {
    const { togglePlayPause, ready, loading, playing } = useAudioPlayer({
      src: file,
      format: 'mp3',
      autoplay: false,
      onend: () => console.log('sound has ended!'),
    });

    if (!ready && !loading) return <div>No audio to play</div>;
    if (loading) return <div>Loading audio</div>;

    return (
      <div>
        <Button onClick={togglePlayPause}>{playing ? 'Pause' : 'Play'}</Button>
      </div>
    );
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date) => {
        return (
          <Space direction="horizontal">
            <Space direction="horizontal">
              <FontAwesomeIcon className="title-style" icon={faCalendarAlt} />{' '}
              {date}{' '}
            </Space>
          </Space>
        );
      },
      fixed: 'left',
      filterMultiple: false,
      width: '10%',
      // onFilter: (value, record) => record.date.indexOf(value) === 0,
      // sorter: (a, b) => a.date.length - b.date.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Name',
      dataIndex: 'fileName',
      filterMultiple: false,
      width: '20%',
      // onFilter: (value, record) => record.fileName.indexOf(value) === 0,
      // sorter: (a, b) => a.fileName.length - b.fileName.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      filterMultiple: false,
      width: '6%',
      // onFilter: (value, record) => record.duration.indexOf(value) === 0,
      // sorter: (a, b) => a.duration.length - b.duration.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '12%',
      render: (actions, record) => {
        console.log(record);
        return (
          <Row type="flex" justify="center" align="middle">
            {getVoiceMail ? (
              <AudioPlayerProvider>
                <AudioPlayer file="meow.mp3" />
              </AudioPlayerProvider>
            ) : (
              <Button onClick={() => setGetVoiceMail(!getVoiceMail)}>
                play
              </Button>
            )}
          </Row>
        );
      },
    },
    {
      title: 'Delete Records',
      dataIndex: 'delete',
      width: '8%',
      render: () => (
        <Row type="flex" justify="center" align="middle">
          <FontAwesomeIcon icon={faTrash} />
        </Row>
      ),
    },
  ];

  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Voice Mail</h1>
        </Row>

        <Search
          placeholder="Search user..."
          enterButton
          style={{ width: 300 }}
        />

        <Space size="large" className="spaced-between">
          <Space size="small">
            <label>Show</label>
            <Select
              defaultValue="10"
              style={{ width: 120 }}
              onChange={handleChange}
            >
              <Option value="10">10</Option>
              <Option value="20">20</Option>
            </Select>
            <label>entries</label>
            <Button type="primary">
              <FontAwesomeIcon icon={faSync} />
            </Button>
          </Space>
          <Button
            disabled={selectedRow.length === 0}
            className="primary-button-style cancel"
          >
            Delete Selected Records
          </Button>
        </Space>

        <Table
          // rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={voiceMailTableData}
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
