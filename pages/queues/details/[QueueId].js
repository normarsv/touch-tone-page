import Router from 'next/router';

import QueuesDetails from '../../../components/tier2-screens/queues/QueuesDetails';
import { BaseLayout } from '../../../layouts/BaseLayout';

function QueueDetails(props) {
  const { queuesDetailsForm } = props;

  return (
    <BaseLayout>
      <QueuesDetails queuesDetailsForm={queuesDetailsForm} />
    </BaseLayout>
  );
}

QueueDetails.getInitialProps = async ({ res, query, user }) => {
  if (user.group) {
    switch (user.group) {
      case 'BusinessSupport':
      case 'SuperAdmin':
        if (res) {
          res.writeHead(302, {
            Location: '/list-organizations',
          });
          res.end();
          return {};
        } else {
          Router.push('/list-organizations');
          return {};
        }
      case 'Distributor':
        if (res) {
          res.writeHead(302, {
            Location: '/list-organizations',
          });
          res.end();
          return {};
        } else {
          Router.push('/list-organizations');
          return {};
        }
      case 'CorporateService':
      case 'OrganizationAdmin':
        if (res) {
          res.writeHead(302, {
            Location: '/admin-dashboard',
          });
          res.end();
          return {};
        } else {
          Router.push('/admin-dashboard');
          return {};
        }
        break;
      default:
        break;
    }
  } else {
    if (res) {
      res.writeHead(302, {
        Location: '/not-valid-token',
      });
      res.end();
      return {};
    } else {
      Router.push('/not-valid-token');
      return {};
    }
  }

  const queuesDetailsForm = {
    generalOptions: {
      type: 'vertical', //horizontal, vertical, inline
      formClassName: 'test-form',
      submit: {
        className: 'primary-button-style',
        text: 'Save Changes',
      },
      reset: {
        className: 'primary-button-style',
        text: 'Clear',
      },
      cancel: {
        className: 'primary-button-style cancel',
        text: 'Cancel Changes',
        action: () => {
          // useRouter().back();
          console.log('cancel clicked');
        },
      },
    },
    formInitialValues: {
      name: '',
      enable: false,
      descriptions: '',
      maxCallers: '',
      queuePrompt: '',
      connectingPrompt: '',
      onHoldPrompt: '',
      onHoldContinuePrompt: '',
      origin: '',
      announceHoldTime: false,
      announceCallerPosition: false,
      promptHold: false,
      provideCallbackOption: false,
    },
    formValidations: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Name required';
      }
      if (!values.descriptions) {
        errors.descriptions = 'Descriptions required';
      }
      if (!values.maxCallers) {
        errors.maxCallers = 'Max callers required';
      }
      if (!values.queuePrompt) {
        errors.queuePrompt = 'Queue prompt required';
      }
      if (!values.connectingPrompt) {
        errors.connectingPrompt = 'Connecting prompt required';
      }
      if (!values.onHoldPrompt) {
        errors.onHoldPrompt = 'On hold prompt required';
      }
      if (!values.onHoldContinuePrompt) {
        errors.onHoldContinuePrompt = 'On hold continue prompt required';
      }

      return errors;
    },
    formSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        console.log(values);
      } catch (error) {
        console.log(error);
      }
      resetForm();
      setSubmitting(false);
      message.success('Detailes Saved Successfully!');
    },
    formInputsRows: [
      {
        inputs: [
          {
            name: 'name',
            label: 'Name',
            placeholder: 'Type the queue name',
            type: 'text',
            required: true,
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
          },
          {
            name: 'enable',
            label: 'Enable',
            type: 'switch',
            required: true,
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
          },
          {
            name: 'descriptions',
            label: 'Descriptions',
            placeholder: 'Type the queue description',
            type: 'text',
            required: true,
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
          },
          {
            name: 'maxCallers',
            label: 'Max Callers',
            placeholder: 'Type the max callers',
            type: 'text',
            required: true,
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
          },
        ],
      },
      {
        inputs: [
          {
            name: 'queuePrompt',
            label: 'Queue Prompt',
            placeholder: 'Upload the queue prompt',
            type: 'upload',
            required: true,
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
          },
          {
            name: 'connectingPrompt',
            label: 'Connecting Prompt',
            placeholder: 'Upload the connecting prompt',
            type: 'upload',
            required: true,
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
          },
        ],
      },
      {
        inputs: [
          {
            name: 'onHoldPrompt',
            label: 'On Hold Prompt',
            placeholder: 'Upload the on hold prompt',
            type: 'upload',
            required: true,
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
          },
          {
            name: 'onHoldContinuePrompt',
            label: 'On Hold Prompt',
            placeholder: 'Upload the on hold prompt',
            type: 'upload',
            required: true,
            breakpoints: { xxl: 8, xl: 8, md: 8, sm: 8, xs: 24 },
          },
        ],
      },
      {
        inputs: [
          {
            name: 'origin',
            label: 'Origin',
            placeholder: 'Type the origin',
            type: 'text',
            required: true,
            breakpoints: { xxl: 4, xl: 4, md: 4, sm: 4, xs: 24 },
          },
          {
            name: 'announceHoldTime',
            label: 'Announce Hold Time',
            type: 'switch',
            required: true,
            breakpoints: { xxl: 4, xl: 4, md: 4, sm: 4, xs: 24 },
          },
          {
            name: 'announceCallerPosition',
            label: 'Announce Caller Position',
            type: 'switch',
            required: true,
            breakpoints: { xxl: 4, xl: 4, md: 4, sm: 4, xs: 24 },
          },
          {
            name: 'promptHold',
            label: 'Prompt Hold',
            type: 'switch',
            required: true,
            breakpoints: { xxl: 4, xl: 4, md: 4, sm: 4, xs: 24 },
          },
          {
            name: 'provideCallbackOption',
            label: 'Provide Callback Option',
            type: 'switch',
            required: true,
            breakpoints: { xxl: 4, xl: 4, md: 4, sm: 4, xs: 24 },
          },
        ],
      },
    ],
  };

  return {
    queuesDetailsForm,
  };
};

export default QueueDetails;
