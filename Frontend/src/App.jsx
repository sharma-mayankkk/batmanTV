import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { login } from "./store/slices/authSlice";
import { getCurrentUser } from "./api/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const user = await getCurrentUser();
        dispatch(login(user));
      } catch (error) {
        // User is not logged in or token expired.
        // Nothing to do.
      }
    };

    restoreUser();
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;