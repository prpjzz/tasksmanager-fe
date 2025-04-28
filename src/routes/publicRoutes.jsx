import Home from "../pages/Home";
import Test from "../pages/Test";
import AddTask from "../pages/AddTask";
import DefaultLayout from "../layouts/DefaultLayout";

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout, requiresAuth: true },
  { path: "/add-task", component: AddTask, layout: DefaultLayout, requiresAuth: true },
  { path: "/test", component: Test, layout: DefaultLayout, requiresAuth: true },
  
];

export default publicRoutes;