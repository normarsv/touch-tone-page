import { Col, Divider, Row, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import FormGenerator from "../../components-base/FormGenerator";
import ContentInnerHeader from "../misc/ContentInnerHeader";

const { Option } = Select;

const NewUser = ({
  formsByUserSelected,
  editServiceContent,
  displayedForm,
}) => {
  const [resetFormFields, setResetFormFields] = useState(false);
  const [formToDisplay, setFormToDisplay] = useState({});

  const roleToSelect = [
    { id: 1, name: "Business Support", value: "businessSupport" },
    { id: 2, name: "Distributor", value: "distributor" },
    { id: 3, name: "Organization Admin", value: "organizationAdmin" },
    { id: 4, name: "Enterprise", value: "enterprise" },
    { id: 5, name: "End User", value: "endUser" },
  ];

  function renderForm(value) {
    displayedForm(value);
    value === "businessSupport" || value === "distributor"
      ? setFormToDisplay(formsByUserSelected.businessDistributor)
      : value === "organizationAdmin" || value === "enterprise"
      ? setFormToDisplay(formsByUserSelected.orgAdminEnterprise)
      : setFormToDisplay(formsByUserSelected.newEndUser);
    setResetFormFields(true);
  }

  // useEffect(() => {
  //   if (resetFormFields === true) {
  //     setResetFormFields(false);
  //   }
  // }, [resetFormFields]);

  // console.log(resetFormFields);

  return (
    <div>
      <Space size="large" direction="vertical" style={{ width: "100%" }}>
        <ContentInnerHeader setBackOption />

        <Row>
          <h1 className="title-style">New User</h1>
        </Row>
        <Row>
          <Col flex="auto">
            <Select
              onChange={(value) => renderForm(value)}
              placeholder="Select Role..."
              className="select-arrow-boxes"
            >
              {roleToSelect.map((item, index) => {
                return (
                  <Option key={index} value={item.value}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Divider orientation="center" type="horizontal" />

        {formToDisplay.generalOptions && (
          <FormGenerator FormOptions={formToDisplay} />
        )}

        {/* <Row gutter={[0, 20]} type="flex">
          {formToDisplay &&
            formToDisplay.map((item, index) => {
              return ( 
                <Col span={6}>
                  <NewUserFormCreator
                    onChange={async (value) => {
                      let formField = { ...currentFormField };
                      formField[item.key] = value;
                      for (const itemCheck of formToDisplay) {
                        if (itemCheck.onChangeValue !== undefined) {
                          const returnData = await itemCheck.onChangeValue({
                            valueChange: item.key,
                            currentForm: formToDisplay,
                            currentFields: formField,
                          });
                          if (returnData.form !== null) {
                            setFormToDisplay(returnData.form);
                          }
                          if (returnData.fields !== null) {
                            formField = returnData.fields;
                          }
                        }
                      }
                      console.log(formField);
                      setCurrentFormField(formField);
                    }}
                    fieldValue={currentFormField[item.key]}
                    selectSubOptionsKey={item.key}
                    selectSubOptions={item.options}
                    title={item.title}
                    type={item.type}
                    extraMsg={item.extraMsg}
                    icon={item.icon}
                  />
                </Col>
              );
            })}
        </Row>

        <Row type="flex" justify="end">
          <Space size="large">
            <Button
              onClick={() => pushRoute()}
              className="primary-button-style cancel"
            >
              Cancel User
            </Button>
            <Button
              onClick={() => openMessage()}
              className="primary-button-style"
              type="primary"
            >
              Creating User
            </Button>
          </Space>
        </Row> */}
      </Space>
    </div>
  );
};

NewUser.propTypes = {
  // someData: PropTypes.string,
};

export default NewUser;
