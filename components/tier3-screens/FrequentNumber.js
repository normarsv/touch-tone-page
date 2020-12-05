import {
  faDownload,
  faEnvelope,
  faPlusCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row, Select, Space, Table, Tooltip } from "antd";
import Search from "antd/lib/input/Search";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import API from "../../API/API";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import AddNewFrequentNumber from "../user/AddNewFrequentNumber";
import EditFrequentNumber from "./EditFrequentNumber";

const { Option } = Select;

const FrequentNumbers = ({
  userInfo,
  frequentNumberForm,
  frequentNumbersTableData,
  getFrequentNumberContent,
}) => {
  const [tablePageSize, setTablePageSize] = useState({ pageSize: 10 });
  const [visibleNewFrequentNumber, setVisibleNewFrequentNumber] = useState(
    false
  );
  const [visibleEditNumber, setVisibleEditNumber] = useState(false);
  const [frequentNumberInfo, setFrequentNumberInfo] = useState({});
  const [loadingTable, setLoadingTable] = useState(false);

  const hoverAnimation = {
    scale: 1.02,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  const onChangeTablePageSize = (value) => {
    setTablePageSize({ pageSize: value });
  };

  function handleVisible(info) {
    setVisibleEditNumber(!visibleEditNumber);
    setFrequentNumberInfo(info);
  }

  const deleteMeetings = async (meetingID) => {
    setLoadingTable(true);
    const api = new API(user.token);
    const resMeetings = await api.DELETE("/Meetings/" + meetingID);
    message.success("Meeting deleted successfully!");
    getMeetingsContent();
  };

  useEffect(() => {
    setLoadingTable(false);
  }, [frequentNumbersTableData]);

  console.log(frequentNumbersTableData);

  const columns = [
    {
      title: "Alias",
      dataIndex: "alias",
      fixed: "left",
      onFilter: (value, record) => record.alias.indexOf(value) === 0,
      sorter: (a, b) => a.alias.length - b.alias.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "10%",
      render: (actions, record) => (
        <motion.div
          onClick={() => handleVisible(record)}
          whileHover={hoverAnimation}
          className="flex center"
        >
          Edit
        </motion.div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      width: "10%",
      render: (linkDetails, edit) => (
        <motion.div
          // onClick={() => handleVisible(record)}
          whileHover={hoverAnimation}
          className="flex center"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </motion.div>
      ),
    },
  ];

  console.log(frequentNumbersTableData);

  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">Frequent Number</h1>
        </Row>

        <Search
          placeholder="Search user..."
          enterButton
          style={{ width: 300 }}
        />

        <Space size="large" className="flex space-between">
          <Space size="small">
            <label>Show</label>
            <Select defaultValue="10" onChange={onChangeTablePageSize}>
              <Option value="10">10</Option>
              <Option value="20">20</Option>
            </Select>
            <label>entries</label>
          </Space>
          <Button
            type="primary"
            className="primary-button-style alternate"
            onClick={() => setVisibleNewFrequentNumber(true)}
          >
            <Space className="flex center">
              New Number <FontAwesomeIcon icon={faPlusCircle} />
            </Space>
          </Button>
        </Space>

        {frequentNumbersTableData && (
          <Table
            loading={loadingTable}
            bordered
            scroll={{ x: 1300 }}
            columns={columns}
            pagination={tablePageSize}
            dataSource={frequentNumbersTableData}
            footer={(currentData) =>
              "Showing " +
              currentData.length +
              " of " +
              frequentNumbersTableData.length +
              " entries"
            }
          />
        )}

        {/* Modal para agregar nuevo numero frecuente */}
        <EditFrequentNumber
          frequentNumberInfo={frequentNumberInfo}
          visibleEditNumber={visibleEditNumber}
          setVisibleEditNumber={() => setVisibleEditNumber(!visibleEditNumber)}
        />

        {/* Modal para agregar nuevo numero frecuente */}
        <AddNewFrequentNumber
          frequentNumberForm={frequentNumberForm}
          visibleNewFrequentNumber={visibleNewFrequentNumber}
          setVisibleNewFrequentNumber={() =>
            setVisibleNewFrequentNumber(!visibleNewFrequentNumber)
          }
        />
      </Space>
    </div>
  );
};

FrequentNumbers.propTypes = {
  frequentNumbersTableData: PropTypes.array,
  frequentNumberForm: PropTypes.object,
};

export default FrequentNumbers;
