// Import Pacakages
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

// Import Styles

// Import Components
import Home from "./Home.js"
import Layout from "./Layout"
import SignUp from "./SignUp"
// import SignIn from "./components/SignIn";
import UserMypage from "./UserMypage"
import EveryoneWhy from "./EveryoneWhy"
import PrivateChat from "./PrivateChat"
import UserEdit from "./UserEdit"

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState("NOT_LOGGED_IN")

  const [user, setUser] = useState({})

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
            path="/signup"
            // component={SignUp}
            render={(props) => <SignUp {...props} />}
          />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
