<template>
  <section class="section">
    <div class="container">
      <web-error-view :title="'Ooooops, you are not authorized to visit this page, please talk to administrator in order to get access rights'"
                :status="'401'"
                :navigateToPage="'/'"
                :navigateToText="'Navigate to Home Page'" />
    </div>
  </section>
</template>

<script>
export default {
  layout: 'error'
}

</script>
<style scoped>
</style>
