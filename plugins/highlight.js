import Vue from 'vue';
import hljs from 'highlight.js/lib/index';
// import javascript from 'highlight.js/lib/languages/javascript';
// import python from 'highlight.js/lib/languages/python';

import 'highlight.js/scss/atom-one-dark.scss';
import vuePlugin from "~/vue-plugin";

// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('python', python);

Vue.use(vuePlugin);
