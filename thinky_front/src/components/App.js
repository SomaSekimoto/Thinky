// Import Pacakages
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

// Import Styles

// Import Components
import Home from "./Home.js"
import Layout from "./Layout"
// import SignUp from "./SignUp";
// import SignIn from "./SignIn";
// import UserEdit from "./UserEdit";
import UserMypage from "./UserMypage"
import EveryoneWhy from "./EveryoneWhy"
import ChatPage from "./ChatPage"
import UserEdit from "./UserEdit"

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact={true} path="/home" component={Home} />
          <Route path="/whies/:id" component={ChatPage} />
          <Route exact={true} path="/share" component={EveryoneWhy} />
          <Route exact={true} path="/mypage" component={UserMypage} />
          <Route exact={true} path="/userEdit" component={UserEdit} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
