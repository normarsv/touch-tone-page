import { Component } from 'react';

import SpeedDials from '../../../components/telephony-features/SpeedDials';
import { BaseLayout } from '../../../layouts/BaseLayout';
import { systemLog } from '../../../scripts/General';

export default class extends Component {
  static async getInitialProps({ res, query, user }) {
    if (res) {
      switch (user.group) {
        case 'SuperAdmin':
          res.writeHead(302, {
            Location: '/list-organizations',
          });
          res.end();

          break;

        case 'OrganizationAdmin':
          res.writeHead(302, {
            Location: '/admin-dashboard',
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
    this.userinfo = '';

    this.speedDialsForm = {
      generalOptions: {
        type: 'vertical', //horizontal, vertical, inline
        formClassName: 'test-form',
        submit: {
          className: 'primary-button-style',
          text: 'Create User',
        },
        reset: {
          className: 'primary-button-style',
          text: 'Clear',
        },
        cancel: {
          className: 'primary-button-style cancel',
          text: 'Cancel User',
          action: () => {
            // useRouter().back();
            console.log('cancel clicked');
          },
        },
      },
      formInitialValues: {
        findeMeDescription: '',
        findeMeScheduleDescription: '',
        startTime: '',
        endTime: '',
        dayrange: [],
        enabled: false,
      },
      formValidations: (values) => {
        console.log(values);
        const errors = {};
        if (!values.findeMeDescription) {
          errors.findeMeDescription = 'Description required';
        }
        if (!values.findeMeScheduleDescription) {
          errors.findeMeScheduleDescription = 'Schedule description required';
        }
        if (!values.startTime) {
          errors.startTime = 'Start date required';
        }
        if (!values.endTime) {
          errors.endTime = 'End date required';
        }
        return errors;
      },
      formSubmit: (values, { setSubmitting, setFieldError }) => {
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          console.log('form submitted values', values);
          setSubmitting(false);
        }, 400);
      },
      formInputsRows: [
        {
          inputs: [
            {
              name: 'destinations',
              label: 'Destination',
              placeholder: 'Select Destination',
              type: 'list',
              addMax: 5,
              required: true,
              listFields: [
                {
                  name: 'findMeScheduleItemId',
                  label: 'Destination',
                  placeholder: 'Select Destination',
                  type: 'select',
                  required: true,
                  options: [
                    { destinationNumber: '1', destinationId: 0 },
                    { destinationNumber: '2', destinationId: 1 },
                    { destinationNumber: '3', destinationId: 2 },
                    { destinationNumber: '4', destinationId: 3 },
                    { destinationNumber: '5', destinationId: 4 },
                  ],
                  optionValue: 'destinationId',
                  optionLabel: 'destinationNumber',
                },
                {
                  name: 'destinationType',
                  label: 'Type of Destination',
                  placeholder: 'Select Type',
                  type: 'select',
                  required: true,
                  options: [
                    { destinationType: 'Ring Group', destinationId: 0 },
                    { destinationType: 'User', destinationId: 1 },
                    { destinationType: 'Queue', destinationId: 2 },
                    { destinationType: 'External Number', destinationId: 3 },
                  ],
                  optionValue: 'destinationId',
                  optionLabel: 'destinationType',
                },
                {
                  name: 'queueName',
                  label: 'Queue Name',
                  placeholder: 'Select Type',
                  type: 'select',
                  required: true,
                  options: [
                    { queueName: 'Ring Group', queueId: 0 },
                    { queueName: 'User', queueId: 1 },
                    { queueName: 'Queue', queueId: 2 },
                    { queueName: 'External Number', queueId: 3 },
                  ],
                  optionValue: 'queueId',
                  optionLabel: 'queueName',
                },
              ],
              customActions: [
                {
                  label: 'Details',
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
    const {} = this.props;

    return (
      <BaseLayout>
        <SpeedDials speedDialsForm={this.speedDialsForm} />
      </BaseLayout>
    );
  }
}
