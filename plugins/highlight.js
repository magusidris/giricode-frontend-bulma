import Vue from 'vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

import vuePlugin from "~/vue-plugin";

import 'highlight.js/styles/atom-one-dark.css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);

Vue.use(vuePlugin);
