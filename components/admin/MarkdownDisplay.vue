<template>
  <div v-html="proccessedMarkdown"></div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

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
