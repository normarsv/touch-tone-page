import { message } from "antd";
import { Component, useState } from "react";
import API from "../../API/API";
import FrequentNumber from "../../components/tier3-screens/FrequentNumber";
import { BaseLayout } from "../../layouts/BaseLayout";
import { systemLog, IsAValidPhoneNumber } from "../../scripts/General";

function FrequentNumberPage(props) {
  const { user, frequentNumbersResponse } = props;
  const [
    currentFrequentNumbersTableData,
    setCurrentFrequentNumbersTableData,
  ] = useState(frequentNumbersResponse);

  const getFrequentNumberContent = async () => {
    const api = new API(user.token);
    const resFrequentNumbers = await api.GET(
      "/UserFrequentContacts/user/" + user.userId
    );

    setCurrentFrequentNumbersTableData(resFrequentNumbers.response);
  };

  const frequentNumberForm = {
    generalOptions: {
      type: "vertical", //horizontal, vertical, inline
      formClassName: "test-form",
      submit: {
        className: "primary-button-style",
        text: "Create Frequent number",
      },
      reset: {
        className: "primary-button-style",
        text: "Clear",
      },
    },
    formInitialValues: {
      alias: "",
      number: "",
    },
    formValidations: (values) => {
      const errors = {};
      if (!values.alias) {
        errors.alias = "Alias required";
      }
      if (!values.number) {
        errors.number = "Number required";
      }
      if (!IsAValidPhoneNumber(values.number)) {
        errors.number = "Input a valid number";
      }
      return errors;
    },
    formSubmit: async (values, { setSubmitting, setFieldError }) => {
      console.log(values);
      setSubmitting(true);

      const bodyFrequentNumbers = {
        alias: values.alias,
        number: values.number,
        authUserId: props.user.userId,
      };

      const api = new API(props.user.token);
      const resAddFrequentNumber = await api.POST(
        "/UserFrequentContacts",
        bodyFrequentNumbers
      );
      console.log(resAddFrequentNumber);

      if (resAddFrequentNumber.statusCode === 201) {
        message.success("Frequent Number Added Succesfully!");
        getFrequentNumberContent();
      } else {
        message.error("Failed to add frequent number");
      }

      setTimeout(() => {
        // console.log("form submitted values", values);
        // alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
      // setSubmitting(false);
    },
    formInputsRows: [
      {
        inputs: [
          {
            name: "alias",
            label: "Frequent Number Alias",
            placeholder: "Frequent number alias...",
            type: "text",
            required: true,
          },
          {
            name: "number",
            label: "Number",
            placeholder: "Frequent number...",
            type: "text",
            required: true,
          },
        ],
      },
    ],
  };

  return (
    <BaseLayout>
      <FrequentNumber
        userInfo={user}
        frequentNumberForm={frequentNumberForm}
        frequentNumbersTableData={currentFrequentNumbersTableData}
        getFrequentNumberContent={getFrequentNumberContent}
      />
    </BaseLayout>
  );
}

FrequentNumberPage.getInitialProps = async ({ res, query, user }) => {
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

        case "OrganizationAdmin":
          res.writeHead(302, {
            Location: "/admin-dashboard",
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

  const api = new API(user.token);
  const resFrequentNumbers = await api.GET(
    "/UserFrequentContacts/user/" + user.userId
  );
  const frequentNumbersResponse = resFrequentNumbers.response;

  return {
    user,
    frequentNumbersResponse,
  };
};

export default FrequentNumberPage;
