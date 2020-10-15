import React from "react";
import PropTypes from "prop-types";
import { Space, Checkbox, Col, Row } from "antd";

const EditServices = ({ serviceContent, editable }) => {
  return (
    <div className="edit-services-div">
      <Row gutter={[{ sm: 0 }, { sm: 10 }]}>
        {serviceContent.map((item, index) => {
          return (
            <Col span={8} md={8} sm={24} xs={24} key={item.key}>
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
};

export default EditServices;
