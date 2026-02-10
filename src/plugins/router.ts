import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

import CartSession from "@/routes/shopping-cart/current/CartSession.vue";
import HistoryListing from "@/routes/shopping-cart/history/HistoryListing.vue";
import SessionDetail from "@/routes/shopping-cart/history/SessionDetail.vue";

const routes = [
  { path: "/", redirect: "/shopping-cart/current", props: true },
  { path: "/shopping-cart/current", component: CartSession, props: true },
  { path: "/shopping-cart/history", component: HistoryListing, props: true },
  {
    path: "/shopping-cart/history/:sessionId",
    component: SessionDetail,
    props: true,
  },
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
