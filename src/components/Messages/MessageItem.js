import React, { Component } from "react"

export class MessageItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false,
      editText: this.props.message.text,
      editWho: this.props.message.text.who,
      editPledger: this.props.message.text.pledger,
      editWhat: this.props.message.text.what
    }
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text
    }))
  }

  onChangeEditText = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSaveEditText = () => {
    let edited = {
      what: this.state.editWhat,
      who: this.state.editWho,
      pledger: this.state.editPledger
    }

    this.props.onEditMessage(this.props.message, edited)
    this.setState({ editMode: false })
  }

  render() {
    const { message, onRemoveMessage, editRight } = this.props
    const { editMode, editText, editWhat, editWho, editPledger } = this.state

    return (
      <li className="card">
        {editMode ? (
          <form>
            <input
              type="text"
              name="editWhat"
              value={editWhat}
              onChange={this.onChangeEditText}
            />
            <input
              type="text"
              name="editWho"
              value={editWho}
              onChange={this.onChangeEditText}
            />
            <input
              type="text"
              name="editPledger"
              value={editPledger}
              onChange={this.onChangeEditText}
            />
          </form>
        ) : (
          <>
            <div className="card-user card-child">
              <strong>{message.user.username || message.user.userId}</strong>
              {message.editedAt && <span> (Edited)</span>}
            </div>

            <div className="card-message card-child">
              <p>What: {message.text.what}</p>
              <p>Who: {message.text.who}</p>
              <p>Pledger: {message.text.pledger}</p>
            </div>
          </>
        )}

        {editRight && (
          <>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveMessage(message.uid)}
              >
                Delete
              </button>
            )}
          </>
        )}
      </li>
    )
  }
}
