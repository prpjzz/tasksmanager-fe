import Home from "../pages/Home";
import Test from "../pages/Test";
import AddTask from "../pages/AddTask";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tasks from "../pages/Tasks";
import AddSchedule from "../pages/AddSchedule";
import UserProfilePage from "../pages/UserProfilePage";
import UserAccountSettingsPage from "../pages/UserAccountSettingsPage";
import { compose } from "@reduxjs/toolkit";
const publicRoutes = [
  { path: "/", component: Home, layout: DefaultLayout, requiresAuth: true },
  { path: "/add-task", component: AddTask, layout: DefaultLayout, requiresAuth: true },
  { path: "/add-schedule", component: AddSchedule, layout: DefaultLayout, requiresAuth: true },
  { path: "/test", component: Test, layout: DefaultLayout, requiresAuth: true },
  { path: "/tasks", component: Tasks, layout: DefaultLayout, requiresAuth: true },
  { path: "/login", component: Login, layout: null, requiresAuth: false },
  { path: "/register", component: Register, layout: null, requiresAuth: false },
  { path: "/profile/edit", component: UserAccountSettingsPage},
  { path: "/Profile", component:UserProfilePage},
];

export default publicRoutes;