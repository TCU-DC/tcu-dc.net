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
            <span class="blogblogContentsDate">{{ new Date(blog.publishedAt).toLocaleDateString() }}</span>
            <h1>{{ blog.title }}</h1>
            <p v-html="blog.body" />
          </div>
          <div id="blogFooter">
            <h3>新着記事</h3>
            <div v-for="i in blogNew" :key="i.id">
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
        <BlogSidebar :contents="blogall" />
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
      axios.get(
        'https://tcu-dc.microcms.io/api/v1/top',
        { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY } }
      ),
      axios.get(
        'https://tcu-dc.microcms.io/api/v1/blog/',
        { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY } }
      ),
      axios.get(
        'https://tcu-dc.microcms.io/api/v1/blog/' + slug,
        { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY } }
      )
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
        { hid: 'description', name: 'description', content: this.blog.description },
        { hid: 'og:title', property: 'og:title', content: this.blog.title },
        { hid: 'og:image', property: 'og:image', content: this.blog.img.url },
        { hid: 'og:description', property: 'og:description', content: this.blog.description }
      ]
    }
  },
  computed: {
    blogNew () {
      /* (0, {表示させたい記事の数}) */
      return this.blogall.slice(0, 5)
    }
  }
}
</script>
