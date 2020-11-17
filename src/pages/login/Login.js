import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";

import useStyles from "./styles";
import FormikField from "../../components/FormikField";

import { loginRequest, registerRequest } from "../../reducer/LoginOptions";

const initialValues = {
  email: "",
  password: "",
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().lowercase().email("not acceptable").required("Required!"),
  password: Yup.string().min(4, "At least 4 character!").required("Required!"),
});

function Login(props) {
  const classes = useStyles();

  const [activeTabId, setActiveTabId] = useState(0);
  const [field, setField] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  const submit = (values = initialValues) => {
    props.loginRequest(values);
  };

  // // Forgot Password Request
  // const forgotPasswordRequestHandler = () => {
  //   props.forgotPasswordRequest(forgotPasswordValue);
  // };

  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="Register" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography variant="h6" className={classes.greeting}>
                Credentials for Login
              </Typography>
              <Typography variant="h6" className={classes.subGreeting}>
                "email": "eve.holt@reqres.in", "password": "cityslicka"
              </Typography>
              <Fade in={props.error ? true : false}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Hata: {props.error}
                </Typography>
              </Fade>
              <Formik
                initialValues={initialValues}
                onSubmit={submit}
                validationSchema={LoginSchema}
              >
                {({ dirty, isValid }) => {
                  return (
                    <Form>
                      <FormikField name="email" label="Email" required />
                      <FormikField
                        name="password"
                        label="Password"
                        type="password"
                        required
                      />
                      <div className={classes.formButtons}>
                        {props.loading ? (
                          <CircularProgress
                            size={40}
                            thickness={3.6}
                            className={classes.loginLoader}
                          />
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={!dirty || !isValid}
                            type="submit"
                            fullWidth
                          >
                            LOGIN
                          </Button>
                        )}
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography variant="h6" className={classes.greeting}>
                Credentials for Register
              </Typography>
              <Typography variant="h6" className={classes.subGreeting}>
                "email": "eve.holt@reqres.in", "password": "pistol"
              </Typography>
              <Fade in={props.isError ? true : false}>
                <Typography color="secondary" className={classes.errorMessage}>
                  {props.isError}
                </Typography>
              </Fade>
              <TextField
                id="email"
                name="email"
                required
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={field.email}
                onChange={onChangeHandler}
                margin="normal"
                placeholder="Email"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                required
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={field.password}
                onChange={onChangeHandler}
                margin="normal"
                placeholder="Password"
                type="text"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {props.isLoading ? (
                  <CircularProgress size={40} thickness={3.6} />
                ) : (
                  <Button
                    onClick={() => console.log("clicked", field)}
                    disabled={field.email === "" && field.password === ""}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    REGISTER
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2020-2021
        </Typography>
      </div>
    </Grid>
  );
}

const mapStateToprops = (state) => ({
  error: state.LoginOptions.error,
  loading: state.LoginOptions.isLoading,
  isLoading: state.LoginOptions.isLoading,
  isError: state.LoginOptions.error,
});

export default connect(mapStateToprops, {
  loginRequest,
  registerRequest,
})(Login);
