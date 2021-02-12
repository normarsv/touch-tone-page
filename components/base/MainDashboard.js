import { Button, Col, Row, Space } from 'antd';
import { motion } from 'framer-motion';
import { useRouter } from 'next/dist/client/router';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';

import { UserContext } from '../authentication/UserContext';
import ContentInnerHeader from '../misc/ContentInnerHeader';

const MainDashboard = ({ mainDashboardContent }) => {
  const router = useRouter();
  const { userInfo } = useContext(UserContext);

  let titleToDisplay;
  switch (userInfo.group) {
    case 'CorporateService':
    case 'OrganizationAdmin':
      titleToDisplay = 'Admin Dashboard';
      break;
    case 'EndUser':
      titleToDisplay = 'User Dashboard';
      break;

    default:
      break;
  }

  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader />

        <h1 className="title-style">{titleToDisplay}</h1>

        <Row gutter={[10, 24]} type="flex">
          {mainDashboardContent.map((item, index) => {
            return (
              <Col
                span={8}
                xxl={8}
                xl={8}
                lg={12}
                md={12}
                sm={24}
                xs={24}
                className="flex center"
                key={index}
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

MainDashboard.propTypes = {
  mainDashboardContent: PropTypes.array,
};

export default MainDashboard;
