import React, { Component } from "react"
import { compose } from "recompose"

import { withAuthorisation } from "../Session"
import { withFirebase } from "../Firebase"
import { Messages } from "../Messages"

class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <Messages />
      </div>
    )
  }
}

const condition = authUser => !!authUser

export default compose(withFirebase, withAuthorisation(condition))(HomePage)
