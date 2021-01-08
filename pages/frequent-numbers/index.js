import { message } from 'antd';
import { Component, useEffect, useState } from 'react';

import API from '../../API/API';
import FrequentNumber from '../../components/tier3-screens/FrequentNumber';
import { BaseLayout } from '../../layouts/BaseLayout';
import { IsAValidPhoneNumber } from '../../scripts/General';

function FrequentNumberPage(props) {
  const { user, frequentNumbersResponse } = props;
  const [
    currentFrequentNumbersTableData,
    setCurrentFrequentNumbersTableData,
  ] = useState(frequentNumbersResponse);
  const [dataToEdit, setDataToEdit] = useState(undefined);

  const frequentNumberForm = {
    generalOptions: {
      type: 'vertical', //horizontal, vertical, inline
      formClassName: 'test-form',
      submit: {
        className: 'primary-button-style',
        text: (dataToEdit ? 'Edit' : 'Create') + ' Frequent number',
      },
      reset: {
        className: 'primary-button-style',
        text: 'Clear',
      },
    },
    formInitialValues: {
      alias: '',
      number: '',
    },
    formValidations: (values) => {
      const errors = {};
      if (!values.alias) {
        errors.alias = 'Alias required';
      }
      if (!values.number) {
        errors.number = 'Number required';
      }
      if (!IsAValidPhoneNumber(values.number)) {
        errors.number = 'Input a valid number';
      }
      return errors;
    },
    formSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      setSubmitting(true);
      const bodyFrequentNumbers = {
        alias: values.alias,
        number: values.number,
        authUserId: props.user.userId,
      };
      const api = new API(props.user.token);
      let resFrequentNumber = {};
      if (dataToEdit !== undefined) {
        resFrequentNumber = await api.PUT(
          '/UserFrequentContacts/' + dataToEdit.id,
          { id: dataToEdit.id, ...bodyFrequentNumbers }
        );
      } else {
        resFrequentNumber = await api.POST(
          '/UserFrequentContacts',
          bodyFrequentNumbers
        );
      }
      if (
        resFrequentNumber.statusCode === 201 ||
        resFrequentNumber.statusCode === 200
      ) {
        message.success(
          'Frequent Number ' +
            (dataToEdit ? 'Edited' : 'Created') +
            ' Succesfully!'
        );
        getFrequentNumberContent();
        if (dataToEdit === undefined) {
          resetForm();
        } else {
          setDataToEdit(undefined);
        }
      } else {
        message.error(
          'Failed to ' + (dataToEdit ? 'Edit' : 'Create') + ' Frequent Number'
        );
      }

      setTimeout(() => {
        setSubmitting(false);
      }, 400);
    },
    formInputsRows: [
      {
        inputs: [
          {
            name: 'alias',
            label: 'Frequent Number Alias',
            placeholder: 'Frequent number alias...',
            type: 'text',
            required: true,
          },
          {
            name: 'number',
            label: 'Number',
            placeholder: 'Frequent number...',
            type: 'text',
            required: true,
          },
        ],
      },
    ],
  };

  const getFrequentNumberContent = async () => {
    const api = new API(user.token);
    const resFrequentNumbers = await api.GET(
      '/UserFrequentContacts/user/' + user.userId
    );

    setCurrentFrequentNumbersTableData(resFrequentNumbers.response);
  };

  return (
    <BaseLayout>
      <FrequentNumber
        userInfo={user}
        setDataToEdit={setDataToEdit}
        dataToEdit={dataToEdit}
        frequentNumberForm={frequentNumberForm}
        frequentNumbersTableData={currentFrequentNumbersTableData}
        getFrequentNumberContent={() => getFrequentNumberContent()}
      />
    </BaseLayout>
  );
}

FrequentNumberPage.getInitialProps = async ({ res, query, user }) => {
  if (res) {
    if (user.group) {
      switch (user.group) {
        case 'BusinessSupport':
        case 'SuperAdmin':
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

        case 'CorporateService':
        case 'OrganizationAdmin':
          res.writeHead(302, {
            Location: '/admin-dashboard',
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

  const api = new API(user.token);
  const resFrequentNumbers = await api.GET(
    '/UserFrequentContacts/user/' + user.userId
  );
  const frequentNumbersResponse = resFrequentNumbers.response;

  return {
    user,
    frequentNumbersResponse,
  };
};

export default FrequentNumberPage;
