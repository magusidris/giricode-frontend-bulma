<template>
  <div>
    <div class="card">
      <div class="content mt-4 is-medium" v-html="proccessedMarkdown"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import highlight from 'highlight.js'
import 'highlight.js/scss/atom-one-dark.scss'

export default {
  data() {
    return {
      currentValue: ''
    }
  },
  computed: {
    inputLength() {
      return this.currentValue.length || 0
    },
    remainingLength() {
      if (this.inputLength > 0 && this.inputLength < this.maxLength) {
        return this.maxLength - this.inputLength
      } else if (this.inputLength === 0) {
        return this.maxLength
      } else {
        return 0
      }
    },
    wordCount() {
      return this.$refs.myMarkdown
      // if (this.inputLength > 0) {
      //   return this.currentValue.split(' ')?.length
      // } else {
      //   return 0
      // }
    },
    lineCount() {
      return this.currentValue.length ? this.currentValue.split('n').length : 0
    },
    canPublish() {
      return this.wordCount > 4
    },
    proccessedMarkdown() {
      // console.log(highlight)
      // marked.setOptions({
      //     renderer: new marked.Renderer(),
      return marked(this.markdown, {
          highlight(md) {
              return highlight.highlightAuto(md).value
          },
          langPrefix: 'hljs hljs-'
      });
      // return marked(this.markdown)
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
  .card {
    text-size-adjust: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    min-height: 10rem
  }

  ::v-deep code::before {
    content: ""!important;
  }
</style>
