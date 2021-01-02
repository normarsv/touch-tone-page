import { message } from "antd";
import { Component } from "react";
import API from "../../../API/API";
import MyFindMe from "../../../components/tier2-screens/MyFindMe";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { IsAValidPhoneNumber, systemLog } from "../../../scripts/General";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (user.group) {
        switch (user.group) {
          case "SuperAdmin":
            res.writeHead(302, {
              Location: "/list-organizations",
            });
            res.end();

            break;

          case "BusinessSuport":
            res.writeHead(302, {
              Location: "/list-organizations",
            });
            res.end();

            break;

          case "Distributor":
            res.writeHead(302, {
              Location: "/list-organizations",
            });
            res.end();

            break;

          default:
            break;
        }
      } else {
        res.writeHead(302, {
          Location: "/",
        });
        res.end();
      }
    }

    const actualUser = user;

    const api = new API(actualUser.token);

    const resUserMyFindme = await api.GET("/Services/find-me");

    const actualUserMyFindme = resUserMyFindme.response;

    return {
      user,
      actualUserMyFindme,
      actualUser,
    };
  }
  constructor(props) {
    super(props);
    console.log(props);
    const destination1Type =
      this.props.actualUserMyFindme.findeMeItems[0].destination.currentType ||
      "Extentions";
    const destination1Options = this.props.actualUserMyFindme.findeMeItems[0].destination.options.find(
      (option) => {
        return option.optionName === destination1Type;
      }
    );

    const destination2Type =
      this.props.actualUserMyFindme.findeMeItems[1].destination.currentType ||
      "Extentions";
    const destination2Options = this.props.actualUserMyFindme.findeMeItems[1].destination.options.find(
      (option) => {
        return option.optionName === destination2Type;
      }
    );

    const destination3Type =
      this.props.actualUserMyFindme.findeMeItems[2].destination.currentType ||
      "Frequent Numbers";
    const destination3Options = this.props.actualUserMyFindme.findeMeItems[2].destination.options.find(
      (option) => {
        return option.optionName === destination3Type;
      }
    );

    this.userinfo = "";
    this.endUserForm = {
      generalOptions: {
        type: "vertical", //horizontal, vertical, inline
        formClassName: "test-form",
        submit: {
          className: "primary-button-style",
          text: "Save My Find me",
        },
        reset: {
          className: "primary-button-style",
          text: "Clear",
        },
        // cancel: {
        //   className: "primary-button-style cancel",
        //   text: "Cancel My Find me",
        //   action: () => {
        //     // useRouter().back();
        //     console.log("cancel clicked");
        //   },
        // },
      },
      formInitialValues: {
        // findeMeDescription: "",
        // findeMeScheduleDescription: "",
        // startTime: "",
        // endTime: "",
        // dayrange: ,
        // enabled: false,

        findeMeDescription: this.props.actualUserMyFindme.findeMeDescription,
        findeMeScheduleDescription: this.props.actualUserMyFindme
          .findeMeScheduleDescription,
        startDate: this.props.actualUserMyFindme.startDate,
        endDate: this.props.actualUserMyFindme.endDate,
        enabled: this.props.actualUserMyFindme.enabled,
        dayrange: this.props.actualUserMyFindme.dayrange,
        destination1: this.props.actualUserMyFindme.findeMeItems[0].destination
          .currentValue,
        destination1Options: destination1Type,
        destination2: this.props.actualUserMyFindme.findeMeItems[1].destination
          .currentValue,
        destination2Options: destination2Type,
        destination3: this.props.actualUserMyFindme.findeMeItems[2].destination
          .currentValue,
        destination3Options: destination3Type,
      },
      formValidations: (values) => {
        const errors = {};
        // console.log(values);
        if (!values.findeMeDescription) {
          errors.findeMeDescription = "Description required";
        }
        if (!values.findeMeScheduleDescription) {
          errors.findeMeScheduleDescription = "Schedule description required";
        }
        if (!values.startDate) {
          errors.startDate = "Start date required";
        }
        if (!values.endDate) {
          errors.endDate = "End date required";
        }
        if (values.endDate < values.startDate) {
          errors.endDate = "Set a valid end date";
        }

        return errors;
      },
      formSubmit: async (values, { setSubmitting, setFieldError }) => {
        setSubmitting(true);
        await this.finalSubmit(values);
        setSubmitting(false);
      },
      formInputsRows: [
        /*
        {
          inputs: [
            {
              name: "findeMeDescription",
              label: "Find Me Description",
              placeholder: "Find Me Description...",
              type: "text",
              required: true,
            },
          ],
        },
        */
        { separatorTitle: "Schedule", inputs: [] },
        {
          inputs: [
            {
              name: "findeMeScheduleDescription",
              label: "Schedule Description",
              placeholder: "Schedule Description...",
              type: "text",
              required: true,
            },
            {
              name: "startDate",
              label: "Start Date",
              type: "datePicker",
              required: true,
            },
            {
              name: "endDate",
              label: "End Date",
              type: "datePicker",
              required: true,
            },
          ],
        },
        { separatorTitle: "Day Range", inputs: [] },
        {
          inputs: [
            {
              name: "dayrange",
              label: "",
              placeholder: "",
              type: "checkBoxGroup",
              options: [
                { label: "Monday", value: "monday" },
                { label: "Tuesday", value: "tuesday" },
                { label: "Wednesday", value: "wednesday" },
                { label: "Thursday", value: "thursday" },
                { label: "Friday", value: "friday" },
                { label: "Saturday", value: "saturday" },
                { label: "Sunday", value: "sunday" },
              ],
              defaultChecked: false,
            },
          ],
        },
        { separatorTitle: "Ringing Group", inputs: [] },
        {
          inputs: [
            {
              name: "enabled",
              label: "Ring at the same time",
              placeholder: "",
              type: "switch",
              checkedChildren: "Yes",
              unCheckedChildren: "No",
              defaultChecked: false,
            },
          ],
        },
        {
          inputs: [
            {
              name: "destination1Options",
              label: "Destination 1 Type",
              placeholder: "Select Destination Options",
              type: "select",
              required: true,
              options: [
                ...this.props.actualUserMyFindme.findeMeItems[0].destination
                  .options,
                { optionName: "External" },
              ],
              optionValue: "optionName",
              optionLabel: "optionName",
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              customOnChange: async (
                newVal,
                formOptions,
                formikData,
                indexArray
              ) => {
                if (newVal === "External") {
                  formOptions.formInputsRows[6].inputs[1].mode = "tags";
                  formOptions.formInputsRows[6].inputs[1].options = [];
                  formikData.setFieldValue("destination1", "", false);
                } else {
                  const destinationOptions = this.props.actualUserMyFindme.findeMeItems[0].destination.options.find(
                    (option) => {
                      return option.optionName === newVal;
                    }
                  );
                  formOptions.formInputsRows[6].inputs[1].mode = "";
                  formOptions.formInputsRows[6].inputs[1].options =
                    destinationOptions.numbers;
                  formikData.setFieldValue("destination1", "", false);
                }
              },
            },
            {
              name: "destination1",
              label: "Destination 1",
              placeholder: "Select Destination",
              type: "select",
              required: true,
              options: destination1Options.numbers,
              optionValue: "value",
              optionLabel: "name",
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              customOnChange: async (
                newVal,
                formOptions,
                formikData,
                indexArray
              ) => {
                const currentOption = formikData.values.destination1Options;
                if (currentOption === "External") {
                  const reduceGetOnlyNew = newVal.reduce(
                    (returnData, currentNumber) => {
                      if (IsAValidPhoneNumber(currentNumber) === true) {
                        returnData = [currentNumber];
                      }
                      return returnData;
                    },
                    []
                  );
                  formikData.setFieldValue(
                    "destination1",
                    reduceGetOnlyNew,
                    false
                  );
                }
              },
            },
          ],
        },
        {
          inputs: [
            {
              name: "destination2Options",
              label: "Destination 2 Type",
              placeholder: "Select Destination Options",
              type: "select",
              required: true,
              options: [
                ...this.props.actualUserMyFindme.findeMeItems[1].destination
                  .options,
                { optionName: "External" },
              ],
              optionValue: "optionName",
              optionLabel: "optionName",
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              customOnChange: async (
                newVal,
                formOptions,
                formikData,
                indexArray
              ) => {
                if (newVal === "External") {
                  formOptions.formInputsRows[7].inputs[1].mode = "tags";
                  formOptions.formInputsRows[7].inputs[1].options = [];
                  formikData.setFieldValue("destination2", "", false);
                } else {
                  const destinationOptions = this.props.actualUserMyFindme.findeMeItems[1].destination.options.find(
                    (option) => {
                      return option.optionName === newVal;
                    }
                  );
                  formOptions.formInputsRows[7].inputs[1].mode = "";
                  formOptions.formInputsRows[7].inputs[1].options =
                    destinationOptions.numbers;
                  formikData.setFieldValue("destination2", "", false);
                }
              },
            },
            {
              name: "destination2",
              label: "Destination 2",
              placeholder: "Select Destination",
              type: "select",
              required: true,
              options: destination2Options.numbers,
              optionValue: "value",
              optionLabel: "name",
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              customOnChange: async (
                newVal,
                formOptions,
                formikData,
                indexArray
              ) => {
                const currentOption = formikData.values.destination2Options;
                if (currentOption === "External") {
                  const reduceGetOnlyNew = newVal.reduce(
                    (returnData, currentNumber) => {
                      if (IsAValidPhoneNumber(currentNumber) === true) {
                        returnData = [currentNumber];
                      }
                      return returnData;
                    },
                    []
                  );
                  formikData.setFieldValue(
                    "destination2",
                    reduceGetOnlyNew,
                    false
                  );
                }
              },
            },
          ],
        },
        {
          inputs: [
            {
              name: "destination3Options",
              label: "Destination 3 Type",
              placeholder: "Select Destination Options",
              type: "select",
              required: true,
              options: [
                ...this.props.actualUserMyFindme.findeMeItems[2].destination
                  .options,
                { optionName: "External" },
              ],
              optionValue: "optionName",
              optionLabel: "optionName",
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              customOnChange: async (
                newVal,
                formOptions,
                formikData,
                indexArray
              ) => {
                if (newVal === "External") {
                  formOptions.formInputsRows[8].inputs[1].mode = "tags";
                  formOptions.formInputsRows[8].inputs[1].options = [];
                  formikData.setFieldValue("destination3", "", false);
                } else {
                  const destinationOptions = this.props.actualUserMyFindme.findeMeItems[1].destination.options.find(
                    (option) => {
                      return option.optionName === newVal;
                    }
                  );
                  formOptions.formInputsRows[8].inputs[1].mode = "";
                  formOptions.formInputsRows[8].inputs[1].options =
                    destinationOptions.numbers;
                  formikData.setFieldValue("destination3", "", false);
                }
              },
            },
            {
              name: "destination3",
              label: "Destination 3",
              placeholder: "Select Destination",
              type: "select",
              required: true,
              options: destination3Options.numbers,
              optionValue: "value",
              optionLabel: "name",
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
              customOnChange: async (
                newVal,
                formOptions,
                formikData,
                indexArray
              ) => {
                const currentOption = formikData.values.destination3Options;
                if (currentOption === "External") {
                  const reduceGetOnlyNew = newVal.reduce(
                    (returnData, currentNumber) => {
                      if (IsAValidPhoneNumber(currentNumber) === true) {
                        returnData = [currentNumber];
                      }
                      return returnData;
                    },
                    []
                  );
                  formikData.setFieldValue(
                    "destination3",
                    reduceGetOnlyNew,
                    false
                  );
                }
              },
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    systemLog.log(this.props);
  }

  async finalSubmit(valuesToSubmit) {
    // console.log(valuesToSubmit);
    const { actualUser, actualUserMyFindme } = this.props;

    const api = new API(actualUser.token);

    const finalSubmit = {
      findeMeDescription: valuesToSubmit.findeMeDescription,
      findeMeScheduleDescription: valuesToSubmit.findeMeDescription,
      startDate: valuesToSubmit.startDate,
      endDate: valuesToSubmit.endDate,
      startTime: "",
      endTime: "",
      dayrange: valuesToSubmit.dayrange,
      enabled: valuesToSubmit.enabled,
      findeMeItems: [
        {
          findMeScheduleItemId:
            actualUserMyFindme.findeMeItems[0].findMeScheduleItemId,
          priority: valuesToSubmit.enabled ? 1 : 1,
          destination: {
            currentValue:
              Array.isArray(valuesToSubmit.destination1) === true
                ? valuesToSubmit.destination1[0]
                : valuesToSubmit.destination1,
          },
        },
        {
          findMeScheduleItemId:
            actualUserMyFindme.findeMeItems[1].findMeScheduleItemId,
          priority: valuesToSubmit.enabled ? 1 : 2,
          destination: {
            currentValue:
              Array.isArray(valuesToSubmit.destination2) === true
                ? valuesToSubmit.destination2[0]
                : valuesToSubmit.destination2,
          },
        },
        {
          findMeScheduleItemId:
            actualUserMyFindme.findeMeItems[2].findMeScheduleItemId,
          priority: valuesToSubmit.enabled ? 1 : 3,
          destination: {
            currentValue:
              Array.isArray(valuesToSubmit.destination3) === true
                ? valuesToSubmit.destination3[0]
                : valuesToSubmit.destination3,
          },
        },
      ],
    };
    console.log(finalSubmit, "true final form");

    const responsePut = await api
      .PUT("/Services/find-me", finalSubmit)
      .then(() => console.log(responsePut));

    message.success("My Find Me Updated Succesfully!");
  }

  render() {
    const {} = this.props;

    return (
      <BaseLayout>
        <MyFindMe formToDisplay={this.endUserForm} />
      </BaseLayout>
    );
  }
}
