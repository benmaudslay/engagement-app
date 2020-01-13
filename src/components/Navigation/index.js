import React, { useContext } from "react"
import { Link, __RouterContext } from "react-router-dom"
import styled from "styled-components"

import { AuthUserContext } from "../Session"
import SignOutButton from "../SignOut"
import * as ROUTES from "../../constants/routes"
import * as ROLES from "../../constants/roles"

// Context hook for the hover nav menu
const useRouter = () => {
  return useContext(__RouterContext)
}

// The on-hover version of the navigation menu
export const NavigationPlus = () => {
  const { history } = useRouter()

  const handleHover = route => {
    history.push(route)
  }

  return (
    <NavBar>
      <li>
        <Link
          to={ROUTES.SIGN_IN}
          onMouseOver={() => handleHover(ROUTES.SIGN_IN)}
        >
          Sign In
        </Link>
      </li>
      <li>
        <Link
          to={ROUTES.LANDING}
          onMouseOver={() => handleHover(ROUTES.LANDING)}
        >
          Landing
        </Link>
      </li>
      <li>
        <Link to={ROUTES.HOME} onMouseOver={() => handleHover(ROUTES.HOME)}>
          Home
        </Link>
      </li>
      <li>
        <Link
          to={ROUTES.ACCOUNT}
          onMouseOver={() => handleHover(ROUTES.ACCOUNT)}
        >
          Account
        </Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN} onMouseOver={() => handleHover(ROUTES.ADMIN)}>
          Admin
        </Link>
      </li>
    </NavBar>
  )
}

const Navigation = () => (
  <>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </>
)

const NavigationAuth = ({ authUser }) => (
  <NavBar>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.POST}>Post</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    {!!authUser.roles[ROLES.ADMIN] && (
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </NavBar>
)

const NavigationNonAuth = () => (
  <NavBar>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </NavBar>
)

export default Navigation

const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  padding: 10px 10px 0px 10px;

  li {
    list-style: none;
    padding: 10px;

    a {
      padding: 10px;
      text-decoration: none;
    }

    a:hover {
      background-color: blueviolet;
      border-radius: 5px;
      color: #fff;
    }
  }
`
