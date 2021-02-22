import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import { Button, Col, Input, Row, Space } from "antd";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { CloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const OrganizationDetailsModal = ({
  organizationDetailsInfo,
  visibleDetailsModal,
  setVisibleDetailsModal,
}) => {
  const router = useRouter();

  return (
    <Modal
      // title={organizationDetailsInfo.name + " Details"}
      visible={visibleDetailsModal}
      centered
      onCancel={() => setVisibleDetailsModal()}
      footer={null}
    >
      <Space direction="vertical" className="organization-detail-modal">
        <h2 className="title-style">Details</h2>
        <Row type="flex" justify="center" gutter={[4, 0]} className="header">
          <Col span={12}>
            <h3>Name</h3>
          </Col>
          <Col span={12}>
            <h3>Account Number in Rev.io</h3>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={[4, 0]} className="content">
          <Col span={12}>
            <Input disabled value={organizationDetailsInfo.name}></Input>
          </Col>
          <Col span={12}>
            <Input disabled value={organizationDetailsInfo.billingId}></Input>
          </Col>
        </Row>

        <div className="flex space-between">
          <Button
            type="primary"
            className="primary-button-style alternate modal-style"
            onClick={() =>
              router.push(
                "/list-organizations/" +
                  organizationDetailsInfo.key +
                  "/list-dids"
              )
            }
          >
            See List of DIDs
          </Button>

          <Button
            type="primary"
            className="primary-button-style alternate modal-style"
            onClick={() =>
              router.push({
                pathname: "/list-users",
                query: { orgId: organizationDetailsInfo.key },
              })
            }
          >
            See List of all Users
          </Button>

          <Button
            type="primary"
            className="primary-button-style modal-style"
            onClick={() =>
              router.push({
                pathname:
                  "/list-organizations/" +
                  organizationDetailsInfo.key +
                  "/history-log",
              })
            }
          >
            History Log
          </Button>
        </div>
      </Space>
    </Modal>
  );
};

OrganizationDetailsModal.propTypes = {
  organizationDetailsInfo: PropTypes.object,
  visibleDetailsModal: PropTypes.bool,
  setVisibleDetailsModal: PropTypes.func,
};

export default OrganizationDetailsModal;
