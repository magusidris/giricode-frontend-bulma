import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ app }) => {
  const getGDPR = localStorage.getItem('GDPR:accepted');

  Vue.use(VueGtag, {
    config: { id: 'G-DEX6KTZ8DS' },
    bootstrap: getGDPR === 'true',
    appName: 'Giricode',
    enabled: getGDPR === 'true',
    pageTrackerScreenviewEnabled: true
  }, app.router);
}
