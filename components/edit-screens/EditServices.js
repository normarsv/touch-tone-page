import {Col, Row} from "antd";
import PropTypes from "prop-types";
import React from "react";

const EditServices = ({ serviceContent, editable }) => {
  console.log(serviceContent);
  return (
    <div className="edit-services-div">
      <Row gutter={[{ sm: 0 }, { sm: 10 }]}>
        {serviceContent && serviceContent.map((item, index) => {
          return (
            <Col span={8} md={8} sm={24} xs={24} key={index}>
               • {item}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

EditServices.propTypes = {
  serviceContent: PropTypes.array,
  editable: PropTypes.bool,
};

export default EditServices;
