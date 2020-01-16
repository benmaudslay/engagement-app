import React, { Component } from "react"
import { compose } from "recompose"

import { AuthUserContext, withAuthorisation } from "../Session"
import { withFirebase } from "../Firebase"
import { Messages } from "../Messages"

class PostPage extends Component {
  state = {
    text: "",
    what: "",
    who: "",
    pledger: ""
  }

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: {
        what: this.state.what,
        who: this.state.who,
        pledger: this.state.pledger
      },
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    })

    console.log("who: " + this.state.who)
    console.log("what: " + this.state.what)
    this.setState({ text: "" })

    event.preventDefault()
  }

  onChangeText = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { text, who, what, pledger } = this.state
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div className="page">
            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
              <label>What have you been doing?</label>
              <input
                type="text"
                name="what"
                value={what}
                onChange={this.onChangeText}
              />
              <label>Who have you met with?</label>
              <input
                type="text"
                name="who"
                value={who}
                onChange={this.onChangeText}
              />
              <label>Which pledgers have been in this week?</label>
              <input
                type="text"
                name="pledger"
                value={pledger}
                onChange={this.onChangeText}
              />
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
