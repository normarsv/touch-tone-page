import React from "react";
import PropTypes from "prop-types";
import { Checkbox, Row, Space } from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import Search from "antd/lib/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

const CallRecordingsOA = ({}) => {
  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader />

        <Row>
          <h1 className="title-style">List All Users</h1>
        </Row>

        <Search
          placeholder="Search organization..."
          enterButton
          style={{ width: 300 }}
        />

        <Row type="flex" justify="space-between">
          <Space size="large">
            <Space size="small">
              <Checkbox onChange={() => rowSelection}>Select all</Checkbox> |{" "}
              <FontAwesomeIcon icon={faEraser} />
            </Space>
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
            </Space>
          </Space>
          <Row>
            <Space>
              <Search
                placeholder="Search users..."
                enterButton
                style={{ width: 300 }}
              />
              <Space>
                <Button
                  type="primary"
                  className="primary-button-style alternate-button-style"
                  onClick={() => router.push("/list-users/bulk-import")}
                >
                  <Space>
                    Bulk Import
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Space>
                </Button>
                <Button
                  type="primary"
                  className="primary-button-style alternate-button-style"
                  onClick={() => router.push("/list-users/new-user")}
                >
                  <Space>
                    New User
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </Space>
                </Button>
              </Space>
            </Space>
          </Row>
        </Row>

        <Table
          rowSelection={rowSelection}
          bordered
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={data}
        />
      </Space>
    </div>
  );
};

CallRecordingsOA.propTypes = {
  someData: PropTypes.string,
};

export default CallRecordingsOA;
