<template>
  <div>
    <div class="background_pink" />
    <div class="background_lightBlue" />
    <div class="background_blue" />
    <Navbar :contents="top" />
    <main>
      <div id="welcome">
        <h2><img src="~assets/svg/kitare.svg" alt="来たれ！デジコン"></h2>
        <h4>
          <img
            src="~assets/svg/maishu.svg"
            alt="毎週木曜日20:00〜 Discordで活動"
          >
        </h4>
        <p v-html="top.welcome.body" />
        <div class="welcomeIntroWrapper">
          <a href="#illust" class="welcomeIntroContnts welcomeIllust">{{
            top.teams.team1
          }}</a>
          <a href="#movie" class="welcomeIntroContnts welcomeMovie">{{
            top.teams.team2
          }}</a>
        </div>
        <div class="welcomeIntroWrapper">
          <a href="#DTM" class="welcomeIntroContnts welcomeDTM">{{
            top.teams.team3
          }}</a>
          <a
            href="#programming"
            class="welcomeIntroContnts welcomeProgramming"
          >{{ top.teams.team4 }}</a>
        </div>
      </div>
      <div id="news">
        <h3><img src="~assets/svg/news.svg" alt="News"></h3>
        <span
          class="link"
        ><NuxtLink to="/posts/" class="newsLink">>> 一覧</NuxtLink></span>
        <div id="newsBoxEnclose">
          <NuxtLink
            v-for="i in getNewBlog"
            :key="i.id"
            :to="'/posts/' + i.id"
            class="newsBox"
          >
            <p class="date">
              {{ new Date(i.publishedAt).toLocaleDateString() }}
            </p>
            <p class="description">
              {{ i.title }}
            </p>
          </NuxtLink>
        </div>
      </div>
      <div id="general">
        <h3><img src="~assets/svg/katsudo.svg" alt="活動風景"><br></h3>
        <img class="generalImg" src="~assets/webp/katsudo.webp" alt=""><br>
        <img class="generalImgBack" src="~assets/svg/icon.svg" alt="">
      </div>
      <div id="introBoxEnclose" class="link-decoration">
        <div class="introBoxWrapper">
          <div id="illust" class="introBox">
            <div>
              <h3>
                <img
                  class="introTitle"
                  src="~assets/svg/illust.svg"
                  alt="イラスト班"
                >
              </h3>
              <p v-html="top.teams.team1_desc" />
            </div>
            <div>
              <img class="sample" src="~assets/webp/illust_intro.webp" alt="">
            </div>
          </div>
          <div id="movie" class="introBox">
            <div>
              <h3>
                <img
                  class="introTitle"
                  src="~assets/svg/movie.svg"
                  alt="動画班"
                >
              </h3>
              <p v-html="top.teams.team2_desc" />
            </div>
            <div>
              <iframe
                class="sample"
                src="https://www.youtube-nocookie.com/embed/gotLgbY-w5w"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            </div>
          </div>
        </div>
        <div class="introBoxWrapper">
          <div id="DTM" class="introBox">
            <div>
              <h3>
                <img class="introTitle" src="~assets/svg/dtm.svg" alt="DTM班">
              </h3>
              <p v-html="top.teams.team3_desc" />
            </div>
            <div>
              <img class="sample" src="~assets/webp/dtm_intro.webp" alt="">
            </div>
          </div>
          <div id="programming" class="introBox">
            <div>
              <h3>
                <img
                  class="introTitle"
                  src="~assets/svg/programming.svg"
                  alt="プログラミング班"
                >
              </h3>
              <p v-html="top.teams.team4_desc" />
            </div>
            <div>
              <img
                class="sample"
                src="~assets/webp/programming_intro.webp"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
      <div id="QandA" class="link-decoration">
        <h1><img src="~assets/svg/qanda.svg" alt="よくある質問"></h1>
        <span v-html="top.qanda.body" />
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
  async asyncData () {
    const res = await Promise.all([
      axios.get(process.env.API_BASE_URL + 'top', {
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY }
      }),
      axios.get(process.env.API_BASE_URL + 'blog/', {
        headers: { 'X-MICROCMS-API-KEY': process.env.MICROCMS_API_KEY }
      })
    ])
    return {
      top: res[0].data,
      blogall: res[1].data.contents
    }
  },
  head () {
    return {
      title: '東京都市大学デジタルコンテンツ研究会',
      titleTemplate: '',
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'description',
          name: 'description',
          content: this.top.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: '東京都市大学デジタルコンテンツ研究会'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.top.description
        }
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
      return this.getNoindexFilteredBlogall.slice(0, 10)
    }
  }
}
</script>
