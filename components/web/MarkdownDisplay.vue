<template>
  <div class="markdown">
    <div class="content mt-4 is-medium" v-html="proccessedMarkdown"></div>
  </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/scss/atom-one-dark.scss'

export default {
  computed: {
    proccessedMarkdown() {
      // console.log(highlight)
      return marked(this.markdown, {
          highlight(md) {
              return highlight.highlightAuto(md).value
          },
          langPrefix: 'hljs hljs-'
      });

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
