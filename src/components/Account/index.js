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
      <div className="page">
        <h1>Account: {authUser.username}</h1>
        <h2>Email: {authUser.email}</h2>
        {authUser.roles.ADMIN ? <h2>Role: Admin</h2> : <h2>Role: User</h2>}
        <h3>Forgot Password:</h3>
        <PasswordForgetForm />
        <h3>Change Password:</h3>
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
)

const condition = authUser => !!authUser

export default compose(
  // withEmailVerification,
  withAuthorisation(condition)
)(AccountPage)
