import { lazy } from "react";
import DefaultLayout from "../layouts/DefaultLayout";

const Home = lazy(() => import("../pages/Home"));
const Test = lazy(() => import("../pages/Test"));
const AddTask = lazy(() => import("../pages/AddTask"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Tasks = lazy(() => import("../pages/Tasks"));
const AddSchedule = lazy(() => import("../pages/AddSchedule"));

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout, requiresAuth: true },
  { path: "/add-task", component: AddTask, layout: DefaultLayout, requiresAuth: true },
  { path: "/add-schedule", component: AddSchedule, layout: DefaultLayout, requiresAuth: true },
  { path: "/test", component: Test, layout: DefaultLayout, requiresAuth: true },
  { path: "/tasks", component: Tasks, layout: DefaultLayout, requiresAuth: true },
  { path: "/login", component: Login, layout: null, requiresAuth: false },
  { path: "/register", component: Register, layout: null, requiresAuth: false },
];

export default publicRoutes;