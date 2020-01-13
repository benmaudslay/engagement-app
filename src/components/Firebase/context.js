import React from "react"

const FirebaseContext = React.createContext(null)

// This is a Higher Order Component to wrap other components to compartmentalise the firebase instance
export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export default FirebaseContext
