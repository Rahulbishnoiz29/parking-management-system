import { Navigate } from "react-router-dom"
import { getUserFromToken } from "../utils/auth"

function PrivateRoute({ children }) {
  const user = getUserFromToken()

  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute
