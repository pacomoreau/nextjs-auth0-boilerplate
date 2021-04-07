import { withAuthenticationRequired } from "@auth0/auth0-react"

const Component = ({ children }) => <>{children}</>

export const AuthenticatedComponent = withAuthenticationRequired(Component)