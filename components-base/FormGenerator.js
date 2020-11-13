import React from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  SubmitButton,
  ResetButton,
  FormItem,
  Switch,
  DatePicker,
} from "formik-antd";
import { Formik, FieldArray, getIn } from "formik";
import { Col, Row, Button, Typography, Space } from "antd";

// optionals (for dummy data)
import { useRouter } from "next/dist/client/router";
import DialAssignerComponent from "../components/telephony-features/DialAssignerComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// const { RangePicker } = DatePicker;

const FormGenerator = ({ FormOptions }) => {
  const renderInputType = (input, values) => {
    switch (input.type) {
      case "text":
        return (
          <Input
            name={input.listName ? input.listName : input.name}
            placeholder={input.placeholder}
          />
        );
        break;
      case "password":
        return (
          <Input.Password
            name={input.listName ? input.listName : input.name}
            placeholder={input.placeholder}
          />
        );
        break;
      case "select":
        return (
          <Select
            name={input.listName ? input.listName : input.name}
            placeholder={input.placeholder}
            className="select-arrow-boxes"
            onChange={
              input.customOnChange
                ? (val) => {
                    input.customOnChange(val, FormOptions.formInputsRows);
                  }
                : null
            }
          >
            {input.options.map((item, index) => {
              return (
                <Select.Option key={index} value={item[input.optionValue]}>
                  {item[input.optionLabel]}
                </Select.Option>
              );
            })}
          </Select>
        );
        break;
      case "switch":
        return (
          <Switch
            name={input.listName ? input.listName : input.name}
            checkedChildren={input.checkedChildren}
            unCheckedChildren={input.unCheckedChildren}
            defaultChecked={input.defaultChecked}
          />
        );
        break;
      case "datePicker":
        return (
          <DatePicker name={input.listName ? input.listName : input.name} />
        );
        break;
      case "checkBox":
        return (
          <Checkbox
            name={input.listName ? input.listName : input.name}
            defaultChecked={input.defaultChecked}
          >
            {input.text}
          </Checkbox>
        );
        break;
      case "checkBoxGroup":
        return (
          <Checkbox.Group
            name={input.listName ? input.listName : input.name}
            defaultChecked={input.defaultChecked}
            options={input.options}
          />
        );
        break;
      case "list":
        let listArrayLength = values[input.name]
          ? values[input.name].length
          : 0;
        return (
          <FieldArray
            key={input.name}
            name={input.name}
            render={(arrayHelpers) => (
              <Col span={24}>
                <h2 className="separator-title">
                  {input.label}{" "}
                  {input.addMax ? "(max. Inputs: " + input.addMax + ")" : ""}
                </h2>
                {values[input.name] && values[input.name].length > 0
                  ? values[input.name].map((listItem, index) => {
                      return (
                        <Row key={index}>
                          {input.listFields.map((field, idx) => {
                            const newFieldName =
                              input.name + "[" + index + "]." + field.name;
                            field.listName = newFieldName;
                            return (
                              <Col flex="auto" key={idx}>
                                <FormItem
                                  name={newFieldName}
                                  label={field.label}
                                  tooltip={field.tooltip}
                                  valuePropName={
                                    field.type === "switch" ||
                                    field.type === "checkBox" ||
                                    field.type === "checkBoxGroup"
                                      ? "checked"
                                      : undefined
                                  }
                                >
                                  {renderInputType(field)}
                                </FormItem>
                              </Col>
                            );
                          })}
                          <Col flex="auto" className="list-actions">
                            <FormItem name="action" label="Actions">
                              {input.customActions &&
                                input.customActions.map((action, i) => {
                                  return (
                                    <Button
                                      key={i}
                                      className="custom-added primary-button-style alternate form-full-width"
                                      type="primary"
                                      onClick={() => {
                                        action.onClick(
                                          values[input.name][index]
                                        );
                                      }}
                                    >
                                      {action.label}
                                    </Button>
                                  );
                                })}
                              <Button
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <Space className="flex center">
                                  Remove
                                  <FontAwesomeIcon icon={faMinusCircle} />
                                </Space>
                              </Button>
                            </FormItem>
                          </Col>
                        </Row>
                      );
                    })
                  : ""}
                <Col flex="auto">
                  {arrayHelpers.form.errors[input.name] &&
                    typeof arrayHelpers.form.errors[input.name] === "string" &&
                    getIn(arrayHelpers.form.errors, input.name) && (
                      <div>
                        <Typography.Text type="danger">
                          {getIn(arrayHelpers.form.errors, input.name)}
                        </Typography.Text>
                      </div>
                    )}
                  <Button
                    type="primary"
                    className="primary-button-style alternate"
                    disabled={
                      input.addMax
                        ? listArrayLength < input.addMax
                          ? false
                          : true
                        : false
                    }
                    onClick={() => {
                      if (input.addMax) {
                        if (listArrayLength < input.addMax) {
                          let addObject = {};
                          input.listFields.map((field, idx) => {
                            addObject[field.name] = "";
                          });
                          arrayHelpers.push(addObject);
                        }
                      } else {
                        let addObject = {};
                        input.listFields.map((field, idx) => {
                          addObject[field.name] = "";
                        });
                        arrayHelpers.push(addObject);
                      }
                    }}
                  >
                    <Space className="flex center">
                      Add <FontAwesomeIcon icon={faPlusCircle} />
                    </Space>
                  </Button>
                </Col>
              </Col>
            )}
          />
        );
        break;
      default:
        break;
    }
  };

  return (
    <Formik
      initialValues={FormOptions.formInitialValues}
      validate={FormOptions.formValidations}
      onSubmit={FormOptions.formSubmit}
    >
      {({ values }) => (
        <Form
          layout={FormOptions.generalOptions.type}
          className={"formik-form " + FormOptions.generalOptions.formClassName}
        >
          {FormOptions.formInputsRows.map((row, index) => {
            return (
              <Row key={index}>
                {row.separatorTitle && (
                  <h2 className="separator-title">{row.separatorTitle}</h2>
                )}
                {row.inputs.map((input, idx) => {
                  if (input.type === "list") {
                    return renderInputType(input, values);
                  }
                  return (
                    <Col flex="auto" key={idx}>
                      <FormItem
                        name={input.name}
                        label={input.label}
                        tooltip={input.tooltip}
                        valuePropName={
                          input.type === "switch" ||
                          input.type === "checkBox" ||
                          input.type === "checkBoxGroup"
                            ? "checked"
                            : undefined
                        }
                      >
                        {renderInputType(input, values)}
                      </FormItem>
                    </Col>
                  );
                })}
              </Row>
            );
          })}
          <div className="actions-section">
            {FormOptions.generalOptions.cancel && (
              <Button
                className={FormOptions.generalOptions.cancel.className}
                onClick={FormOptions.generalOptions.cancel.action}
              >
                {FormOptions.generalOptions.cancel.text}
              </Button>
            )}
            <SubmitButton
              className={FormOptions.generalOptions.submit.className}
              disabled={false}
            >
              {FormOptions.generalOptions.submit.text}
            </SubmitButton>
            <ResetButton className={FormOptions.generalOptions.reset.className}>
              {FormOptions.generalOptions.reset.text}
            </ResetButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

FormGenerator.propTypes = {
  // someData: PropTypes.string,
};

export default FormGenerator;
