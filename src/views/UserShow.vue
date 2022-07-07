<template>
  <div>
    <div class="card-header">
      <span class="eyebrow">@{{ user.uid }}</span>
      <h1 class="title">{{ user.firstName }} {{ user.lastName }}</h1>
    </div>
    <BaseIcon name="map">
      <h2 style="margin-right: 5px">Location</h2>
      <address>
        {{ user.address }} {{ user.city }} {{ user.postalCode }}
        {{ user.kycCountry }}
      </address>
    </BaseIcon>

    <div>
      <h2>
        Cards
        <span class="badge -fill-gradient">{{
          cards ? getCardsNumbers() : 0
        }}</span>
      </h2>
      <Card v-for="card in user.cards" :key="card.cardId" :card="card" />
    </div>
    <div class="action-buttons">
      <BaseButton
        @click="this.showCreateCard = !this.showCreateCard"
        style="margin: 5px"
        type="submit"
        buttonClass="-fill-gradient"
        >Create Card</BaseButton
      >

      <BaseButton
        @click="getUserCards"
        style="margin: 5px"
        type="submit"
        buttonClass="-fill-gradient"
        >Fetch Cards</BaseButton
      >

      <BaseButton
        @click="runKYC"
        style="margin: 5px"
        type="submit"
        buttonClass="-fill-gradient"
        >Run KYC</BaseButton
      >
    </div>
    <div v-show="showCreateCard">
      <h1>Create a Card</h1>
      <form @submit.prevent="createCard">
        <h3>Fill In Details Of Your User</h3>

        <BaseInput
          label="Expiry Date - YYYY-MM-DD"
          v-model="card.expiry"
          type="text"
          placeholder="YYYY-MM-DD"
          class="field"
          :class="{ error: v$.card.expiry.$error }"
          @blur="v$.card.expiry.$touch()"
        />

        <template v-if="v$.card.expiry.$error">
          <p v-if="!v$.card.expiry.required" class="errorMessage">
            Expiry date is required.
          </p>
        </template>

        <BaseSelect
          label="Single Use?"
          :options="[true, false]"
          placeholder="Single Use?"
          v-model="card.singleUse"
          class="field"
          :class="{ error: v$.card.singleUse.$error }"
          @blur="v$.card.singleUse.$touch()"
        />
        <template v-if="v$.card.singleUse.$error">
          <p v-if="!v$.card.singleUse.required" class="errorMessage">
            Single Use is required.
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
import Card from "@/components/Card.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import store from "@/store/store";
import { mapState } from "vuex";

export default {
  beforeRouteEnter(routeTo, routeFrom, next) {
    store
      .dispatch("user/fetchUserCards", routeTo.params.id)
      .then(() => {
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
  beforeRouteUpdate(routeTo, routeFrom, next) {
    store
      .dispatch("user/fetchUserCards", routeTo.params.id)
      .then(() => {
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
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    Card,
    ...mapState(["user"]),
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      cards: [],
      showCreateCard: false,
      card: {
        userId: "",
        expiry: "",
        singleUse: false,
      },
    };
  },

  validations: {
    card: {
      expiry: { required },
      singleUse: { required },
    },
  },
  methods: {
    async runKYC() {
      NProgress.start();
      await store.dispatch("user/kycUser", {
        user: this.user.userId,
        selfieBase64: this.getBase64Sample(),
        idBase64: this.getBase64Sample(),
      });
      NProgress.done();
    },
    async getUserCards() {
      NProgress.start();
      await store.dispatch("user/fetchUserCards", this.user.userId);
      NProgress.done();
    },
    getBase64Sample() {
      return " data:image/png;base64,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";
    },
    async createCard() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        NProgress.start();
        this.card.userId = this.user.userId;
        await store
          .dispatch("user/createCard", this.card)
          .then(async (res) => {
            console.log(res);
            this.showCreateCard = false;
            this.card = {
              userId: "",
              expiry: "",
              singleUse: false,
            };
            await this.getUserCards();
            NProgress.done();
          })
          .catch(() => {
            NProgress.done();
          });
      } else {
        const notification = {
          type: "warning",
          message: `${this.v$.$errors[0].$property} ${this.v$.$errors[0].$message}`,
        };
        store.dispatch("notification/add", notification, { root: true });
      }
    },
    getCardsNumbers() {
      if (this.user.cards) {
        return this.user.cards.length;
      }
      return 0;
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
