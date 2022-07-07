import NetworkService from "@/services/NetworkService.js";

export const namespaced = true;

export const state = {
  users: [],
  usersTotal: 0,
  user: {},
};

export const mutations = {
  ADD_USER(state, user) {
    state.users.push(user);
  },
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_USER_CARDS(state, cards) {
    state.user.cards = cards;
  },
};

export const actions = {
  createUser({ commit, dispatch }, user) {
    return NetworkService.createUser(user)
      .then(() => {
        commit("ADD_USER", user);
        commit("SET_USER", user);
        const notification = {
          type: "success",
          message: "Your user has been created!",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        console.log(error);

        const notification = {
          type: "error",
          message: "There was a problem creating your user: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },

  kycUser({ dispatch }, body) {
    return NetworkService.kycUser(body)
      .then(() => {
        const notification = {
          type: "success",
          message: "Your kyc request was successful!",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        console.log(error);
        const notification = {
          type: "error",
          message: "There was a problem handling kyc user: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },

  fetchUsers({ commit, dispatch }) {
    const notification = {
      type: "info",
      message: "Fetching User List",
    };
    dispatch("notification/add", notification, { root: true });
    return NetworkService.getUsers()
      .then((response) => {
        commit("SET_USERS", response.data.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching users: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchUser({ commit, getters, state }, id) {
    if (id == state.user.user) {
      return state.user;
    }
    var user = getters.getUserById(id);
    if (user) {
      commit("SET_USER", user);
      return user;
    } else {
      return NetworkService.getUser(id).then((response) => {
        console.log(response.data);
        commit("SET_USER", response.data.data);
        return response.data.data;
      });
    }
  },
  fetchUserCards({ commit, dispatch }, user) {
    return NetworkService.getCards(user)
      .then((response) => {
        console.log(response.data.data);
        commit("SET_USER_CARDS", response.data.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching cards: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  createCard({ dispatch }, card) {
    return NetworkService.createCard(card)
      .then(() => {
        const notification = {
          type: "success",
          message: "Your card has been created!",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        console.log(error);
        const notification = {
          type: "error",
          message: "There was a problem creating your user: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
};

export const getters = {
  getUserById: (state) => (uid) => {
    return state.users.find((user) => user.uid === uid);
  },
};
