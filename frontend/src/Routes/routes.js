import Registration from "../Components/Registration/Registration";
import Login from "../Components/Login/Login";
import Home from "../Components/Home/Home";

const routes = [
  {
    path: "/registration",
    exact: true,
    component: Registration,
  },
  {
    path: "/",
    exact: true,
    component: Registration,
  },
  {
    path: "/home",
    exact: true,
    component: Home,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
  },
];
export default routes;
