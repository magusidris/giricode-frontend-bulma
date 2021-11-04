<template>
  <section class="section">
    <div class="container">
      <error-view :title="'Ooooops, you are not authenticated to visit this page, please login'"
               :status="'401'"
               :navigateToPage="'login'"
               :navigateToText="'Navigate to Login Page'"
               :image="'/img/error-401.svg'" />
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
