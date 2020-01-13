import React from "react"
import { compose } from "recompose"

import { PasswordForgetForm } from "../PasswordForget"
import PasswordChangeForm from "../PasswordChange"
import {
  withAuthorisation,
  AuthUserContext,
  withEmailVerification
} from "../Session"

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <>
        <h1>Account: {authUser.email}</h1>
        <h3>Forgot Password:</h3>
        <PasswordForgetForm />
        <h3>Change Password:</h3>
        <PasswordChangeForm />
      </>
    )}
  </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser

export default compose(
  // withEmailVerification,
  withAuthorisation(condition)
)(AccountPage)
