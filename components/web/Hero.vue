<template>
  <section class="hero is-light-green">
    <div>
      <div class="container is-max-widescreen">
        <div class="hero-body">
          <div class="columns is-multiline is-centered">
            <div class="column is-1 is-full-tabled is-full-mobile my-auto">
              <figure class="image is-64x64 mx-auto">
                <nuxt-link to="/">
                  <img class="is-rounded" src="/img/mobile-logo.svg">
                </nuxt-link>
              </figure>
            </div>
            <div class="column">
              <p class="title">
                Giricode
              </p>
              <p class="subtitle">
                Belajar koding bahasa Indonesia terlengkap.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .hero-body {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
</style>
