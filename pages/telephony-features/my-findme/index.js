import { Component } from "react";
import MyFindMe from "../../../components/tier2-screens/MyFindMe";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { systemLog } from "../../../scripts/General";

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    return {
      user,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = "";
    this.endUserForm = {
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
        dayrange1: false,
        dayrange2: false,
        dayrange3: false,
        dayrange4: false,
        dayrange5: false,
        dayrange6: false,
        dayrange7: false,
        enabled: false,
      },
      formValidations: (values) => {
        const errors = {};
        if (!values.firstName) {
          errors.findeMeDescription = "Description required";
        }
        if (!values.lastName) {
          errors.findeMeScheduleDescription = "Schedule description required";
        }
        // if (!values.startTime) {
        //   errors.startTime = "Dates required";
        // }
        // if (!values.dayrange) {
        //   errors.password = "Password required";
        // } else if (
        //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i.test(
        //     values.password
        //   )
        // ) {
        //   errors.password =
        //     "At least 8 characters, one uppercase and one number";
        // }
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
        // { separatorTitle: "Test1" },
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
              name: "startTime",
              label: "Start Date",
              placeholder: "Put your password",
              type: "datePicker",
              required: true,
            },
            {
              name: "endTime",
              label: "End Date",
              placeholder: "Put your password",
              type: "datePicker",
              required: true,
            },
          ],
        },
        { separatorTitle: "Day Range", inputs: [] },
        {
          inputs: [
            {
              name: "dayrange1",
              label: "",
              text: "Monday",
              placeholder: "",
              type: "checkBox",
              defaultChecked: false,
            },
            {
              name: "dayrange2",
              label: "",
              text: "Tuesday",
              placeholder: "",
              type: "checkBox",
              defaultChecked: false,
            },
            {
              name: "dayrange3",
              label: "",
              text: "wednesday",
              placeholder: "",
              type: "checkBox",
              defaultChecked: false,
            },
            {
              name: "dayrange4",
              label: "",
              text: "Thursday",
              placeholder: "",
              type: "checkBox",
              defaultChecked: false,
            },
            {
              name: "dayrange5",
              label: "",
              text: "Friday",
              placeholder: "",
              type: "checkBox",
              defaultChecked: false,
            },
            {
              name: "dayrange6",
              label: "",
              text: "Saturday",
              placeholder: "",
              type: "checkBox",
              defaultChecked: false,
            },
            {
              name: "dayrange7",
              label: "",
              text: "Sunday",
              placeholder: "",
              type: "checkBox",
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
      ],
    };
  }
  componentDidMount() {
    systemLog.log(this.props);
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
