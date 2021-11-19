<template>
  <div>
    <textarea
    :maxLength="maxLength"
    @input="emitInputValue"
    class="textarea is-medium"
    ref="textarea"
    @focus="resize"
    @keyup="resize"
    v-html="proccessedMarkdown">
    </textarea>
    <span class="icon is-small is-right pr-4">
      {{ wordCount }}
    </span>
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
  props: {
   maxLength: {
    type: Number,
    required: false
   },
   markdown: {
     default: ''
   }
  },
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
    },
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
      if (this.inputLength > 0) {
        return this.currentValue.split(' ')?.length
      } else {
        return 0
      }
      // return this.currentValue.length ? this.currentValue.match(/\s+/g)?.length : 0
    },
    lineCount() {
      return this.currentValue.length ? this.currentValue.split('n').length : 0
    },
    canPublish() {
      return this.wordCount > 4
    }
  },
  methods: {
    emitInputValue($event) {
      this.currentValue = $event.target.value
      this.$emit('input', $event.target.value)
    },
    resize(e) {
      // const { textarea } = this.$refs;
      // textarea.style.height = textarea.scrollHeight - 7 + 'px';
      let area = e.target;
      area.style.height = area.scrollHeight - 4 + 'px';
    }
  }
}
</script>

<style>
textarea {
  padding-right: 2.5rem!important;
  resize: none;
  overflow: hidden;
}

::v-deep code::before {
  content: ""!important;
}
</style>
