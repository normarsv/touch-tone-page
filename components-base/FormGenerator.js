import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Space, Typography } from 'antd';
import { FieldArray, getIn } from 'formik';
import {
  Checkbox,
  DatePicker,
  Form,
  FormItem,
  Input,
  ResetButton,
  Select,
  SubmitButton,
  Switch,
  TimePicker,
} from 'formik-antd';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import FormikRef from './FormikRef';

const RenderInputType = ({
  input,
  values,
  formikData,
  indexArray,
  formOptions,
  listName,
}) => {
  switch (input.type) {
    case 'text':
      return (
        <Input
          name={listName ? listName : input.name}
          placeholder={input.placeholder}
          disabled={input.disabled ? input.disabled : false}
          prefix={input.prefix ? input.prefix : undefined}
          disabled={formikData.isSubmitting}
        />
      );
      break;
    case 'password':
      return (
        <Input.Password
          name={listName ? listName : input.name}
          placeholder={input.placeholder}
          disabled={formikData.isSubmitting}
        />
      );
      break;
    case 'select':
      return (
        <Select
          disabled={formikData.isSubmitting}
          mode={input.mode ? input.mode : ''}
          name={listName ? listName : input.name}
          placeholder={input.placeholder}
          className='select-arrow-boxes'
          onChange={
            input.customOnChange
              ? (newVal) => {
                  input.customOnChange(
                    newVal,
                    formOptions,
                    formikData,
                    indexArray
                  );
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
    case 'switch':
      return (
        <Switch
          disabled={formikData.isSubmitting}
          name={listName ? listName : input.name}
          checkedChildren={input.checkedChildren}
          unCheckedChildren={input.unCheckedChildren}
          defaultChecked={input.defaultChecked}
        />
      );
      break;
    case 'datePicker':
      return (
        <DatePicker
          disabled={formikData.isSubmitting}
          name={listName ? listName : input.name}
          format={input.format}
          disabledDate={input.disabledDate}
          showTime={input.showTime}
          onChange={
            input.customOnChange
              ? (momentDate, stringDate) => {
                  input.customOnChange(
                    stringDate,
                    formOptions,
                    formikData,
                    indexArray
                  );
                }
              : null
          }
        />
      );
      break;
    case 'timePicker':
      return (
        <TimePicker
          disabled={formikData.isSubmitting}
          name={listName ? listName : input.name}
          format={input.format}
          disabledHours={input.disabledHours}
          disabledMinutes={input.disabledMinutes}
          onChange={
            input.customOnChange
              ? (momentDate, stringDate) => {
                  input.customOnChange(
                    stringDate,
                    formOptions,
                    formikData,
                    indexArray
                  );
                }
              : null
          }
        />
      );
      break;
    case 'checkBox':
      return (
        <Checkbox
          disabled={formikData.isSubmitting}
          name={listName ? listName : input.name}
          defaultChecked={input.defaultChecked}
        >
          {input.text}
        </Checkbox>
      );
      break;
    case 'checkBoxGroup':
      return (
        <Checkbox.Group
          disabled={formikData.isSubmitting}
          name={listName ? listName : input.name}
          defaultChecked={input.defaultChecked}
          options={input.options}
        />
      );
      break;
    case 'list':
      let listArrayLength = values[input.name] ? values[input.name].length : 0;
      return (
        <FieldArray
          key={input.name}
          name={input.name}
          render={(arrayHelpers) => (
            <Col span={24}>
              <h2 className='separator-title'>
                {input.label}{' '}
                {input.addMax ? '(max. Inputs: ' + input.addMax + ')' : ''}
              </h2>
              {values[input.name] && values[input.name].length > 0
                ? values[input.name].map((listItem, index) => {
                    return (
                      <Row key={index}>
                        {input.listFields.map((field, idx) => {
                          const newFieldName =
                            input.name + '[' + index + '].' + field.name;

                          return (
                            <Col flex='auto' key={idx}>
                              <FormItem
                                name={newFieldName}
                                label={field.label}
                                tooltip={field.tooltip}
                                valuePropName={
                                  field.type === 'switch' ||
                                  field.type === 'checkBox' ||
                                  field.type === 'checkBoxGroup'
                                    ? 'checked'
                                    : undefined
                                }
                              >
                                <RenderInputType
                                  input={field}
                                  listName={newFieldName}
                                  formikData={formikData}
                                  formOptions={formOptions}
                                  indexArray={index}
                                />
                              </FormItem>
                            </Col>
                          );
                        })}
                        <Col flex='auto' className='list-actions'>
                          <FormItem name='action' label='Actions'>
                            {input.customActions &&
                              input.customActions.map((action, i) => {
                                return (
                                  <Button
                                    key={i}
                                    className='custom-added primary-button-style alternate form-full-width'
                                    type='primary'
                                    onClick={() => {
                                      action.onClick(values[input.name][index]);
                                    }}
                                  >
                                    {action.label}
                                  </Button>
                                );
                              })}
                            <Button
                              disabled={formikData.isSubmitting}
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <Space className='flex center'>
                                Remove
                                <FontAwesomeIcon icon={faMinusCircle} />
                              </Space>
                            </Button>
                          </FormItem>
                        </Col>
                      </Row>
                    );
                  })
                : ''}
              <Col flex='auto'>
                {arrayHelpers.form.errors[input.name] &&
                  typeof arrayHelpers.form.errors[input.name] === 'string' &&
                  getIn(arrayHelpers.form.errors, input.name) && (
                    <div>
                      <Typography.Text type='danger'>
                        {getIn(arrayHelpers.form.errors, input.name)}
                      </Typography.Text>
                    </div>
                  )}
                <Button
                  disabled={formikData.isSubmitting}
                  type='primary'
                  className='primary-button-style alternate'
                  disabled={
                    input.addMax
                      ? listArrayLength < input.addMax
                        ? formikData.isSubmitting
                        : true
                      : formikData.isSubmitting
                  }
                  onClick={() => {
                    if (input.addMax) {
                      if (listArrayLength < input.addMax) {
                        let addObject = {};
                        input.listFields.map((field, idx) => {
                          addObject[field.name] = '';
                        });
                        arrayHelpers.push(addObject);
                      }
                    } else {
                      let addObject = {};
                      input.listFields.map((field, idx) => {
                        addObject[field.name] = '';
                      });
                      arrayHelpers.push(addObject);
                    }
                  }}
                >
                  <Space className='flex center'>
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
let FormGenerator = ({ FormOptions }, ref) => {
  const formikRef = useRef(null);
  useImperativeHandle(ref, () => ({
    formikRef: formikRef.current,
  }));

  return (
    <FormikRef
      ref={formikRef}
      initialValues={FormOptions.formInitialValues}
      validate={FormOptions.formValidations}
      onSubmit={FormOptions.formSubmit}
    >
      {({ values, resetForm, setFieldValue, isSubmitting }) => {
        const formikData = {
          values,
          resetForm,
          setFieldValue,
          isSubmitting,
        };
        return (
          <Form
            layout={FormOptions.generalOptions.type}
            className={
              'formik-form ' + FormOptions.generalOptions.formClassName
            }
          >
            {FormOptions.formInputsRows.map((row, index) => {
              return (
                <Row key={index}>
                  {row.separatorTitle && (
                    <h2 className='separator-title'>{row.separatorTitle}</h2>
                  )}
                  {row.inputs.map((input, idx) => {
                    if (input.type === 'list') {
                      <RenderInputType
                        input={input}
                        values={values}
                        formikData={formikData}
                        formOptions={FormOptions}
                      />;
                    }
                    return (
                      <Col
                        xxl={
                          input.breakpoints !== undefined
                            ? input.breakpoints.xxl
                            : null
                        }
                        xl={
                          input.breakpoints !== undefined
                            ? input.breakpoints.xl
                            : null
                        }
                        lg={
                          input.breakpoints !== undefined
                            ? input.breakpoints.lg
                            : null
                        }
                        md={
                          input.breakpoints !== undefined
                            ? input.breakpoints.md
                            : null
                        }
                        sm={
                          input.breakpoints !== undefined
                            ? input.breakpoints.sm
                            : null
                        }
                        xs={
                          input.breakpoints !== undefined
                            ? input.breakpoints.xs
                            : null
                        }
                        flex={input.breakpoints === undefined ? 'auto' : null}
                        key={idx}
                      >
                        <FormItem
                          name={input.name}
                          label={input.label}
                          tooltip={input.tooltip}
                          valuePropName={
                            input.type === 'switch' ||
                            input.type === 'checkBox' ||
                            input.type === 'checkBoxGroup'
                              ? 'checked'
                              : undefined
                          }
                        >
                          <RenderInputType
                            input={input}
                            values={values}
                            formikData={formikData}
                            formOptions={FormOptions}
                          />
                        </FormItem>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
            <div className='actions-section'>
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
              <ResetButton
                disabled={isSubmitting}
                className={FormOptions.generalOptions.reset.className}
              >
                {FormOptions.generalOptions.reset.text}
              </ResetButton>
            </div>
          </Form>
        );
      }}
    </FormikRef>
  );
};

FormGenerator.propTypes = {
  // someData: PropTypes.string,
};

FormGenerator = forwardRef(FormGenerator);

export default FormGenerator;
