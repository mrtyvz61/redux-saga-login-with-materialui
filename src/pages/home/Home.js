import React from "react";
import { connect } from "react-redux";
import { loginOut } from "../../reducer/LoginOptions";

import { Grid, Button } from "@material-ui/core";

import useStyles from "./styles";

function Home({ loginOut }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
        You're logged in...
        <Button variant="contained" color="primary" onClick={loginOut}>
          LOGOUT
        </Button>
      </div>
    </Grid>
  );
}

export default connect(null, { loginOut })(Home);
