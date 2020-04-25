// Import Packages
import React from "react"
import { Link, withRouter } from "react-router-dom"
import axios from "axios"

// Import Styles
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CssBaseline from "@material-ui/core/CssBaseline"
import TextField from "@material-ui/core/TextField"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

// Import Components
import Copyright from "./Copyright"

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }))

class SignUp extends React.Component {
  // const classes = useStyles()

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      registrationError: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    console.log("constructor now!")
  }

  componentDidMount() {
    console.log("componentDidMount now!")
  }

  componentDidUpdate() {
    console.log("componentDidUpdate now!")
  }

  shouldComponentUpdate() {
    console.log("shouldComponentUpdate now!")
    return true
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data)
    this.props.history.push("/home")
  }

  handleSubmit = (e) => {
    console.log("handleSubmitting", e)
    e.preventDefault()
    // stateからemailとpasswordを取得する
    const { email, password } = this.state

    axios
      .post(
        "http://localhost:3001/v1/users",
        {
          email: email,
          password: password,
        }
        // { withCredentials: true }
      )
      .then((response) => {
        console.log(response)
        if (response.statusText === "OK") {
          this.handleSuccessfulAuth(response.data)
        }
      })
      .catch((error) => {
        console.log("registration error", error)
      })
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.state.value}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </Grid>
              <Grid
                container
                // direction="column"
                justify="center"
                // alignItems="center"
              >
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    // onClick={(e) => this.handleSignUp(e)}
                  >
                    Sign up
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item style={{ margin: "0 auto" }}>
                <Link to="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    )
  }
}

export default withRouter(SignUp)
