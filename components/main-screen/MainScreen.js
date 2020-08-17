import React from "react";
import { Table, Row, Space, Checkbox, Button, Select } from "antd";
import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const { Search } = Input;

const MainScreen = ({ columns, data }) => {
  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <Row>
          <h1>List All Organizations</h1>
        </Row>
        <Row>
          <Search placeholder="Search..." enterButton style={{ width: 300 }} />
        </Row>
        <Row type="flex" justify="space-between">
          <Space size="middle">
            <Checkbox>Select all</Checkbox> |{" "}
            <FontAwesomeIcon icon={faEraser} />
          </Space>
          <Space size="middle">
            <Button>
              <Space size="small">
                Bulk Import <FontAwesomeIcon icon={faPlusCircle} />{" "}
              </Space>
            </Button>
            <Button>
              <Space size="small">
                New Organization <FontAwesomeIcon icon={faPlusCircle} />{" "}
              </Space>
            </Button>

            <Select placeholder="Select.." />
          </Space>
        </Row>

        <Table
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          bordered
          columns={columns}
          dataSource={data}
        />
      </Space>
    </div>
  );
};

MainScreen.propTypes = {
  //   someData: PropTypes.string,
};

export default MainScreen;
