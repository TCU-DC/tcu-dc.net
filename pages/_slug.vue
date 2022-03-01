<template>
  <div>
    <div class="background_pink" />
    <div class="background_lightBlue" />
    <div class="background_blue" />
    <Navbar :contents="top" />
    <main>
      <div id="contents" class="link-decoration">
        <h1>{{ page.title }}</h1>
        <p v-html="page.body" />
      </div>
    </main>
    <footer v-html="top.footer.body" />
  </div>
</template>
<script>
import axios from 'axios'
import Navbar from '~/components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  async asyncData ({ params }) {
    const slug = params.slug
    const res = await Promise.all([
      axios.get(
        'https://tcu-dc.microcms.io/api/v1/top',
        { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY } }
      ),
      axios.get(
        'https://tcu-dc.microcms.io/api/v1/page/' + slug,
        { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY } }
      )
    ])
    return {
      top: res[0].data,
      page: res[1].data
    }
  },
  head () {
    return {
      title: this.page.title,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description },
        { hid: 'og:title', property: 'og:title', content: this.page.title },
        { hid: 'og:description', property: 'og:description', content: this.page.description }
      ]
    }
  }
}
</script>
