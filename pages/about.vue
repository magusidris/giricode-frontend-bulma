<template>
  <div>
    <section class="section">
      <div class="container is-max-desktop">
        <div class="columns">
          <div class="column">
            <div class="card">
              <header class="card-header has-text-centered">
                <div class="media-content py-5">
                  <h3 class="title has-text-dark-green"><strong>About</strong></h3>
                </div>
              </header>
              <div class="card-content" style="min-height: 22rem">
                <div class="content is-medium">
                  <p><b>Giricode</b> adalah website pembelajaran online yang bermodel blog yang ditujukan untuk para developer / programmer dalam meningkatkan skill bahasa pemrogramangan mulai dasar hingga expert. Melalui single atau parts artikel akan banyak sekali contoh kasus yang akan kita gali bersama bahasa-bahasa pemrograman populer saat ini. ^_^</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      body: 'Giricode adalah website pembelajaran online yang bermodel blog yang ditujukan untuk para pengembang bahasa pemrogramangan. Melalui single atau parts artikel akan banyak sekali contoh kasus yang akan kita gali bersama bahasa-bahasa pemrograman populer saat ini. ^_^'
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-header:first-child, .card-content:first-child, .card-footer:first-child {
    border-top: 3px solid $dark-green;
  }
</style>
