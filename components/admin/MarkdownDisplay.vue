<template>
  <div v-html="proccessedMarkdown"></div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/scss/atom-one-dark.scss'

export default {
  computed: {
    proccessedMarkdown() {


      // console.log(highlight)
      marked.setOptions({
          renderer: new marked.Renderer(),
          highlight(md) {
              return highlight.highlightAuto(md).value
          },
          langPrefix: 'hljs hljs-'
      });
      return marked(this.markdown)


      // Override function
      // const renderer = {
      //   code(text) {
      //     // const match = text.toLowerCase().replace(/[^\w]+/g, '-');

      //     return `
      //       <div class=hljs-"${text}">
      //         <pre>
      //           <code class="hljs hljs-${text}">
      //           </code>
      //         </pre>
      //       </div${text}>`;

      //   }
      // };

      // marked.use({ renderer });
    }
  },
  props: {
    'markdown': {
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep code::before {
    content: ""!important;
  }
</style>
