<template>
  <div class="hero-footer footer footer-custom">
    <div class="container py-7">
      <div class="has-text-centered">
        <div class="columns is-multiline is-justify-content-center pb-4">
          <div class="selfs mx-3 my-3" v-for="(data, index) in selfs" :key="index"><nuxt-link :to="data.url">{{ data.name }}</nuxt-link></div>
        </div>
        <div class="pt-3">
          <a target="_" :href="data.url" v-for="(data, index) in socmeds" :key="index">
            <span class="icon has-text-white mx-5">
              <i :class="data.icon"></i>
            </span>
          </a>
        </div>
        <!-- <p>Github <a target="_" href="https://github.com/magusidris"></a></p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selfs: [
        {
          name: 'About',
          url: '/about'
        },
        {
          name: 'Contact',
          url: '/contact'
        },
        {
          name: 'Privacy Police',
          url: '/privacy'
        },
        {
          name: 'Disclaimer',
          url: '/disclaimer'
        }
      ],
      socmeds: [
        {
          icon: 'fab fa-facebook',
          url: 'https://facebook.com/giricode'
        },
        {
          icon: 'fab fa-github',
          url: 'https://github.com/nuxtcraft'
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
  /* footer */
  .icon {
    margin-bottom: 20px;
  }
  .fa-facebook {
    font-size: 45px;
  }
  .fa-github {
    font-size: 45px;
  }
  .footer-custom {
      background-color: $dark-green;
      color: #fff;
  }
  .footer-custom p {
      font-size: 1rem;
      font-weight: 500;
  }
  .footer-custom a {
      color: #d74436;
  }
  .footer-custom a:hover {
      color: #e50076;
  }
  .selfs a{
    color: white;
  }
  .selfs a:hover{
    color: $warning;
  }
</style>
