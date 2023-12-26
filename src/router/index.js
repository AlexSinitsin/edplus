import { createRouter, createWebHistory } from "vue-router";
import Main from "../screens/MainBox.vue";
import Account from "../screens/AccountBox.vue";
import NewEvent from "../screens/newEvent/NewEvent.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/account",
    name: "account",
    component: Account,
  },
  {
    path: "/newevent",
    name: "newevent",
    component: NewEvent,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
