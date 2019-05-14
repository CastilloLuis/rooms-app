/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import countObjectProperties from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {},
    services: {},
    rooms: {},
    authId: null,
    modals: {
      login: false,
      register: false,
    },
  },

  mutations: {
    SET_MODAL_STATE: (state, { name, value }) => {
      // eslint-disable-next-line no-param-reassign
      state.modals[name] = value;
    },

    SET_ROOM(state, { newRoom, roomId }) {
      Vue.set(state.rooms, roomId, newRoom);
    },

    ADD_ROOM_TO_USER(state, { roomId, userId }) {
      Vue.set(state.users[userId].rooms, roomId, roomId);
    },

    SET_ITEM(state, { item, id, resource }) {
      const newItem = item;
      newItem['.key'] = id;
      Vue.set(state[resource], id, newItem);
    },

    SET_AUTHID(state, id) {
      state.authId = id;
    },

  },

  actions: {
    TOGGLE_MODAL_STATE: ({ commit }, { name, value }) => {
      commit('SET_MODAL_STATE', { name, value });
    },

    CREATE_ROOM: ({ state, commit }, room) => {
      const newRoom = room;
      const roomId = firebase.database().ref('rooms').push().key;
      newRoom.userId = state.authId;
      newRoom.publishedAt = Math.floor(Date.now() / 1000);
      newRoom.meta = { likes: 0 };

      const updates = {};

      updates[`rooms/${roomId}`] = newRoom;
      updates[`users/${newRoom.userId}/rooms/${roomId}`] = roomId;

      firebase.database().ref().update(updates).then(() => {
        commit('SET_ROOM', { newRoom, roomId });
        commit('ADD_ROOM_TO_USER', { roomId, userId: newRoom.userId });
      });

      return Promise.resolve(state.rooms[room]);
    },

    FETCH_ROOMS: ({ state, commit }, limit) => {
      return new Promise((resolve) => {
        let instance = firebase.database().ref('rooms');
        if (limit) {
          instance = instance.limitToFirst(limit);
        }
        instance.once('value', (snapshot) => {
          const rooms = snapshot.val();
          Object.keys(rooms).forEach((roomId) => {
            const room = rooms[roomId];
            commit('SET_ITEM', { resource: 'rooms', id: roomId, item: room });
          });
          resolve(Object.values(state.rooms));
        });
      });
    },

    FETCH_USER: ({ state, commit }, { id }) => {
      return new Promise((resolve) => {
        firebase.database().ref('users').child(id).once('value', (snapshot) => {
          commit('SET_ITEM', { resource: 'users', id: snapshot.key, item: snapshot.val() });
          resolve(state.users[id]);
        });
      });
    },

    REGISTER_USER: ({ state, commit }, { email, name, password }) => new Promise(async (resolve) => {
      const account = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const id = account.user.uid;
      const registeredAt = Math.floor(Date.now() / 1000);
      const newUser = { email, name, registeredAt };
      await firebase.database().ref('users').child(id).set(newUser); // we generate a child by the id, and to that new accout we set the new user
      commit('SET_ITEM', { resource: 'users', id, item: newUser });
      resolve(state.users[id]);
    }),

    FETCH_AUTH_USER: async ({ dispatch, commit }) => {
      const userId = firebase.auth().currentUser.uid;
      console.log(userId)
      await dispatch('FETCH_USER', { id: userId }); // verify if the user is auth correctly, we set then if its true the authIddddd
      commit('SET_AUTHID', userId);
    },

    SIGN_IN(context, { email, password }) {
      firebase.auth().signInWithEmailAndPassword(email, password);
    },

    async LOG_OUT({ commit }) {
      await firebase.auth().signOut();
      commit('SET_AUTHID', null);
    },

  },

  getters: {
    modals: state => state.modals,

    authUser(state) { 
      return state.authId ? state.users[state.authId] : null;
    },

    rooms: state => state.rooms,

    userRoomsCount: state => id => countObjectProperties(state.users[id].rooms),
  },

});
