import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Transfer,
  Upload,
} from "antd";
import ContentInnerHeader from "../../misc/ContentInnerHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import FormGenerator from "../../../components-base/FormGenerator";

const NewConferenceRoom = ({ConferenceForm}) => {
  // const props = {
  //   name: "file",
  //   action: "",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   onChange(info) {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  // const [mockData, setMockData] = useState();
  // const [targetKeys, setTargetKeys] = useState();

  // useEffect(() => {
  //   getMock();
  // }, []);

  // const getMock = () => {
  //   const targetKeys = [];
  //   const mockData = [
  //     { key: 1, title: "Juan Perez ", description: "" },
  //     { key: 2, title: "User Queue ", description: "" },
  //     { key: 3, title: "Ring Group ", description: "" },
  //     { key: 4, title: "Auto attendant ", description: "" },
  //     { key: 5, title: "External Number 2 ", description: "" },
  //     { key: 6, title: "External Number 3 ", description: "" },
  //   ];
    // for (let i = 0; i < 1; i++) {
    //   const data = {
    //     key: i.toString(),
    //     title: `content ${i + 1}`,
    //   };
    //   if (data.chosen) {
    //     targetKeys.push(data.key);
    //   }
    //   mockData.push(data);
    // }
  //   setMockData(mockData);
  //   setTargetKeys(targetKeys);
  // };

  // const handleChange = (targetKeys) => {
  //   setTargetKeys(targetKeys);
  // };

  
  
  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">New Conference Room</h1>
        </Row>
        <FormGenerator FormOptions={ConferenceForm} />
        {/*
          <Space direction="vertical">
             <h4>On Hold Prompt</h4>
            <Space
              direction="horizontal"
              size="large"
              className="upload-info-style"
            >
              <Upload {...props}>
                <Button
                  type="primary"
                  className="primary-button-style alternate"
                >
                  <Space>
                    <FontAwesomeIcon icon={faUpload} /> Upload{" "}
                  </Space>
                </Button>
              </Upload>
            </Space> 
          </Space>
        */}
        </Space> 
    </div>
  );
};

NewConferenceRoom.propTypes = {
  someData: PropTypes.string,
};

export default NewConferenceRoom;
