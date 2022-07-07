<template>
  <div>
    <div class="card-header">
      <span class="eyebrow">@{{ card.cardId }}</span>
      <h1 class="title">Card Name - {{ card.cardName }}</h1>
    </div>
    <BaseIcon name="credit-card">
      <h2 style="margin-right: 5px">{{ card.cardNumber }}</h2>
      <address>{{ card.valid }} {{ card.cvv2 }} {{ card.status }}</address>
    </BaseIcon>
    <BaseIcon name="trending-up"
      >Balance {{ card.currency }} {{ card.balance }}</BaseIcon
    >
    <div class="action-buttons">
      <BaseButton
        @click="freezeCard"
        style="margin: 5px"
        type="submit"
        buttonClass="-fill-gradient"
        >Freeze Card</BaseButton
      >

      <BaseButton
        @click="unfreezeCard"
        style="margin: 5px"
        type="submit"
        buttonClass="-fill-gradient"
        >Unfreeze Card</BaseButton
      >

      <BaseButton
        @click="stopCard"
        style="margin: 5px"
        type="submit"
        buttonClass="-fill-gradient"
        >Stop Card</BaseButton
      >
    </div>
    <div class="action-buttons">
      <BaseButton
        @click="debitCreditAction('Credit')"
        style="margin: 5px"
        type="submit"
        buttonClass="-fill-gradient"
        >Credit Card</BaseButton
      >
      <BaseButton
        @click="debitCreditAction('Debit')"
        style="margin: 5px"
        type="submit"
        buttonClass="-fill-gradient"
        >Debit Card</BaseButton
      >
    </div>
    <div v-show="showCardCreditDebitForm">
      <h1>{{ action }} Card</h1>
      <form @submit.prevent="creditOrDebitCard">
        <h3>Fill In Details</h3>

        <BaseInput
          label="Amount"
          v-model="amount"
          type="text"
          placeholder="Amount"
          class="field"
          :class="{ error: v$.amount.$error }"
          @blur="v$.amount.$touch()"
        />

        <template v-if="v$.amount.$error">
          <p v-if="!v$.amount.required" class="errorMessage">
            Amount is required.
          </p>
        </template>

        <BaseButton
          type="submit"
          buttonClass="-fill-gradient"
          :disabled="v$.$anyError"
          >Submit</BaseButton
        >
        <p v-if="v$.$anyError" class="errorMessage">
          Please fill out the required field(s).
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import NProgress from "nprogress";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  validations: {
    amount: { required },
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      cards: [],
      showCardCreditDebitForm: false,
      amount: "",
      action: "",
    };
  },
  methods: {
    async freezeCard() {
      NProgress.start();
      await this.$store
        .dispatch("card/freezeCard", {
          cardId: this.card.cardId,
        })
        .then(async () => {})
        .catch(() => {
          NProgress.done();
        });
    },
    async unfreezeCard() {
      NProgress.start();
      await this.$store
        .dispatch("card/unfreezeCard", {
          cardId: this.card.cardId,
        })
        .then(async () => {})
        .catch(() => {
          NProgress.done();
        });
    },
    async stopCard() {
      NProgress.start();
      await this.$store
        .dispatch("card/stopCard", {
          cardId: this.card.cardId,
          reasonId: 5,
        })
        .then(async () => {})
        .catch(() => {
          NProgress.done();
        });
    },
    debitCreditAction(act) {
      this.showCardCreditDebitForm = true;
      this.action = act;
    },
    async creditOrDebitCard() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        NProgress.start();
        switch (this.action) {
          case "Debit":
            await this.$store
              .dispatch("card/debitCard", {
                amount: parseInt(this.amount),
                cardId: this.card.cardId,
              })
              .then((res) => {
                console.log(res);
              })
              .catch(() => {
                NProgress.done();
              });
            break;
          case "Credit":
            await this.$store
              .dispatch("card/creditCard", {
                amount: parseInt(this.amount),
                cardId: this.card.cardId,
              })
              .then((res) => {
                console.log(res);
              })
              .catch(() => {
                NProgress.done();
              });
            break;
          default:
            break;
        }
      } else {
        const notification = {
          type: "warning",
          message: `${this.v$.$errors[0].$property} ${this.v$.$errors[0].$message}`,
        };
        this.$store.dispatch("notification/add", notification, { root: true });
      }
    },
  },
};
</script>
<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.card-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
.action-buttons {
  display: inline-flex;
}
</style>
