import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import { Button, Col, Input, Row, Space } from "antd";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { CloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import FormGenerator from "../../components-base/FormGenerator";

const EditFrequentNumber = ({
  frequentNumberInfo,
  visibleEditNumber,
  setVisibleEditNumber,
  frequentNumberForm,
}) => {
  const router = useRouter();

  return (
    <Modal
      // title={frequentNumberInfo.name + " Details"}
      visible={visibleEditNumber}
      centered
      onCancel={() => setVisibleEditNumber("")}
      footer={null}
    >
      <Space direction="vertical" className="organization-detail-modal">
        <h2 className="title-style">Edit Frequent Number</h2>
        <FormGenerator FormOptions={frequentNumberForm} />

        {/* <Row type="flex" justify="center" gutter={[4, 0]} className="header">
          <Col span={12}>
            <h3>Alias</h3>
          </Col>
          <Col span={12}>
            <h3>Number</h3>
          </Col>
        </Row>
        <Row type="flex" gutter={[4, 10]} className="content">
          <Col span={12}>
            <Input value={frequentNumberInfo.alias}></Input>
          </Col>
          <Col span={12}>
            <Input value={frequentNumberInfo.number}></Input>
          </Col>
          <Col span={12}>
            <Button onClick={() => console.log("edit")}>Edit Number</Button>
          </Col>
        </Row> */}
      </Space>
    </Modal>
  );
};

EditFrequentNumber.propTypes = {
  organizationDetailsInfo: PropTypes.object,
  visibleEditNumber: PropTypes.bool,
  setVisibleEditNumber: PropTypes.func,
};

export default EditFrequentNumber;
