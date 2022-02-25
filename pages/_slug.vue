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
export default {
  async asyncData ({ params }) {
    const slug = params.slug
    const res = await Promise.all([
      axios.get(
        'https://tcu-dc.microcms.io/api/v1/top',
        { headers: { 'X-MICROCMS-API-KEY': 'cce632607ed24373acc3e0ba0be10e180d71' } }
      ),
      axios.get(
        'https://tcu-dc.microcms.io/api/v1/page/' + slug,
        { headers: { 'X-MICROCMS-API-KEY': 'cce632607ed24373acc3e0ba0be10e180d71' } }
      )
    ])
    return {
      top: res[0].data,
      page: res[1].data
    }
  },
  head () {
    return {
      title: this.page.title
    }
  }
}
</script>
