import React from "react"

import { MessageItem } from "./MessageItem"

export const MessageList = ({
  messages,
  onEditMessage,
  onRemoveMessage,
  editRight
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        key={message.uid}
        message={message}
        onEditMessage={onEditMessage}
        onRemoveMessage={onRemoveMessage}
        editRight={editRight}
      />
    ))}
  </ul>
)
