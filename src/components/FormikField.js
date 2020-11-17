import React from "react";
import { ErrorMessage, Field } from "formik";
import TextField from "@material-ui/core/TextField";

import "./styles.css";

const FormikField = ({
  name,
  label,
  type = "text",
  required = false,
  error,
  disabled = false,
}) => {
  return (
    <div className="FormikField">
      <Field
        required={required}
        autoComplete="off"
        as={TextField}
        label={label}
        name={name}
        fullWidth
        disabled={disabled}
        type={type}
        helperText={error ? error : <ErrorMessage name={name} />}
        error={Boolean(error)}
      />
    </div>
  );
};

export default FormikField;
