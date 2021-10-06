<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel" />
      <b-field class="mt-3 mx-3">
        <p class="control">
            <b-button type="is-danger" label="Tambah" icon-pack="fas" icon-left="plus-circle" />
        </p>
        <b-input type="text" expanded></b-input>
        <p class="control">
            <b-button type="is-success" label="Cari" icon-pack="fas" icon-left="search" />
        </p>
    </b-field>
    <b-table
      class="mx-3"
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="data">
      <template slot-scope="props">
        <b-table-column label="Name" field="name" sortable>
          {{ props.row.name }}
        </b-table-column>
        <b-table-column label="Created" field="created_at" sortable>
          <small
            class="has-text-grey is-abbr-like"
            :title="props.row.created"
            >{{ props.row.created_at }}</small
          >
        </b-table-column>
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <nuxt-link
              :to="{ name: 'client-id', params: { id: props.row.id } }"
              class="button is-small is-primary"
            >
              <b-icon icon="account-edit" size="is-small" />
            </nuxt-link>
            <button
              class="button is-small is-danger"
              type="button"
              @click.prevent="trashModal(props.row)"
            >
              <b-icon icon="trash-can" size="is-small" />
            </button>
          </div>
        </b-table-column>
      </template>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
    <b-pagination
          v-model="currentPage"
          @change="fetchPosts"
          :total="posts.total"
          :perPage="posts.per_page">
      </b-pagination>
  </div>
</template>

<script>
import ModalBox from '@/components/admin/ModalBox'

export default {
  name: 'ClientsTableSample',
  components: { ModalBox },
  props: {
    data: {
      type: Array,
      required: false,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isModalActive: false,
      trashObject: null,
      clients: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    },
    currentPage: {
      get() {
        return this.$store.state.admin.tag.page
      },
      set(value) {
        this.$store.commit('admin/tag/setPage', value)
      }
    }
  },
  methods: {
    trashModal(trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm() {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false,
      })
    },
    trashCancel() {
      this.isModalActive = false
    },
  },
}
</script>
