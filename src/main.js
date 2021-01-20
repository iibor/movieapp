import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/firestore";

import { firestorePlugin } from "vuefire";

Vue.use(firestorePlugin);

const firebaseConfig = {
  apiKey: "AIzaSyAZ-f-3Itarc16om6t2hHOf2MZ4Egrizbw",
  authDomain: "movieapp-b2534.firebaseapp.com",
  projectId: "movieapp-b2534",
  storageBucket: "movieapp-b2534.appspot.com",
  messagingSenderId: "364598646840",
  appId: "1:364598646840:web:67637a5405746a7a2daecd",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
