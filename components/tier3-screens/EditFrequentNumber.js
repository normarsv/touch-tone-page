import { Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import FormGenerator from '../../components-base/FormGenerator';

const EditFrequentNumber = ({
  dataToEdit,
  visibleEditNumber,
  setVisibleEditNumber,
  frequentNumberForm,
}) => {
  const router = useRouter();
  const [formGeneratorRef, setFormGeneratorRef] = useState(null);
  useEffect(() => {
    if (visibleEditNumber === true) {
      if (formGeneratorRef !== null) {
        formGeneratorRef.setFieldValue('alias', dataToEdit.alias);
        formGeneratorRef.setFieldValue('number', dataToEdit.number);
      }
    }
  }, [visibleEditNumber, formGeneratorRef]);

  return (
    <Modal
      visible={visibleEditNumber}
      centered
      onCancel={() => setVisibleEditNumber('')}
      footer={null}
    >
      <Space direction='vertical' className='organization-detail-modal'>
        <h2 className='title-style'>
          {dataToEdit !== undefined ? 'Edit ' + dataToEdit.alias : ''}
        </h2>
        <FormGenerator
          ref={(ref) => {
            if (ref !== null && formGeneratorRef === null) {
              setFormGeneratorRef(ref.formikRef);
            }
          }}
          FormOptions={frequentNumberForm}
        />
      </Space>
    </Modal>
  );
};

EditFrequentNumber.propTypes = {
  organizationDetailsInfo: PropTypes.object,
  visibleEditNumber: PropTypes.bool,
  setVisibleEditNumber: PropTypes.func,
};

export default EditFrequentNumber;
