import { Route, Redirect } from 'react-router-dom';
import { isAllowedByRole, isAuthenticated, Role } from '../../../core/utils/auth';

type Props = {
  children: React.ReactNode
  path: string
  allowedRoutes?: Role[]
  exact?: boolean
}

const PrivateRoute = ({ children, path, allowedRoutes, exact }: Props) => {
  return (
    <Route
      path={ path }
      render={({ location }) => {
        if (!isAuthenticated()) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        } else if (isAuthenticated() && !isAllowedByRole(allowedRoutes)) {
          return (
            <Redirect to={{ pathname: "/" }} /> // Redireciona o usuário para alguma rota caso ele não possa acessar a rota escolhida
          )
        }

        return children // Se falhar no if else libera a rota para todos os usuários
      }}
    />
  );
}

export default PrivateRoute