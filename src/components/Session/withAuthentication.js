import React from "react"

import AuthUserContext from "./context"
import { withFirebase } from "../Firebase"

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    // Retrieve the authUser from the cahce
    // If there isn't one then it returns null
    state = {
      authUser: JSON.parse(localStorage.getItem("authUser"))
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          // Stores the auth user in the local state + the browser cache
          localStorage.setItem("authUser", JSON.stringify(authUser))
          this.setState({ authUser })
        },
        () => {
          localStorage.removeItem("authUser")
          this.setState({ authUser: null })
        }
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      const { authUser } = this.state
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(WithAuthentication)
}

export default withAuthentication
