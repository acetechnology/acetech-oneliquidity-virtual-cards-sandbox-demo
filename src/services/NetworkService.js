import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_ONEL_BASE_URL,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: process.env.VUE_APP_ONEL_BEARER_TOKEN,
  },
  timeout: 10000,
});

export default {
  getUsers() {
    return apiClient.get(`/card/${process.env.VUE_APP_ONEL_VERSION}/users`);
  },
  getUser(id) {
    return apiClient.get(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/user?userId=` + id
    );
  },
  createUser(body) {
    return apiClient.post(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/user`,
      body
    );
  },
  udateUserAddress(body) {
    return apiClient.patch(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/user/address`,
      body
    );
  },
  kycUser(body) {
    return apiClient.post(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/user/kyc`,
      body
    );
  },
  getCards(id) {
    return apiClient.get(
      `/cards/${process.env.VUE_APP_ONEL_VERSION}?user=` + id
    );
  },
  getCard(id) {
    return apiClient.get(
      `/card/${process.env.VUE_APP_ONEL_VERSION}?card=` + id
    );
  },
  createCard(body) {
    return apiClient.post(`/card/${process.env.VUE_APP_ONEL_VERSION}`, body);
  },
  updateCardCreditBalance(body) {
    return apiClient.patch(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/credit/balance`,
      body
    );
  },
  updateCardDeditBalance(body) {
    return apiClient.patch(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/debit/balance`,
      body
    );
  },
  cardFreeze(body) {
    return apiClient.patch(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/freeze`,
      body
    );
  },
  cardUnfreeze(body) {
    return apiClient.patch(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/unfreeze`,
      body
    );
  },
  cardStop(body) {
    return apiClient.patch(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/stop`,
      body
    );
  },
  getcardFailedTransaction(id) {
    return apiClient.get(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/transaction/failed?transaction=` +
        id
    );
  },
  getcardFailedTransactions(body) {
    return apiClient.get(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/transactions/failed`,
      body
    );
  },
  getcardTransactions(body) {
    return apiClient.get(
      `/card/${process.env.VUE_APP_ONEL_VERSION}/transactions`,
      body
    );
  },
};
