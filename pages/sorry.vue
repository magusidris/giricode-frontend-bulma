<template>
  <section class="section">
    <div class="container">
      <error-view :title="'Ooooops, you are not authorized to visit this page, please talk to administrator in order to get access rights'"
                :status="'500'"
                :navigateToPage="'/'"
                :navigateToText="'Navigate to Home Page'"
                :image="'/img/error-500.svg'" />
    </div>
  </section>
</template>

<script>
import ErrorView from '@/components/web/ErrorView'
export default {
  components: {
    ErrorView
  }
}
</script>
