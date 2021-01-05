import { Component } from 'react';

import API from '../../../API/API';
import MyFindMe from '../../../components/tier2-screens/MyFindMe';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      if (user.group) {
        switch (user.group) {
          case 'SuperAdmin':
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            res.end();

            break;

          case 'BusinessSuport':
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            res.end();

            break;

          case 'Distributor':
            res.writeHead(302, {
              Location: '/list-organizations',
            });
            res.end();

            break;
          case 'EndUser':
            res.writeHead(302, {
              Location: '/user-dashboard',
            });
            res.end();

            break;

          default:
            break;
        }
      } else {
        res.writeHead(302, {
          Location: '/',
        });
        res.end();
      }
    }

    const actualUser = user;

    const api = new API(actualUser.token);

    const resUserMyFindme = await api.GET('/Services/find-me');

    const actualUserMyFindme = resUserMyFindme.response;

    return {
      user,
      actualUserMyFindme,
      actualUser,
    };
  }
  constructor(props) {
    super(props);
    this.userinfo = '';
    this.endUserForm = {
      generalOptions: {
        type: 'vertical', //horizontal, vertical, inline
        formClassName: 'test-form',
        submit: {
          className: 'primary-button-style',
          text: 'Save My Find me',
        },
        reset: {
          className: 'primary-button-style',
          text: 'Clear',
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
      formInitialValues: {},
      formValidations: (values) => {
        const errors = {};
        // console.log(values);
        if (!values.findeMeDescription) {
          errors.findeMeDescription = 'Description required';
        }
        if (!values.findeMeScheduleDescription) {
          errors.findeMeScheduleDescription = 'Schedule description required';
        }
        if (!values.startDate) {
          errors.startDate = 'Start date required';
        }
        if (!values.endDate) {
          errors.endDate = 'End date required';
        }
        if (values.endDate < values.startDate) {
          errors.endDate = 'Set a valid end date';
        }

        return errors;
      },
      formSubmit: (values, { setSubmitting, setFieldError }) => {
        this.finalSubmit(values);

        setTimeout(() => {
          // console.log("form submitted values", values);
          // alert(JSON.stringify(values, null, 2));
          // setSubmitting(false);
        }, 400);
      },
      formInputsRows: [
        {
          inputs: [
            {
              name: 'findeMeDescription',
              label: 'Find Me Description',
              placeholder: 'Find Me Description...',
              type: 'text',
              required: true,
            },
          ],
        },
        { separatorTitle: 'Schedule', inputs: [] },
        {
          inputs: [
            {
              name: 'findeMeScheduleDescription',
              label: 'Schedule Description',
              placeholder: 'Schedule Description...',
              type: 'text',
              required: true,
            },
            {
              name: 'startDate',
              label: 'Start Date',
              type: 'datePicker',
              required: true,
            },
            {
              name: 'endDate',
              label: 'End Date',
              type: 'datePicker',
              required: true,
            },
          ],
        },
        { separatorTitle: 'Day Range', inputs: [] },
        {
          inputs: [
            {
              name: 'dayrange',
              label: '',
              placeholder: '',
              type: 'checkBoxGroup',
              options: [
                { label: 'Monday', value: 'monday' },
                { label: 'Tuesday', value: 'tuesday' },
                { label: 'Wednesday', value: 'wednesday' },
                { label: 'Thursday', value: 'thursday' },
                { label: 'Friday', value: 'friday' },
                { label: 'Saturday', value: 'saturday' },
                { label: 'Sunday', value: 'sunday' },
              ],
              defaultChecked: false,
            },
          ],
        },
        { separatorTitle: 'Ringing Group', inputs: [] },
        {
          inputs: [
            {
              name: 'enabled',
              label: 'Ring at the same time',
              placeholder: '',
              type: 'switch',
              checkedChildren: 'Yes',
              unCheckedChildren: 'No',
              defaultChecked: false,
            },
          ],
        },
        {
          inputs: [
            {
              name: 'destination1',
              label: 'Destination 1',
              placeholder: 'Select Destination',
              type: 'select',
              required: true,
              options: [],
              optionValue: 'number',
              optionLabel: 'number',
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
            },
          ],
        },
        {
          inputs: [
            {
              name: 'destination2',
              label: 'Destination 2',
              placeholder: 'Select Destination',
              type: 'select',
              required: true,
              options: [],
              optionValue: 'number',
              optionLabel: 'number',
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
            },
          ],
        },
        {
          inputs: [
            {
              name: 'destination3',
              label: 'Destination 3',
              placeholder: 'Select Destination',
              type: 'select',
              required: true,
              options: [],
              optionValue: 'number',
              optionLabel: 'number',
              breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
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
