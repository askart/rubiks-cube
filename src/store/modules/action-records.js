function initialState() {
  return {
    records: []
  };
}

const state = {
  ...initialState()
};

const getters = {
  getRecords: state => {
    return state.records;
  }
};

const mutations = {
  addRecord: (state, payload) => {
    state.records.push(payload);
  },
  unset() {
    const iState = initialState();
    Object.keys(iState).forEach(key => {
      state[key] = iState[key];
    });
  }
};

const actions = {
  actionAddRecord: ({ commit }, payload) => {
    commit("addRecord", payload);
  },
  actionUnset: ({ commit }) => {
    commit("unset");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
