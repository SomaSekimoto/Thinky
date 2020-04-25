// Import Styles

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
import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN")

  const [user, setUser] = useState({})

  const handleLogin = (user) => {
    console.log(loggedInStatus)
    setLoggedInStatus("LOGGED_IN_SUCCESS")
    console.log(loggedInStatus)
    setUser({ user })
    console.log(user)
  }

  console.log(user)
  console.log(loggedInStatus)

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact={true} path="/home" component={Home} />
          <Route path="/whies/:id" component={PrivateChat} />
          <Route exact={true} path="/share" component={EveryoneWhy} />
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
