<template>
  <div>
    <h1>Create a User</h1>
    <form @submit.prevent="createUser">
      <h3>Fill In Details Of Your User</h3>
      <BaseInput
        label="First Name"
        v-model="user.firstName"
        type="text"
        placeholder="First Name"
        class="field"
        :class="{ error: v$.user.firstName.$error }"
        @blur="v$.user.firstName.$touch()"
      />

      <template v-if="v$.user.firstName.$error">
        <p v-if="!v$.user.firstName.required" class="errorMessage">
          First Name is required.
        </p>
      </template>

      <BaseInput
        label="Last Name"
        v-model="user.lastName"
        type="text"
        placeholder="Last Name"
        class="field"
        :class="{ error: v$.user.lastName.$error }"
        @blur="v$.user.lastName.$touch()"
      />

      <template v-if="v$.user.lastName.$error">
        <p v-if="!v$.user.lastName.required" class="errorMessage">
          Last Name is required.
        </p>
      </template>

      <BaseSelect
        label="Select KYC Country"
        :options="countries"
        placeholder="Select KYC Country"
        v-model="user.kycCountry"
        class="field"
        :class="{ error: v$.user.lastName.$error }"
        @blur="v$.user.kycCountry.$touch()"
      />
      <template v-if="v$.user.kycCountry.$error">
        <p v-if="!v$.user.kycCountry.required" class="errorMessage">
          KYC Country is required.
        </p>
      </template>

      <BaseInput
        label="UID"
        v-model="user.uid"
        type="text"
        placeholder="UID"
        class="field"
        :value="uid()"
        disabled
        :class="{ error: v$.user.uid.$error }"
        @blur="v$.user.uid.$touch()"
      />

      <template v-if="v$.user.uid.$error">
        <p v-if="!v$.user.uid.required" class="errorMessage">
          UID is required.
        </p>
      </template>

      <BaseInput
        label="Address"
        v-model="user.address"
        type="text"
        placeholder="Address"
        class="field"
        :class="{ error: v$.user.address.$error }"
        @blur="v$.user.address.$touch()"
      />

      <template v-if="v$.user.address.$error">
        <p v-if="!v$.user.address.required" class="errorMessage">
          Address is required.
        </p>
      </template>

      <BaseInput
        label="City"
        v-model="user.city"
        type="text"
        placeholder="City"
        class="field"
        :class="{ error: v$.user.city.$error }"
        @blur="v$.user.city.$touch()"
      />

      <template v-if="v$.user.city.$error">
        <p v-if="!v$.user.city.required" class="errorMessage">
          City is required.
        </p>
      </template>

      <BaseInput
        label="Postal Code"
        v-model="user.postalCode"
        type="text"
        placeholder="Postal Code"
        class="field"
        :class="{ error: v$.user.postalCode.$error }"
        @blur="v$.user.postalCode.$touch()"
      />

      <template v-if="v$.user.postalCode.$error">
        <p v-if="!v$.user.postalCode.required" class="errorMessage">
          Postal Code is required.
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
</template>

<script>
import NProgress from "nprogress";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { v4 as uuidv4 } from "uuid";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      countries: this.$store.state.countries,
      user: {
        firstName: "",
        lastName: "",
        kycCountry: "",
        uid: "",
        address: "",
        city: "",
        postalCode: "",
      },
    };
  },
  validations: {
    user: {
      firstName: { required },
      lastName: { required },
      kycCountry: { required },
      uid: { required },
      address: { required },
      city: { required },
      postalCode: { required },
    },
  },
  methods: {
    createUser() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        NProgress.start();
        this.$store
          .dispatch("user/createUser", this.user)
          .then((res) => {
            console.log(res);
            this.$router.push({
              name: "user-list",
            });
          })
          .catch(() => {
            NProgress.done();
          });
      } else {
        const notification = {
          type: "warning",
          message: `${this.v$.$errors[0].$property} ${this.v$.$errors[0].$message}`,
        };
        this.$store.dispatch("notification/add", notification, { root: true });
      }
    },
    uid() {
      if (!this.user.uid) {
        this.user.uid = uuidv4();
      }
    },
  },
};
</script>
