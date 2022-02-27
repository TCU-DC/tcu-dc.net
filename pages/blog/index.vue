<template>
  <div>
    <div class="background_pink" />
    <div class="background_lightBlue" />
    <div class="background_blue" />
    <nav>
      <NuxtLink to="/">
        <h1><img id="logo" src="~assets/svg/logo.svg" alt="東京都市大学デジタルコンテンツ研究会"></h1>
      </NuxtLink>
      <ul>
        <li>
          <NuxtLink :to="'/' + top.nav.link1.id">
            {{ top.nav.link1.title }}<br>
            <span class="sub">{{ top.nav.link1.id }}</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="'/' + top.nav.link2.id">
            {{ top.nav.link2.title }}<br>
            <span class="sub">{{ top.nav.link2.id }}</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="'/' + top.nav.link3.id">
            {{ top.nav.link3.title }}<br>
            <span class="sub">{{ top.nav.link3.id }}</span>
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink :to="'/' + top.nav.joinus.id" class="button">
        {{ top.nav.joinus.title }}
      </NuxtLink>
    </nav>
    <main>
      <div id="blogWrapper">
        <div id="blogIndex" class="link-decoration">
          <p />
          <h1>記事一覧</h1>
          <NuxtLink v-for="i in blogall" :key="i.id" :to="'/blog/' + i.id" class="blogall_box">
            <p class="blogall_date">
              {{ new Date(i.publishedAt).toLocaleDateString() }}
            </p>
            <p class="blogall_title">
              {{ i.title }}
            </p>
          </NuxtLink>
          <p />
        </div>
        <div id="blogSideBar">
          <h3>Author</h3>
          <div id="blogAuthor">
            <div id="blogIcon">
              <img src="~assets/svg/icon.svg" alt="アイコン">
            </div>
            <p>デジタルコンテンツ研究会</p>
          </div>
          <span class="line" />
          <h3>新着記事</h3>
          <div id="blogNewArticles" class="link-black">
            <div v-for="i in blogNew" :key="i.id">
              <p class="blogNewArticlesDate">
                {{ new Date(i.publishedAt).toLocaleDateString() }}
              </p>
              <p class="blogNewArticlesTitle">
                <NuxtLink :to="'/blog/' + i.id">
                  {{ i.title }}
                </NuxtLink>
              </p>
            </div>
          </div>
          <NuxtLink :to="'/blog/'" class="link newsLink">
            >> 一覧はこちら
          </NuxtLink>
        </div>
      </div>
    </main>
    <footer v-html="top.footer.body" />
  </div>
</template>
<script>
import axios from 'axios'
export default {
  async asyncData () {
    const res = await Promise.all([
      axios.get(
        'https://tcu-dc.microcms.io/api/v1/top',
        { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY } }
      ),
      axios.get(
        'https://tcu-dc.microcms.io/api/v1/blog/',
        { headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY } }
      )
    ])
    return {
      top: res[0].data,
      blogall: res[1].data.contents
    }
  },
  head () {
    return {
      title: '記事一覧'
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
