import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Row, Select, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const DialAssignerComponent = ({}) => {
  const [currentAssignedIndex, setcurrentAssignedIndex] = useState(0);
  const [assignToDial, setAssignToDial] = useState([
    {
      id: currentAssignedIndex,
      destination: 0,
      type: "Ring Group",
      queueName: "Ring Group",
    },
  ]);

  function newDialToAssign() {
    const tempAssignToDial = [...assignToDial];
    tempAssignToDial.push({
      id: 1,
      destination: 1,
      type: "Ring Group 2",
      queueName: "Ring Group 2",
    });
    setAssignToDial(tempAssignToDial);
  }

  function deleteDial(indexToRemove) {
    const tempAssignToDial = [...assignToDial];
    tempAssignToDial.splice(indexToRemove, 1);
    setAssignToDial(tempAssignToDial);
  }

  const hoverAnimation = {
    scale: 1.01,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  return (
    <div>
      <Space direction="vertical">
        <Row type="flex" justify="end" style={{ width: "100%" }}>
          <Button
            type="primary"
            className="primary-button-style alternate flex center"
            onClick={() => newDialToAssign()}
          >
            <Space>
              {" "}
              Assign a Dial Key <FontAwesomeIcon icon={faPlusCircle} />{" "}
            </Space>
          </Button>
        </Row>

        {assignToDial.length === 0 ? (
          <h1>Click the button to start assigning!</h1>
        ) : (
          <>
            <Row>
              <Col span={3}>
                <h4>Destination</h4>
              </Col>
              <Col span={6}>
                <h4>Type of Destination</h4>
              </Col>
              <Col span={6}>
                <h4>Queue Name</h4>
              </Col>
            </Row>
            {assignToDial.map((item, index) => {
              return (
                <Row type="flex" align="middle" gutter={[0, 10]}>
                  <Col span={3}>
                    <Select
                      className="select-arrow-boxes small"
                      value={assignToDial[index].destination}
                    ></Select>
                  </Col>
                  <Col span={6}>
                    <Select
                      className="select-arrow-boxes"
                      value={assignToDial[index].type}
                    ></Select>
                  </Col>
                  <Col span={5}>
                    <Select
                      className="select-arrow-boxes"
                      value={assignToDial[index].queueName}
                    ></Select>
                  </Col>
                  <Col span={5}>
                    <Space>
                      <motion.label whileHover={hoverAnimation}>
                        Queue Details
                      </motion.label>
                      |
                      <motion.label whileHover={hoverAnimation}>
                        Reset
                      </motion.label>
                      |
                      <motion.label
                        whileHover={hoverAnimation}
                        onClick={() => deleteDial(index)}
                      >
                        Remove
                      </motion.label>
                    </Space>
                  </Col>
                </Row>
              );
            })}
          </>
        )}
      </Space>
    </div>
  );
};

DialAssignerComponent.propTypes = {
  someData: PropTypes.string,
};

export default DialAssignerComponent;
