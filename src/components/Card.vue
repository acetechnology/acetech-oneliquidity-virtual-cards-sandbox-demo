<template>
  <router-link
    class="card-link"
    :to="{ name: 'card-show', params: { id: card.cardId } }"
  >
    <div class="oneL-card -shadow">
      <span class="eyebrow">Expires @{{ card.expiry }}</span>
      <h4 class="title">Card Name - {{ card.cardName }}</h4>
      <h4 class="title">Card Number - XXXX XXXX XXXX {{ card.last4 }}</h4>
      <BaseIcon name="trending-up"
        >Balance {{ card.currency }} {{ card.balance }}</BaseIcon
      >
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    card: Object,
  },
};
</script>

<style scoped>
.oneL-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.oneL-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.oneL-card > .title {
  margin: 0;
}
.card-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
