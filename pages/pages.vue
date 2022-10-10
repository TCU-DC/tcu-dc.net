<template>
  <div>
    <div class="background_pink" />
    <div class="background_lightBlue" />
    <div class="background_blue" />
    <Navbar :contents="top" />
    <main>
      <div id="blogWrapper">
        <div id="blogIndex" class="link-decoration">
          <h1>固定ページ一覧</h1>
          <NuxtLink
            v-for="i in getNoindexFilteredPageall"
            :key="i.id"
            :to="'/' + i.id"
            class="blogall_box"
          >
            <p class="blogall_date">
              {{ new Date(i.publishedAt).toLocaleDateString() }}
            </p>
            <p class="blogall_title">
              {{ i.title }}
            </p>
          </NuxtLink>
        </div>
        <BlogSidebar :contents="getNewBlog" />
      </div>
    </main>
    <footer v-html="top.footer.body" />
  </div>
</template>
<script>
import axios from 'axios'
import Navbar from '~/components/Navbar.vue'
import BlogSidebar from '~/components/BlogSidebar.vue'
export default {
  components: {
    Navbar,
    BlogSidebar
  },
  async asyncData () {
    const res = await Promise.all([
      axios.get(process.env.API_BASE_URL + 'top', {
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY }
      }),
      axios.get(process.env.API_BASE_URL + 'page/?limit=1000', {
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY }
      }),
      axios.get(process.env.API_BASE_URL + 'blog/', {
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY }
      })
    ])
    return {
      top: res[0].data,
      pageall: res[1].data.contents,
      blogall: res[2].data.contents
    }
  },
  head () {
    return {
      title: '固定ページ一覧',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex, follow' },
        {
          hid: 'description',
          name: 'description',
          content: '東京都市大学デジタルコンテンツ研究会の固定ページ一覧です。'
        },
        { hid: 'og:title', property: 'og:title', content: '固定ページ一覧' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: '東京都市大学デジタルコンテンツ研究会の固定ページ一覧です。'
        }
      ]
    }
  },
  computed: {
    getNoindexFilteredPageall () {
      const filtered = this.pageall.filter(item => item.noindex === false)
      return filtered
    },
    getNoindexFilteredBlogall () {
      const filtered = this.blogall.filter(item => item.noindex === false)
      return filtered
    },
    getNewBlog () {
      /* (0, {表示させたい記事の数}) */
      return this.getNoindexFilteredBlogall.slice(0, 5)
    }
  }
}
</script>
