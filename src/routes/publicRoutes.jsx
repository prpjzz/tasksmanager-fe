import Home from "../pages/Home";
import Test from "../pages/Test";
import AddTask from "../pages/AddTask";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout, requiresAuth: true },
  { path: "/add-task", component: AddTask, layout: DefaultLayout, requiresAuth: true },
  { path: "/test", component: Test, layout: DefaultLayout, requiresAuth: true },
  { path: "/login", component: Login, layout: null, requiresAuth: false },
  { path: "/register", component: Register, layout: null, requiresAuth: false },
];

export default publicRoutes;