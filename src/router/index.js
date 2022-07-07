import { createRouter, createWebHistory } from "vue-router";
import UserCreate from "../views/UserCreate.vue";
import UserList from "../views/UserList.vue";
import CardShow from "../views/CardShow.vue";
import NProgress from "nprogress";
import store from "../store/store";
import NotFound from "../views/NotFound.vue";
import NetworkIssue from "../views/NetworkIssue.vue";
import UserShow from "../views/UserShow.vue";

const routes = [
  {
    path: "/",
    name: "user-list",
    component: UserList,
    props: true,
  },
  {
    path: "/user/create",
    name: "user-create",
    component: UserCreate,
  },
  {
    path: "/card/:id",
    name: "card-show",
    component: CardShow,
    props: true,
  },
  {
    path: "/user/:id",
    name: "user-show",
    component: UserShow,
    props: true,
    async beforeEnter(routeTo, routeFrom, next) {
      await store
        .dispatch("user/fetchUser", routeTo.params.id)
        .then((user) => {
          routeTo.params.user = user;
          next();
        })
        .catch((error) => {
          if (error.response && error.response.status == 404) {
            next({ name: "404", params: { resource: "user" } });
          } else {
            next({ name: "network-issue" });
          }
        });
    },
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-issue",
    name: "network-issue",
    component: NetworkIssue,
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: "404", params: { resource: "page" } },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
