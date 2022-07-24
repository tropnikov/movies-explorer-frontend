import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  // let location = useLocation();
  const { loggedIn } = useContext(CurrentUserContext);
  const currentUser = useContext(CurrentUserContext);
  // return isLoggedIn ? children : <Navigate to="/" replace />;
  console.log(currentUser);
  console.log(loggedIn);

  // useEffect(() => {
  //   tokenCheck();
  // }, []);

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
