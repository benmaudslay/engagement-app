import React, { Component } from "react"

import { withFirebase } from "../Firebase"
import { MessageList } from "./MessageList"

export class MessagesBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      loading: false,
      messages: [],
      limit: 10,
      users: null
    }
  }

  componentDidMount() {
    this.onListenForMessages()

    this.props.firebase.users().on("value", snapshot => {
      this.setState({
        users: snapshot.val()
      })
    })
  }

  onListenForMessages = () => {
    this.setState({ loading: true })
    this.props.firebase
      .messages()
      .orderByChild("createdAt")
      .limitToLast(this.state.limit)
      .on("value", snapshot => {
        const messageObject = snapshot.val()
        if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
            ...messageObject[key],
            uid: key
          }))
          this.setState({
            messages: messageList,
            loading: false
          })
        } else {
          this.setState({ messages: null, loading: false })
        }
      })
  }

  componentWillUnmount() {
    this.props.firebase.messages().off()
    this.props.firebase.users().off()
  }

  onEditMessage = (message, text) => {
    this.props.firebase.message(message.uid).set({
      ...message,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    })
  }

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove()
  }

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages
    )
  }

  render() {
    const { showOwn, editRight } = this.props
    const { messages, loading, users } = this.state

    return (
      <div>
        {!loading && messages && messages.length > 10 && (
          <button type="button" onClick={this.onNextPage}>
            More
          </button>
        )}

        {loading && <div>Loading ...</div>}

        {messages && showOwn ? (
          <MessageList
            messages={messages
              .filter(message => message.userId === showOwn)
              .map(message => ({
                ...message,
                user: users ? users[message.userId] : { userId: message.userId }
              }))}
            onEditMessage={this.onEditMessage}
            onRemoveMessage={this.onRemoveMessage}
            editRight={true}
          />
        ) : (
          <MessageList
            messages={messages.map(message => ({
              ...message,
              user: users ? users[message.userId] : { userId: message.userId }
            }))}
            onEditMessage={this.onEditMessage}
            onRemoveMessage={this.onRemoveMessage}
            editRight={editRight}
          />
        )}

        {!messages && <div>There are no messages ...</div>}
      </div>
    )
  }
}

const Messages = withFirebase(MessagesBase)
export default Messages
