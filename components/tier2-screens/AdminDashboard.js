import React from "react";
import PropTypes from "prop-types";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import { Button, Col, Row, Space } from "antd";
import { useRouter } from "next/dist/client/router";
import { motion } from "framer-motion";

const AdminDashboard = ({ adminDashboardContent }) => {
  const router = useRouter();

  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader />

        <Row>
          <h1 className="title-style">Admin Dashboard</h1>
        </Row>

        <Row gutter={[10, 24]} type="flex">
          {adminDashboardContent.map((item, index) => {
            return (
              <Col
                span={8}
                xxl={8}
                xl={8}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className="flex-center"
              >
                <motion.div
                  whileHover={{ scale: 1.002 }}
                  className="admin-option-main-div"
                >
                  <Space direction="vertical">
                    <h2 className="title-style">{item.title}</h2>
                    <h4>{item.count}</h4>
                  </Space>
                  <p>{item.desc}</p>
                  <motion.div whileHover={{ scale: 1.01 }}>
                    <Button
                      type="primary"
                      className="primary-button-style"
                      onClick={() => router.push(item.route)}
                    >
                      {item.buttonTitle}
                    </Button>
                  </motion.div>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Space>
    </div>
  );
};

AdminDashboard.propTypes = {
  adminDashboardContent: PropTypes.array,
};

export default AdminDashboard;
