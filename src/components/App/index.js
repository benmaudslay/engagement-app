import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Navigation, { NavigationPlus } from "../Navigation"
import SignUpPage from "../SignUp"
import SignInPage from "../SignIn"
import PasswordForgetPage from "../PasswordForget"
import HomePage from "../Home"
import AccountPage from "../Account"
import AdminPage from "../Admin"
import PostPage from "../Post"

import * as ROUTES from "../../constants/routes"
import { withFirebase } from "../Firebase"
import { withAuthentication } from "../Session"

const App = () => (
  <Router>
    <div className="container">
      <Navigation />

      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.POST} component={PostPage} />
    </div>
  </Router>
)

export default withAuthentication(App)
