import VueCompositionApi from "@vue/composition-api";
import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
new Vue({
    render: h => h(App)
}).$mount("#app");
