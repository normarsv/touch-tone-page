import React from "react";
import PropTypes from "prop-types";
import { Space, Row, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Search from "antd/lib/input/Search";
import EditServices from "./EditServices";

const EditOrganizations = ({ editServiceContent }) => {
  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <Row type="flex" justify="space-between" align="middle">
          <label>
            <Space>
              <FontAwesomeIcon icon={faChevronLeft} /> Back
            </Space>
          </label>
          <div>
            <h1>fechitaperron</h1>
          </div>
        </Row>
        <Row>
          <h1 className="title-style">Edit Organization</h1>
        </Row>

        <Search placeholder="Search..." enterButton style={{ width: 300 }} />

        <Space direction="horizontal" size="middle">
          <Space direction="vertical">
            <h4>Name</h4>
            <Input style={{ width: 300 }} />
          </Space>
          <Space direction="vertical">
            <h4>Billing ID in Rev.io</h4>
            <Input style={{ width: 300 }} />
          </Space>
        </Space>

        <Space direction="vertical">
          <h4>List of enabled Services</h4>
          <EditServices serviceContent={editServiceContent} />
        </Space>
      </Space>
    </div>
  );
};

EditOrganizations.propTypes = {
  someData: PropTypes.string,
};

export default EditOrganizations;
