import React from "react";
import PropTypes from "prop-types";
import { Button, Col, Modal, Row, Space } from "antd";
import FormGenerator from "../../components-base/FormGenerator";

const AddNewFrequentNumber = ({
  frequentNumberForm,
  visibleNewFrequentNumber,
  setVisibleNewFrequentNumber,
}) => {
  function handleCancel() {
    setVisibleNewFrequentNumber();
  }

  return (
    <Modal
      visible={visibleNewFrequentNumber}
      centered
      onCancel={() => handleCancel()}
      footer={null}
    >
      <Space direction="vertical" size="large">
        <h2 className="title-style">Add Frequent Number</h2>
        <FormGenerator FormOptions={frequentNumberForm} />
      </Space>
    </Modal>
  );
};

AddNewFrequentNumber.propTypes = {
  someData: PropTypes.string,
};

export default AddNewFrequentNumber;
