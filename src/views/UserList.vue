<template>
  <div>
    <h1>Users for You</h1>
    <p v-if="!user.users.length">Not registered any user</p>
    <User v-for="user in user.users" :key="user.uid" :user="user" />
  </div>
</template>

<script>
import User from "@/components/User.vue";
import { mapState } from "vuex";
import store from "@/store/store";

function getPageUsers() {
  store.dispatch("user/fetchUsers", {});
}

export default {
  components: {
    User,
  },
  beforeRouteEnter() {
    getPageUsers();
  },
  beforeRouteUpdate() {
    getPageUsers();
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
