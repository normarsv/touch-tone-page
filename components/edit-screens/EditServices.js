import { Checkbox, Col, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";

const EditServices = ({ serviceContent, editable }) => {
  console.log(serviceContent);
  return (
    <div className="edit-services-div">
      <Row gutter={[{ sm: 0 }, { sm: 10 }]}>
        {serviceContent.map((item, index) => {
          return (
            <Col span={8} md={8} sm={24} xs={24} key={index}>
              <Checkbox checked={item.status} disabled={!editable}>
                {item.title}
              </Checkbox>
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
