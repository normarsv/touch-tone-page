import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  message,
  Row,
  Space,
  Switch,
  Transfer,
  Upload,
} from "antd";
import ContentInnerHeader from "../misc/ContentInnerHeader";
import Search from "antd/lib/input/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../authentication/UserContext";
import FormGenerator from "../../components-base/FormGenerator";
import API from "../../API/API";

const { RangePicker } = DatePicker;

const CallForward = ({callForwardData,token}) => {
  const { userInfo } = useContext(UserContext);
  // const [mockData, setMockData] = useState();
  // const [targetKeys, setTargetKeys] = useState();
  const [infoByRole, setInfoByRole] = useState({});
  const formToDisplay = {
    generalOptions: {
      type: "vertical", //horizontal, vertical, inline
      formClassName: "call-forward-form",
      submit: {
        className: "primary-button-style",
        text: "Save",
      },
      reset: {
        className: "primary-button-style",
        text: "Clear",
      },
      cancel: {
        className: "primary-button-style cancel",
        text: "Cancel",
        action: () => {
          // useRouter().back();
          console.log('cancel clicked')
        }
      }
    },
    formInitialValues: callForwardData,
    formValidations: (values) => {
      const errors = {};
      // if(!values.firstName){
      //   errors.firstName = 'First name required'
      // }
      // if(!values.lastName){
      //   errors.lastName = 'Last name required'
      // }
      // if(!values.username){
      //   errors.username = 'Login name required'
      // }
      // if(!values.password){
      //   errors.password = 'Password required'
      // }else if (
      //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(values.password)
      // ){
      //   errors.password = 'At least 8 characters, one uppercase and one number'
      // }
      return errors;
    },
    formSubmit: (values, { setSubmitting, setFieldError }) => {
      setTimeout(async () => {
        // alert(JSON.stringify(values, null, 2));
        const api = new API(token);
        const responseDoPut = await api.PUT('/Services/call-forward',values);
        console.log('form submitted values',values)
        console.log('form response ',responseDoPut)
        setSubmitting(false);
      }, 400);
    },
    formInputsRows: [
      {
        inputs: [
          {
            name: "enabled",
            label: "Enabled",
            placeholder: "",
            type: "switch",
            checkedChildren: "Yes",
            unCheckedChildren: "No",
            defaultChecked: false
          },
        ]
      },
      {
        inputs: [
          {
            name: "terminationId",
            label: "Termination Id",
            placeholder: "",
            type: "text",
            disabled: true,
          },
          {
            name: "number",
            label: "Number",
            placeholder: "",
            type: "text",
            disabled: true,
          },
        ]
      },
      {
        inputs: [
          {
            name: "callForwardAll.currentValue",
            label: "Call Forward All",
            placeholder: "",
            type: "text",
            disabled: true,
            prefix: "Current Value: "
          },
          {
            name: "callForwardAll.currentValue",
            label: "Number",
            placeholder: "Select Number",
            type: "select",
            required: true,
            options: callForwardData.callForwardAll.options,
            optionValue: "number",
            optionLabel: "number",
          },
          {
            name: "callForwardAllActive",
            label: "Enabled",
            placeholder: "",
            type: "switch",
            checkedChildren: "Yes",
            unCheckedChildren: "No",
            defaultChecked: false
          },
        ]
      },
      {
        inputs: [
          {
            name: "callForwardBusy.currentValue",
            label: "Call Forward Busy",
            placeholder: "",
            type: "text",
            disabled: true,
            prefix: "Current Value: "
          },
          {
            name: "callForwardBusy.currentValue",
            label: "Number",
            placeholder: "Select Number",
            type: "select",
            required: true,
            options: callForwardData.callForwardBusy.options,
            optionValue: "number",
            optionLabel: "number",
          },
          {
            name: "callForwardBusyActive",
            label: "Enabled",
            placeholder: "",
            type: "switch",
            checkedChildren: "Yes",
            unCheckedChildren: "No",
            defaultChecked: false
          },
        ]
      },
      {
        inputs: [
          {
            name: "callForwardFailure.currentValue",
            label: "Call Forward Failure",
            placeholder: "",
            type: "text",
            disabled: true,
            prefix: "Current Value: "
          },
          {
            name: "callForwardFailure.currentValue",
            label: "Number",
            placeholder: "Select Number",
            type: "select",
            required: true,
            options: callForwardData.callForwardFailure.options,
            optionValue: "number",
            optionLabel: "number",
          },
          {
            name: "callForwardFailureActive",
            label: "Enabled",
            placeholder: "",
            type: "switch",
            checkedChildren: "Yes",
            unCheckedChildren: "No",
            defaultChecked: false
          },
        ]
      },
      {
        inputs: [
          {
            name: "callForwardNoAnswer.currentValue",
            label: "Call Forward No Asnwer",
            placeholder: "",
            type: "text",
            disabled: true,
            prefix: "Current Value: "
          },
          {
            name: "callForwardNoAnswer.currentValue",
            label: "Number",
            placeholder: "Select Number",
            type: "select",
            required: true,
            options: callForwardData.callForwardNoAnswer.options,
            optionValue: "number",
            optionLabel: "number",
          },
          {
            name: "callForwardNoAnswerActive",
            label: "Enabled",
            placeholder: "",
            type: "switch",
            checkedChildren: "Yes",
            unCheckedChildren: "No",
            defaultChecked: false
          },
        ]
      },
      {
        inputs: [
          {
            name: "voiceMailBoxActive",
            label: "Voicemail Box Enabled",
            placeholder: "",
            type: "switch",
            checkedChildren: "Yes",
            unCheckedChildren: "No",
            defaultChecked: false
          },
        ]
      },
    ]
  }

  return (
    <div>
      <Space size="large" direction="vertical">
        <ContentInnerHeader setBackOption />
        <Row>
          <h1 className="title-style">Call Forward</h1>
        </Row>
        <FormGenerator FormOptions={formToDisplay} />
      </Space>
    </div>
  );
};

CallForward.propTypes = {
  // someData: PropTypes.string
};

export default CallForward;
