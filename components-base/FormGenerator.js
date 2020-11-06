import React from 'react'
import { Form, Input, Select, Checkbox, SubmitButton, ResetButton, FormItem } from 'formik-antd'
import { Formik } from 'formik'
import { Col, Row, Button } from "antd"



// optionals (for dummy data)
import { useRouter } from 'next/dist/client/router';

const FormGenerator = ({FormOptions}) => {
  console.log('this is form options',FormOptions)

  // const DummyFormOptions = {
  //   generalOptions: {
  //     type: "vertical", //horizontal, vertical, inline
  //     formClassName: "test-form",
  //     submit: {
  //       className: "primary-button-style",
  //       text: "Create User",
  //     },
  //     reset: {
  //       className: "primary-button-style",
  //       text: "Clear",
  //     },
  //     cancel: {
  //       className: "primary-button-style cancel",
  //       text: "Create User",
  //       action: () => {
  //         // useRouter().back();
  //         console.log('cancel clicked')
  //       }
  //     }
  //   },
  //   formInitialValues: {
  //     firstName: "",
  //     lastName: "",
  //     username: "",
  //     password: ""
  //   },
  //   formValidations: (values) => {
  //     const errors = {};
  //     if(!values.firstName){
  //       errors.firstName = 'First name required'
  //     }
  //     if(!values.lastName){
  //       errors.lastName = 'Last name required'
  //     }
  //     if(!values.username){
  //       errors.username = 'Login name required'
  //     }
  //     if(!values.password){
  //       errors.password = 'Password required'
  //     }else if (
  //       !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(values.password)
  //     ){
  //       errors.password = 'At least 8 characters, one uppercase and one number'
  //     }
  //     return errors;
  //   },
  //   formSubmit: (values, { setSubmitting, setFieldError }) => {
  //     setTimeout(() => {
  //       alert(JSON.stringify(values, null, 2));
  //       console.log('form submitted values',values)
  //       setSubmitting(false);
  //     }, 400);
  //   },
  //   formInputsRows: [
  //     {
  //       inputs: [
  //         {
  //           name: "firstName",
  //           label: "First Name",
  //           placeholder: "Put your first name",
  //           type: "text",
  //           required: true
  //         },
  //         {
  //           name: "lastName",
  //           label: "Last Name",
  //           placeholder: "Put your last name",
  //           type: "text",
  //           required: true
  //         },
  //         {
  //           name: "username",
  //           label: "Login Name",
  //           placeholder: "Put your login name",
  //           type: "text",
  //           required: true
  //         },
  //         {
  //           name: "password",
  //           label: "Password",
  //           placeholder: "Put your password",
  //           type: "password",
  //           tooltip: "At least 8 characters, one uppercase and one number",
  //           required: true
  //         }
  //       ]
  //     }
  //   ],
  // }

  const renderInputType = (input) => {
    switch (input.type){
      case "text": 
        return (
          <Input name={input.name} placeholder={input.placeholder}/>
        )
        break;
      case "password": 
        return (
          <Input.Password name={input.name} placeholder={input.placeholder}/>
        )
        break;
      case "select": 
        return (
          <Select name={input.name} placeholder={input.placeholder} onChange={input.customOnChange? (val)=>{input.customOnChange(val,FormOptions.formInputsRows)}: null}>
            {input.options.map((item, index) => {
              return (
                <Select.Option key={index} value={item[input.optionValue]}>
                  {item[input.optionLabel]}
                </Select.Option>
              );
            })}
          </Select>
        )
        break;
      default: 
        break;
    }
  }


  return (
    <Formik
      initialValues={FormOptions.formInitialValues}
      validate={FormOptions.formValidations}
      onSubmit={FormOptions.formSubmit}
      render={() => (
        <Form 
          layout={FormOptions.generalOptions.type}
          className={"formik-form "+FormOptions.generalOptions.formClassName}
        >
          {FormOptions.formInputsRows.map((row,index)=>{
            return (
              <Row key={index}>
                {row.inputs.map((input,idx)=>{
                  return (
                    <Col flex="auto" key={idx}>
                      <FormItem 
                        name={input.name} 
                        label={input.label}
                        tooltip={input.tooltip}
                      >
                        {renderInputType(input)}
                      </FormItem>
                    </Col>
                  )
                })}
              </Row>
            )
          })}
          <div className="actions-section">
            {FormOptions.generalOptions.cancel && 
              <Button
                className={FormOptions.generalOptions.cancel.className}
                onClick={FormOptions.generalOptions.cancel.action}
              >
                {FormOptions.generalOptions.cancel.text}
              </Button>
            }
            <SubmitButton className={FormOptions.generalOptions.submit.className} disabled={false}>{FormOptions.generalOptions.submit.text}</SubmitButton>
            <ResetButton className={FormOptions.generalOptions.reset.className} >{FormOptions.generalOptions.reset.text}</ResetButton>
          </div>
        </Form>
      )}
    />
  );
};

FormGenerator.propTypes = {
  // someData: PropTypes.string,
};

export default FormGenerator;
