<template>
  <div>
    <titlebar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Tambah Blog Seri Baru" class="has-table has-mobile-sort-spaced">
        <section class="mx-3 my-3">
          <div v-if="validation.message" class="mb-3">
            <b-message type="is-danger">
              {{ validation.message }}
            </b-message>
          </div>
          <form @submit.prevent="storeSeries">
            <b-field>
              <b-upload v-model="postseri.image" drag-drop expanded>
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"></b-icon>
                    </p>
                    <p>Drop your files here or click to upload</p>
                  </div>
                </section>
              </b-upload>
            </b-field>
            <div class="tags">
              <span v-if="postseri.image" class="tag is-primary">
                {{ postseri.image.name }}
              </span>
            </div>
            <div v-if="validation.image" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.image[0] }}
              </b-message>
            </div>
            <b-field label="Judul Blog Series">
              <b-input v-model="postseri.title" value="" placeholder="Masukkan Nama Blog Seri"></b-input>
            </b-field>
            <div v-if="validation.title" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.title[0] }}
              </b-message>
            </div>
            <b-field label="Select Blog">
              <client-only placeholder="loading...">
                <multiselect v-model="postseri.posts" :multiple="true" :close-on-select="true"  :options="posts.map(post => post.id)" :custom-label="opt => posts.find(x => x.id == opt).title">
                  <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} artikel terpilih</span></template>
                </multiselect>
              </client-only>
            </b-field>
            <div v-if="validation.posts" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.posts[0] }}
              </b-message>
            </div>
            <b-field label="Deskripsi">
              <!-- <b-input v-model="post.description" maxlength="200" type="textarea"></b-input> -->
              <b-input v-model="postseri.description" maxlength="200" type="textarea"></b-input>
            </b-field>
            <div v-if="validation.description" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.description[0] }}
              </b-message>
            </div>
            <div class="buttons mt-4">
              <b-button
                icon-pack="fas"
                native-type="submit"
                type="is-primary"
                icon-left="paper-plane">
                Save
              </b-button>
              <b-button
                icon-pack="fas"
                native-type="reset"
                type="is-danger"
                icon-left="redo">
                Reset
              </b-button>
            </div>
          </form>
        </section>
      </card-component>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Titlebar from '@/components/admin/TitleBar'
import CardComponent from '@/components/admin/CardComponent'
export default {
  layout: 'admin',
  components: {
    Titlebar,
    CardComponent
  },
  data() {
    return {
      postseri: {
        image: null,
        title: '',
        description: '',
        posts: [],
      },
      words: 0,
      characters: 0,
      // validation
      validation: [],
      allowNew: false,
      openOnFocus: true
    }
  },
  computed: {
    ...mapGetters({
      posts: 'admin/series/getPosts'
    }),
    titleStack() {
      return ['Admin', 'Blog Series', 'Tambah']
    },
    // wordCount(){
		//   var vm = this,filecont = vm.input;
    //       return vm.skip_html && (filecont = filecont.replace(/<\S[^><]*>/gi, "")),
		// 	  vm.input.match(/\w+/g) ? vm.input.match(/\w+/g).length : 0;
	  // },
    change (event) {
        console.log(event)
        // event.words to get word count, etc.
    }
  },
  async asyncData({ store }) {
    await store.dispatch('admin/series/getPostsData')
  },
  methods: {
    // countup: function() {
    //   this.canPublish = this.wordCount > 4;
    // },
    //handle file upload
    handleFileChange(e) {

      //get image
      let image = this.postseri.image = e.target.files[0]

      //check fileType
      if (!image.type.match('image.*')) {

        //if fileType not allowed, then clear value and set null
        e.target.value = ''

        //set state "category.image" to null
        this.postseri.image = null

        //show sweet alert
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }

    },
    // method "storeTag"
    async storeSeries() {

      // define formData
      let formData = new FormData();

      formData.append('image', this.postseri.image)
      formData.append('title', this.postseri.title)
      formData.append('description', this.postseri.description)

      for( var i = 0; i < this.postseri.posts.length; i++ ){
          let posts = this.postseri.posts[i];
          formData.append('posts[' + i + ']', posts);
      }

      // sending data to action "storeTag" vuex
      await this.$store.dispatch('admin/series/storeSeries', formData)

        // success
        .then(() => {

          // sweet alert
          this.$buefy.snackbar.open(`Data Berhasil Disimpan!`)

          // redirect route "admin-tags"
          this.$router.push({
            name: 'admin-series'
          })
        })

        // error
        .catch(error => {

          // assign error to state "validation"
          this.validation = error.response.data
        })
    }
  }
}
</script>
