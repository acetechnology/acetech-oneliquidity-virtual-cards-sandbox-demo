<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 5000);
  },
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    },
  },
  methods: mapActions("notification", ["remove"]),
};
</script>

<style scoped>
.notification-bar {
  margin: 10px;
  background-color: #7b61ff;
}
.-text-success {
  color: #28a745;
}
.-text-error {
  color: #dc3545;
}
.-text-warning {
  color: #ffc107;
}
.-text-info {
  color: #17a2b8;
}
</style>
