<template>
  <section class="section">
    <div class="container">
      <web-error-view :title="'Ooooops, you are not authenticated to visit this page, please login'"
               :status="'401'"
               :navigateToPage="'login'"
               :navigateToText="'Navigate to Login Page'" />
    </div>
  </section>
</template>

<style scoped>
</style>
