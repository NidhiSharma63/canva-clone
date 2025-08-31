import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router";
import SignIn from "./pages/Auth/SignInScreen/Index";
import SignUp from "./pages/Auth/SignUpScreen";
import HomeScreen from "./pages/HomeScreen/Index";
import getToken from "./utils/getToken";

function ProtectedRoute() {
  const isAuthed = getToken();

  if (!isAuthed) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    element: <ProtectedRoute />, // wrapper
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
