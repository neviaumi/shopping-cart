import { createRouter, createWebHashHistory } from "vue-router";

import CartSession from "@/components/CartSession/CartSession.vue";
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
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
