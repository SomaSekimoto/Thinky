// Import Components
import Home from "./Home.js"
import Layout from "./Layout"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import UserMypage from "./UserMypage"
import EveryoneWhy from "./EveryoneWhy"
import PrivateChat from "./PrivateChat"
import UserEdit from "./UserEdit"

// Import Pacakages
import axios from "axios"
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

function App(props) {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN")

  const [user, setUser] = useState({})

  const checkLoginStatus = (user) => {
    console.log("checkLoginStatus", user)
    const aaa = user
    console.log("user state", aaa.id)

    axios
      .get("http://localhost:3001/v1/logged_in", {
        params: { user_id: aaa.id },
      })
      .then((response) => {
        if (response.data && loggedInStatus === "LOGIN_SUCCESS1") {
          console.log("login status", response)
          setLoggedInStatus("LOGIN_SUCCESS2")
          setUser(response.data)
        } else if (!response.data & (loggedInStatus === "LOGIN_SUCCESS1")) {
          console.log("else if login status", response)
          setLoggedInStatus("NOT_LOGGED_IN2")
          setUser({})
        } else {
          console.log("wakaran")
        }
      })
      .catch((error) => {
        console.log("login status error", error)
      })
  }

  const handleLogin = (user) => {
    setLoggedInStatus("LOGIN_SUCCESS1")
    console.log(loggedInStatus)
    setUser(user)
    console.log("after setUser", user)
    // const storage = localStorage.setItem("access_token", user.access_token)
    // console.log(storage)
  }

  useEffect(() => {
    console.log("useEffect", user)
    checkLoginStatus(user)
  })

  console.log("after signin", user)
  console.log(loggedInStatus)

  return (
    <Router>
      <Layout>
        <Switch>
          <Route
            exact={true}
            path="/home"
            render={(props) => (
              <Home
                {...props}
                // checkLoginStatus={checkLoginStatus}
                handleLogin={handleLogin}
              />
            )}
          />
          <Route path="/whies/:id" component={PrivateChat} />
          <Route
            exact={true}
            path="/share"
            // component={EveryoneWhy}
            render={(props) => <EveryoneWhy {...props} />}
          />
          <Route exact={true} path="/mypage" component={UserMypage} />
          <Route exact={true} path="/userEdit" component={UserEdit} />
          <Route
            exact={true}
            path="/signup"
            render={(props) => <SignUp {...props} handleLogin={handleLogin} />}
          />
          <Route
            exact={true}
            path="/signin"
            render={(props) => <SignIn {...props} handleLogin={handleLogin} />}
          />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
