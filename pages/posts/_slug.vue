<template>
  <div>
    <div class="background_pink" />
    <div class="background_lightBlue" />
    <div class="background_blue" />
    <Navbar :contents="top" />
    <main>
      <div id="blogWrapper">
        <div id="blogDoc">
          <div id="blogContents" class="link-decoration">
            <span class="blogblogContentsDate">{{
              new Date(blog.publishedAt).toLocaleDateString()
            }}</span>
            <h1>{{ blog.title }}</h1>
            <p v-html="blog.body" />
          </div>
          <div id="blogFooter">
            <h3>新着記事</h3>
            <div v-for="i in getNewBlog" :key="i.id">
              <p class="blogNewArticlesDate">
                {{ new Date(i.publishedAt).toLocaleDateString() }}
              </p>
              <p class="blogNewArticlesTitle">
                <NuxtLink :to="'/posts/' + i.id">
                  {{ i.title }}
                </NuxtLink>
              </p>
            </div>
            <NuxtLink :to="'/posts/'" class="link newsLink">
              >> 一覧はこちら
            </NuxtLink>
          </div>
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
  async asyncData ({ params }) {
    const slug = params.slug
    const res = await Promise.all([
      axios.get(process.env.API_BASE_URL + 'top', {
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY }
      }),
      axios.get(process.env.API_BASE_URL + 'blog/', {
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY }
      }),
      axios.get(process.env.API_BASE_URL + 'blog/' + slug, {
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY }
      })
    ])
    return {
      top: res[0].data,
      blogall: res[1].data.contents,
      blog: res[2].data
    }
  },
  head () {
    return {
      title: this.blog.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.blog.description
        },
        { hid: 'og:title', property: 'og:title', content: this.blog.title },
        { hid: 'og:image', property: 'og:image', content: this.blog.img.url },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.blog.description
        },
        // apiから取得したnoindexの値がtrueの場合にnoindexタグを追加
        this.blog.noindex
          ? { hid: 'robots', name: 'robots', content: 'noindex' }
          : {}
      ]
    }
  },
  computed: {
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
