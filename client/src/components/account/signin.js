import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SensorOccupiedSharpIcon from "@mui/icons-material/SensorOccupiedSharp";
import {
  Box,
  Typography,
  TextField,
  Container,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  CssBaseline,
  Button,
  Avatar,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        BlogKaro
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const loginInitialValues = {
  email: "",
  password: "",
};

export default function SignIn() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // const data = new FormData(event.currentTarget);
  //   // console.log(signUpDetails);
  // };
  const toggleAccount = () => {
    account === "signin" ? setAccount("signup") : setAccount("signin");
    setSignUpDetails(initialValues);
  };

  const [account, setAccount] = React.useState("signin");
  const [signUpDetails, setSignUpDetails] = React.useState(initialValues);
  const [loginDetails, setLoginDetails] = React.useState(loginInitialValues);

  const onInputChange = (e) => {
    setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const baseUrl = "http://localhost:8000";
  const signUpUser = async () => {
    // {
    // *****************************************************this block isn't working , I don't know why********************************
    // console.log(API);
    // const res = await API.userSignUp(signUpDetails);
    // console.log("result", res);
    // }
    axios
      .post(baseUrl + "/signup", signUpDetails)
      .then((res) => {
        setSignUpDetails(initialValues);
        toggleAccount();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userLogin = async () => {
    axios
      .post(baseUrl + "/login", loginDetails)
      .then((res) => {
        setLoginDetails(loginDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {account === "signin" ? (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 0.5, bgcolor: "black", opacity: 0.7 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => onValueChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => onValueChange(e)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => userLogin()}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => toggleAccount()}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 0.5, bgcolor: "black", opacity: 0.7 }}>
              <SensorOccupiedSharpIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => onInputChange(e)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => signUpUser()}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => toggleAccount()}
                  >
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        )}
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
