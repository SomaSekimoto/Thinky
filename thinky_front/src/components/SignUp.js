// Import Packages
import React from "react"

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
import axios from "axios"

// Import Components
import Copyright from "./Copyright"

// constructor(props) {
// 	super(props);
// 	this.state = {
// 		whies: [],
// 	};
// }

// componentDidMount() {
// 	axios
// 		.post("http://localhost:3001/v1/users/create")
// 		.then((results) => {
// 			console.log(results);
// 			this.setState({ whies: results.data });
// 		})
// 		.catch((data) => {
// 			console.log(data);
// 		});
// }

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

export default class SignUp extends React.Component {
  // const classes = useStyles()

  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
  }

  handleSignUp = (e) => {
    e.preventDefault()
    // stateからemailとpasswordを取得する
    console.log(this.state)
    const { email, password } = this.state

    axios
      .post("http://localhost:3001/v1/users", { email, password })
      .then((results) => {
        console.log(results)
        // this.setState({ users: results.data })
      })
      .catch((data) => {
        console.log(data)
      })

    // // 4. firebaseにemailとpasswordをPOST
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     console.log(user)
    //     this.setState({ email: null, password: null })
    //   })
    //   .catch((error) => {
    //     console.log("firebase error", error)
    //   })
  }

  // componentDidMount() {
  //   axios
  //     .post("http://localhost:3001/v1/users", {})
  //     .then((results) => {
  //       console.log(results)
  //       // this.setState({ users: results.data })
  //     })
  //     .catch((data) => {
  //       console.log(data)
  //     })
  // }

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
          <form noValidate>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
								<TextField
									autoComplete="name"
									name="Name"
									variant="outlined"
									required
									fullWidth
									id="Name"
									label="Name"
									autoFocus
								/>
							</Grid> */}
              {/* <Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
								/>
							</Grid> */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                    onClick={(e) => this.handleSignUp(e)}
                  >
                    Sign up
                  </Button>
                </Grid>
              </Grid>

              {/* <Grid
								container
								// direction="column"
								justify="center"
								// alignItems="center"
								xs={12}
							>
								<Grid xs={6}>
									<Button
										href="#"
										fullWidth
										variant="contained"
										color="primary"
										className={classes.submit}
									>
										Cansel
									</Button>
								</Grid>
							</Grid> */}
            </Grid>
            <Grid container>
              {/* <Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid> */}
              <Grid item style={{ margin: "0 auto" }}>
                <Link href="#" variant="body2">
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

// export const CREATE = "CREATE"

// export const create = (value) => async (dispatch) => {
//   axios.defaults.withCredentials = true
//   axios.defaults.headers.common["Content-Type"] = "application/json"
//   const response = await axios.post("http://localhost:3001/v1/users", {params: {:email,}})
//   dispatch({ type: CREATE, response })
// }
