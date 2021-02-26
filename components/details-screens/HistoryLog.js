import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Row, Space, Table } from "antd";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import useWindowDimensions from '../../hooks/useWindowDimensions';
const HistoryLog = ({ historyLogDataTable }) => {
  const router = useRouter();
  const [selectedRow, setSelectedRow] = useState({});
  const windowDimension = useWindowDimensions();
  const hoverAnimation = {
    scale: 1.01,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => {
        return (
          <Space size="small">
            {date.map((item, index) => {
              return (
                <>
                  <FontAwesomeIcon className="title-style" icon={item.icon} />
                  {item.date}
                </>
              );
            })}
          </Space>
        );
      },
      fixed: windowDimension.width < 900 ? "none" :"left",
    },
    {
      title: "User",
      dataIndex: "user",
    },
    {
      title: "Previous",
      dataIndex: "previous",
    },
    {
      title: "Current",
      dataIndex: "current",
    },
    // {
    //   title: "Actions",
    //   dataIndex: "actions",
    //   render: (linkDetails, edit) => (
    //     <Row type="flex" justify="space-between" align="middle">
    //       <Space className="flex center">
    //         <motion.div onClick={() => {}} whileHover={hoverAnimation}>
    //           <Popconfirm
    //             placement="left"
    //             title="Are you sure to revert this log?"
    //             okText="Yes"
    //             cancelText="No"
    //           >
    //             Revert
    //           </Popconfirm>
    //         </motion.div>
    //         |
    //         <motion.div onClick={() => {}} whileHover={hoverAnimation}>
    //           Full History
    //         </motion.div>
    //       </Space>
    //       <FontAwesomeIcon icon={faExclamationCircle} className="title-style" />
    //     </Row>
    //   ),
    // },
  ];

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log("selectedRows: ", selectedRows[0]);
    setSelectedRow(selectedRows[0]);
  };

  const rowSelection = {
    selectedRow,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />
        <h1 className="title-style">History Log</h1>
        <Row type="flex" justify="end">
          <Button
            className="primary-button-style cancel"
            disabled={!selectedRow.key}
          >
            Revert Selected Log
          </Button>
        </Row>

        <Table
          rowSelection={{
            type: "radio",
            ...rowSelection,
          }}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={historyLogDataTable}
        />
      </Space>
    </div>
  );
};

HistoryLog.propTypes = {
  historyLogDataTable: PropTypes.array,
};

export default HistoryLog;
