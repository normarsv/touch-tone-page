import { Component } from "react";
import ModifyMeeting from "../../../components/tier3-screens/ModifyMeeting";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { IsAValidEmail, systemLog } from "../../../scripts/General";

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

    return {
      user,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = "";
    this.state = { emailsToSend: "" };

    this.createMeetingForm = {
      generalOptions: {
        type: "vertical", //horizontal, vertical, inline
        formClassName: "test-form",
        submit: {
          className: "primary-button-style",
          text: "Create User",
        },
        reset: {
          className: "primary-button-style",
          text: "Clear",
        },
        cancel: {
          className: "primary-button-style cancel",
          text: "Cancel User",
          action: () => {
            // useRouter().back();
            console.log("cancel clicked");
          },
        },
      },
      formInitialValues: {
        findeMeDescription: "",
        findeMeScheduleDescription: "",
        startTime: "",
        endTime: "",
        dayrange: [],
        enabled: false,
      },
      formValidations: (values) => {
        console.log(values);
        const errors = {};
        if (!values.name) {
          errors.name = "Meeting name required";
        }
        if (!values.startTime) {
          errors.startTime = "Start date required";
        }
        if (!values.destinations || values.destinations.length === 0) {
          errors.destinations = "At least 1 destination required";
        } else if (values.destinations) {
          errors.destinations = [];
          values.destinations.map((destination, index) => {
            errors.destinations[index] = {};
            if (
              !destination.findMeScheduleItemId ||
              !destination.destinationType ||
              !destination.queueName
            ) {
              if (!destination.findMeScheduleItemId) {
                errors.destinations[index].findMeScheduleItemId =
                  "findMeScheduleItemId is required";
              }
              if (!destination.destinationType) {
                errors.destinations[index].destinationType =
                  "destinationType is required";
              }
              if (!destination.queueName) {
                errors.destinations[index].queueName = "queueName is required";
              }
            } else {
              delete errors.destinations[index];
            }
          });
          if (errors.destinations.every((o) => o.value === "0")) {
            delete errors.destinations;
          }
        }
        return errors;
      },
      formSubmit: (values, { setSubmitting, setFieldError }) => {
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          console.log("form submitted values", values);
          setSubmitting(false);
        }, 400);
      },
      formInputsRows: [
        {
          inputs: [
            {
              name: "name",
              label: "Meeting Name",
              placeholder: "Meeting name...",
              type: "text",
              required: true,
            },
            {
              name: "startTime",
              label: "Start Date",
              type: "datePicker",
              required: true,
            },
          ],
        },
        {
          inputs: [
            {
              name: "participants",
              label: "Participants",
              placeholder: "Select Participant",
              type: "list",
              required: true,
              listFields: [
                {
                  name: "findMeScheduleItemId",
                  label: "Destination",
                  placeholder: "Select Destination",
                  type: "select",
                  mode: "tags",
                  customOnChange: (value) => {
                    const reduceGetOnlyNew = value.reduce(
                      (returnData, currentEmail) => {
                        if (
                          this.state.emailsToSend.find((email) => {
                            return email === currentEmail;
                          }) === undefined
                        ) {
                          if (IsAValidEmail(currentEmail) === true) {
                            returnData = [currentEmail];
                          }
                        }
                        return returnData;
                      },
                      []
                    );
                    this.setState({ emailsToSend: reduceGetOnlyNew });
                  },
                  required: true,
                  options: [
                    { destinationNumber: "1", destinationId: 0 },
                    { destinationNumber: "2", destinationId: 1 },
                    { destinationNumber: "3", destinationId: 2 },
                    { destinationNumber: "4", destinationId: 3 },
                    { destinationNumber: "5", destinationId: 4 },
                  ],
                  optionValue: "destinationId",
                  optionLabel: "destinationNumber",
                },
                {
                  name: "destinationType",
                  label: "Type of Destination",
                  placeholder: "Select Type",
                  type: "select",
                  required: true,
                  options: [
                    { destinationType: "Ring Group", destinationId: 0 },
                    { destinationType: "User", destinationId: 1 },
                    { destinationType: "Queue", destinationId: 2 },
                    { destinationType: "External Number", destinationId: 3 },
                  ],
                  optionValue: "destinationId",
                  optionLabel: "destinationType",
                },
                {
                  name: "queueName",
                  label: "Queue Name",
                  placeholder: "Select Type",
                  type: "select",
                  required: true,
                  options: [
                    { queueName: "Ring Group", queueId: 0 },
                    { queueName: "User", queueId: 1 },
                    { queueName: "Queue", queueId: 2 },
                    { queueName: "External Number", queueId: 3 },
                  ],
                  optionValue: "queueId",
                  optionLabel: "queueName",
                },
              ],
              customActions: [
                {
                  label: "Details",
                  onClick: (listRowInputs) => {
                    alert(JSON.stringify(listRowInputs, null, 2));
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  }
  componentDidMount() {
    systemLog.log(this.props);
  }
  render() {
    return (
      <BaseLayout>
        <ModifyMeeting createMeetingForm={this.createMeetingForm} />
      </BaseLayout>
    );
  }
}
