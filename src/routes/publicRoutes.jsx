import { lazy } from "react";
import DefaultLayout from "../layouts/DefaultLayout";

const Home = lazy(() => import("../pages/Home"));
const Test = lazy(() => import("../pages/Test"));
const AddTask = lazy(() => import("../pages/AddTask"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Tasks = lazy(() => import("../pages/Tasks"));
const AddSchedule = lazy(() => import("../pages/AddSchedule"));
const Todos = lazy(() => import("../pages/Todos"));
const Schedules = lazy(() => import("../pages/Schedules"));
const Profile = lazy(() => import("../pages/Profile"));
const AccountSetting = lazy(() => import("../pages/AccountSetting"));

const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout, requiresAuth: true },
  { path: "/add-task", component: AddTask, layout: DefaultLayout, requiresAuth: true },
  { path: "/add-schedule", component: AddSchedule, layout: DefaultLayout, requiresAuth: true },
  { path: "/todos", component: Todos, layout: DefaultLayout, requiresAuth: true },
  { path: "/schedules", component: Schedules, layout: DefaultLayout, requiresAuth: true },
  { path: "/test", component: Test, layout: DefaultLayout, requiresAuth: true },
  { path: "/tasks", component: Tasks, layout: DefaultLayout, requiresAuth: true },
  { path: "/login", component: Login, layout: null, requiresAuth: false },
  { path: "/register", component: Register, layout: null, requiresAuth: false },
  { path: "/profile", component: Profile, layout: DefaultLayout, requiresAuth: true },
  { path: "/profile/me", component: Profile, layout: DefaultLayout, requiresAuth: true },
  { path: "/account-setting", component: AccountSetting, layout: DefaultLayout, requiresAuth: true },
];

export default publicRoutes;