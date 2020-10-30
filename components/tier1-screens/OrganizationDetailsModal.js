import React from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import { Button, Space } from "antd";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

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
      <Space direction="vertical">
        <Space direction="horizontal" size="large">
          <Space direction="vertical">
            <h3 className="title-style">Name</h3>
            <h4>{organizationDetailsInfo.name}</h4>
          </Space>
          <Space direction="vertical">
            <h3 className="title-style">Billing ID in Rev.io</h3>
            <h4>{organizationDetailsInfo.billingId}</h4>
          </Space>
        </Space>

        <div className="flex space-between">
          <Button
            type="primary"
            className="primary-button-style alternate"
            onClick={() =>
              router.push(
                "/list-organizations/" +
                  organizationDetailsInfo.id +
                  "/list-dids"
              )
            }
          >
            <Space>
              <FontAwesomeIcon icon={faList} />
              See List of DIDs
            </Space>
          </Button>

          <Button
            type="primary"
            className="primary-button-style alternate"
            onClick={() =>
              router.push({
                pathname: "/list-users",
                query: { orgId: organizationDetailsInfo.id },
              })
            }
          >
            <Space>
              <FontAwesomeIcon icon={faList} />
              See List of all Users
            </Space>
          </Button>

          <Button
            type="primary"
            className="primary-button-style"
            onClick={() =>
              router.push({
                pathname: "/list-users",
                query: { orgId: organizationDetailsInfo.id },
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
