import React, { Component } from "react"
import { compose } from "recompose"

import { AuthUserContext, withAuthorisation } from "../Session"
import { withFirebase } from "../Firebase"
import { Messages } from "../Messages"

class PostPage extends Component {
  state = {
    text: ""
  }

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    })

    this.setState({ text: "" })

    event.preventDefault()
  }

  onChangeText = event => {
    this.setState({ text: event.target.value })
  }

  render() {
    const { text } = this.state
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
              <input type="text" value={text} onChange={this.onChangeText} />
              <button type="submit">Send</button>
            </form>
            <Messages showOwn={authUser && authUser.uid} />
          </div>
        )}
      </AuthUserContext.Consumer>
    )
  }
}

const condition = authUser => !!authUser

export default compose(withFirebase, withAuthorisation(condition))(PostPage)
