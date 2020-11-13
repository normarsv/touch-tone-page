import moment from "moment/min/moment-with-locales.js";
import { Component } from "react";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { systemLog } from "../../../scripts/General";
import { baseLanguage } from "../../../scripts/MainInfoData";
import CallRecordingsOA from "../../../components/tier2-screens/CallRecordingsOA";
import { faCalendarAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import CallForward from "../../../components/telephony-features/CallForward";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
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
    }

    return {
      user,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = "";
    this.callForwardingForm = {
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
        if (!values.findeMeDescription) {
          errors.findeMeDescription = "Description required";
        }
        if (!values.findeMeScheduleDescription) {
          errors.findeMeScheduleDescription = "Schedule description required";
        }
        if (!values.startTime) {
          errors.startTime = "Start date required";
        }
        if (!values.endTime) {
          errors.endTime = "End date required";
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
              name: "userName",
              label: "Login Name",
              placeholder: "Put your login name",
              type: "text",
              required: true,
            },
            {
              name: "password",
              label: "Password",
              placeholder: "Put your password",
              type: "text",
              required: true,
            },
            {
              name: "number",
              label: "DID",
              placeholder: "Select DID",
              type: "select",
              required: true,
              options: [],
              optionValue: "number",
              optionLabel: "number",
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
        <CallForward callForwardFormContent={this.callForwardFormContent} />
      </BaseLayout>
    );
  }
}
