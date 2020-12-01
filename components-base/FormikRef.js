import { Formik } from 'formik';
import React, { forwardRef, useImperativeHandle } from 'react';

function FormikWithRef(props, ref) {
  let _formikProps;

  useImperativeHandle(ref, () => _formikProps);

  return (
    <Formik {...props}>
      {(formikProps) => {
        _formikProps = formikProps;
        if (typeof props.children === 'function') {
          return props.children(formikProps);
        }
        return props.children;
      }}
    </Formik>
  );
}

export default forwardRef(FormikWithRef);
