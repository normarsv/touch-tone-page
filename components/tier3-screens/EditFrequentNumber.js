import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import { Button, Col, Input, Row, Space } from "antd";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { CloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const EditFrequentNumber = ({
  frequentNumberInfo,
  visibleEditNumber,
  setVisibleEditNumber,
}) => {
  const router = useRouter();

  console.log(frequentNumberInfo);

  return (
    <Modal
      // title={frequentNumberInfo.name + " Details"}
      visible={visibleEditNumber}
      centered
      onCancel={() => setVisibleEditNumber()}
      footer={null}
    >
      <Space direction="vertical" className="organization-detail-modal">
        <h2 className="title-style">Edit Frequent Number</h2>
        <Row type="flex" justify="center" gutter={[4, 0]} className="header">
          <Col span={12}>
            <h3>Alias</h3>
          </Col>
          <Col span={12}>
            <h3>Number</h3>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={[4, 0]} className="content">
          <Col span={12}>
            <Input disabled value={frequentNumberInfo.alias}></Input>
          </Col>
          <Col span={12}>
            <Input disabled value={frequentNumberInfo.number}></Input>
          </Col>
        </Row>
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
