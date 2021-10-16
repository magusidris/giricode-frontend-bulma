<template>
  <div>
    <admin-title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <admin-card-component title="Tambah Post Baru" class="has-table has-mobile-sort-spaced">
        <section class="mx-3 my-3">
          <div v-if="validation.message" class="mb-3">
            <b-message type="is-danger">
              {{ validation.message }}
            </b-message>
          </div>
          <form @submit.prevent="updatePost">
            <b-field>
              <b-upload v-model="post.image" drag-drop expanded>
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
              <span v-if="post.image" class="tag is-primary">
                {{ post.image.name }}
              </span>
            </div>
            <div v-if="validation.image" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.image[0] }}
              </b-message>
            </div>
            <b-field label="Judul Post">
              <b-input v-model="post.title" value="" placeholder="Masukkan Nama Post"></b-input>
            </b-field>
            <div v-if="validation.title" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.title[0] }}
              </b-message>
            </div>
            <b-field label="Kategori">
              <client-only placeholder="loading...">
                <b-select v-model="post.category" expanded>
                    <option value="">Pilih Kategori</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                </b-select>
              </client-only>
            </b-field>
            <div v-if="validation.category_id" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.category_id[0] }}
              </b-message>
            </div>
            <b-field label="Tags">
              <client-only placeholder="loading...">
                <multiselect v-model="post.tags" :multiple="true" :options="tags.map(tag => tag.id)" :custom-label="opt => tags.find(x => x.id == opt).name">
                </multiselect>
              </client-only>
            </b-field>
            <div v-if="validation.tags" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.tags[0] }}
              </b-message>
            </div>
            <b-field label="Content Post">
              <client-only placeholder="loading...">
                <ckeditor-nuxt v-model="post.content" :config="editorConfig" />
              </client-only>
            </b-field>
            <div v-if="validation.content" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.content[0] }}
              </b-message>
            </div>
            <b-field label="Deskripsi">
              <client-only placeholder="loading...">
                <b-input v-model="post.description" maxlength="200" type="textarea"></b-input>
              </client-only>
            </b-field>
            <div v-if="validation.descripton" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.descripton[0] }}
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
      </admin-card-component>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  layout: 'admin',
  components: {
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  data() {
    return {
      post: {
        image: null,
        title: '',
        category: '',
        content: '',
        description: '',
        tags: []
      },
      // filteredTags: this.tags,
      // validation
      validation: [],
      allowNew: false,
      openOnFocus: true,
      //config CKEDITOR
      editorConfig: {
        removePlugins: ['Title'],
        simpleUpload: {
          uploadUrl: '/api/v1/admin/images/',
          withCredentials: true
        }
      }
    }
  },
  computed: {
    ...mapState({
      // categories: state => state.admin.post.categories,
      // tags: state => state.admin.post.tags,
    }),
    ...mapGetters({
      categories: 'admin/post/getCategories',
      tags: 'admin/post/getTags'
    }),
    titleStack() {
      return ['Admin', 'Blog', 'Edit']
    }
  },
  mounted() {
    this.post.title = this.$store.state.admin.post.post.title
    this.post.category = this.$store.state.admin.post.post.category.id
    this.post.tags = this.$store.state.admin.post.post.tags.map(tag => tag.id)
    this.post.content = this.$store.state.admin.post.post.content
    this.post.description = this.$store.state.admin.post.post.description
  },
  async asyncData({ store, route }) {
    await store.dispatch('admin/post/getDetailPost', route.params.id)
    await store.dispatch('admin/post/getCategoriesData')
    await store.dispatch('admin/post/getTagsData')
  },
  methods: {
    //handle file upload
    handleFileChange(e) {

      //get image
      let image = this.post.image = e.target.files[0]

      //check fileType
      if (!image.type.match('image.*')) {

        //if fileType not allowed, then clear value and set null
        e.target.value = ''

        //set state "category.image" to null
        this.post.image = null

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
    async updatePost() {
      // define formData
      let formData = new FormData();

      formData.append('image', this.post.image)
      formData.append('title', this.post.title)
      formData.append('category_id', this.post.category)
      formData.append('content', this.post.content)
      formData.append('description', this.post.description)
      // formData.append('tags[]', this.post.tags)

      for( var i = 0; i < this.post.tags.length; i++ ){
          let tags = this.post.tags[i];
          formData.append('tags[' + i + ']', tags);
      }

      // $.each(this.post.tags, function(index, tags) {
      //   formData.append(`tags[${index}]`, tags)
      // })

      formData.append('_method', 'PATCH')

      // sending data to action "storeTag" vuex
      await this.$store.dispatch('admin/post/updatePost', {
        postId: this.$route.params.id,
        payload: formData
      })

        // success
        .then(() => {

          // sweet alert
          this.$buefy.snackbar.open(`Data Berhasil Disimpan!`)

          // redirect route "admin-tags"
          this.$router.push({
            name: 'admin-blogs'
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
