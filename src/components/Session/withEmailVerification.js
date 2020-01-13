import React from "react"

import AuthUserContext from "./context"
import { withFirebase } from "../Firebase"

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    state = {
      isSent: false
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }))
    }

    render() {
      const { isSent } = this.state
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                {isSent ? (
                  <p>
                    Email confirmation sent: Check your emails. Refresh this
                    page when you have confirmed your email
                  </p>
                ) : (
                  <p>
                    Verify you Email: Check your emails or send another
                    confirmation email.
                  </p>
                )}

                <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={isSent}
                >
                  Re-send confirmation email
                </button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      )
    }
  }
  return withFirebase(WithEmailVerification)
}

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes("password")

export default withEmailVerification
