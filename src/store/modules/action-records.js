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
  unsetRecords() {
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
  actionUnsetRecords: ({ commit }) => {
    commit("unsetRecords");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
