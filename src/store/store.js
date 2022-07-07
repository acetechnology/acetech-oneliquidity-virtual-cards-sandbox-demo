// import Vue from "vue";
// import Vuex from "vuex";
import * as user from "@/store/modules/user.js";
import * as card from "@/store/modules/card.js";
import * as notification from "@/store/modules/notification.js";

import { createStore } from "vuex";

export default createStore({
  modules: {
    user,
    card,
    notification,
  },
  state: {
    countries: ["NGA", "USA"],
  },
});
