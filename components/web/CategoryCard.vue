<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Category
      </p>
    </header>
    <div class="card-content">
      <media-card />
    </div>
  </div>
</template>

<script>
import MediaCard from '@/components/web/MediaCard'
export default {
  components: {
    MediaCard
  }
}
</script>
