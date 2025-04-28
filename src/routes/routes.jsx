const RouteGuard = ({children, requiresAuth,}) => {
  // const { user } = useAuth();

  // if (requiresAuth && !user) {
  //   return <Navigate to="/login" replace />;
  // }

  // if (!requiresAuth && user) {
  //   return <Navigate to="/home" replace />;
  // }
  console.log("RouteGuard", requiresAuth);

  return children;
};

export default RouteGuard;