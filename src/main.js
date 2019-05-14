import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBmso8tDteOWAe4I5-l7WCYejfvC5ofDdc',
  authDomain: 'findrooms-32423.firebaseapp.com',
  databaseURL: 'https://findrooms-32423.firebaseio.com',
  projectId: 'findrooms-32423',
  storageBucket: 'findrooms-32423.appspot.com',
  messagingSenderId: '1074730093945',
  appId: '1:1074730093945:web:1e1eecf07e86b7a8',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('FETCH_AUTH_USER');
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    if (store.state.authId) this.$store.dispatch('FETCH_USER', { id: store.state.authId });
  },
}).$mount('#app');
