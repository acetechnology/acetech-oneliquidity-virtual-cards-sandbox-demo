import NetworkService from "@/services/NetworkService.js";

export const namespaced = true;

export const state = {
  cards: [],
  cardsTotal: 0,
  card: {},
};

export const mutations = {
  ADD_EVENT(state, card) {
    state.cards.push(card);
  },
  SET_CARDS(state, cards) {
    state.cards = cards;
  },
  SET_CARDS_TOTAL(state, cardsTotal) {
    state.cardsTotal = cardsTotal;
  },
  SET_CARD(state, card) {
    state.card = card;
  },
};

export const actions = {
  async fetchCard({ commit, getters, state, dispatch }, id) {
    const notification = {
      type: "info",
      message: "Fetching Cards",
    };
    dispatch("notification/add", notification, { root: true });
    if (id == state.card.id) {
      return state.card;
    }
    var card = getters.getCardById(id);

    if (card) {
      commit("SET_CARD", card);
      return card;
    } else {
      return NetworkService.getCard(id)
        .then((response) => {
          commit("SET_CARD", response.data.data);
          return response.data.data;
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: "There was a problem fetching cards: " + error.message,
          };
          dispatch("notification/add", notification, { root: true });
        });
    }
  },
  async freezeCard({ dispatch }, body) {
    return NetworkService.cardFreeze(body)
      .then((response) => {
        const notification = {
          type: "success",
          message: "Card Frozen Successfully",
        };
        dispatch("notification/add", notification, { root: true });
        return response.data.data;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem freezing card: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  async unfreezeCard({ dispatch }, body) {
    return NetworkService.cardUnfreeze(body)
      .then((response) => {
        const notification = {
          type: "success",
          message: "Card unFrozen Successfully",
        };
        dispatch("notification/add", notification, { root: true });
        return response.data.data;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem unfreezing card: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  async creditCard({ dispatch }, body) {
    return NetworkService.updateCardCreditBalance(body)
      .then((response) => {
        const notification = {
          type: "success",
          message: "Card credited successfully",
        };
        dispatch("notification/add", notification, { root: true });
        return response.data.data;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem crediting card: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  async debitCard({ dispatch }, body) {
    return NetworkService.updateCardDeditBalance(body)
      .then((response) => {
        const notification = {
          type: "success",
          message: "Card debited successfully",
        };
        dispatch("notification/add", notification, { root: true });
        return response.data.data;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem debiting card: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  async stopCard({ dispatch }, body) {
    return NetworkService.cardStop(body)
      .then((response) => {
        const notification = {
          type: "success",
          message: "Card stopped successfully",
        };
        dispatch("notification/add", notification, { root: true });
        return response.data.data;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem stoppiing card: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
};

export const getters = {
  getCardById: (state) => (id) => {
    return state.cards.find((card) => card.cardId === id);
  },
};
