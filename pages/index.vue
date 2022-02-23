<template>
  <div>
    <div class="background_pink" />
    <div class="background_lightBlue" />
    <div class="background_blue" />
    <div class="background_purple" />
    <div class="background_lightBlue2" />
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
      <div id="welcome">
        <h2><img src="~assets/svg/kitare.svg" alt="来たれ！デジコン"></h2>
        <h4><img src="~assets/svg/maishu.svg" alt="毎週金曜日21:00〜 Discordで活動"></h4>
        <p>
          <span v-html="top.welcome.body" />
        </p>
        <div class="welcomeIntroWrapper">
          <a href="#illust" class="welcomeIntroContnts welcomeIllust">{{ top.teams.team1 }}</a>
          <a href="#movie" class="welcomeIntroContnts welcomeMovie">{{ top.teams.team2 }}</a>
        </div>
        <div class="welcomeIntroWrapper">
          <a href="#DTM" class="welcomeIntroContnts welcomeDTM">{{ top.teams.team3 }}</a>
          <a href="#programming" class="welcomeIntroContnts welcomeProgramming">{{ top.teams.team4 }}</a>
        </div>
      </div>
      <div id="news">
        <h3><img src="~assets/svg/news.svg" alt="News"></h3>
        <span class="link"><a href="#" class="newsLink">>> 一覧</a></span>
        <div id="newsBoxEnclose">
          <NuxtLink v-for="i in blog" :key="i.id" :to="'/blog/' + i.id" class="newsBox">
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
              <h3><img class="introTitle" src="~assets/svg/illust.svg" alt="イラスト班"></h3>
              <p>{{ top.teams.team1_desc }}</p>
            </div>
            <div>
              <img class="sample" src="~assets/webp/dtm_sample.webp" alt="">
            </div>
          </div>
          <div id="movie" class="introBox">
            <div>
              <h3><img class="introTitle" src="~assets/svg/movie.svg" alt="動画班"></h3>
              <p>{{ top.teams.team2_desc }}</p>
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
              <h3><img class="introTitle" src="~assets/svg/dtm.svg" alt="DTM班"></h3>
              <p>{{ top.teams.team3_desc }}</p>
            </div>
            <div>
              <img class="sample" src="~assets/webp/dtm_sample.webp" alt="">
            </div>
          </div>
          <div id="programming" class="introBox">
            <div>
              <h3><img class="introTitle" src="~assets/svg/programming.svg" alt="プログラミング班"></h3>
              <p>{{ top.teams.team4_desc }}</p>
            </div>
            <div>
              <img class="sample" src="~assets/webp/dtm_sample.webp" alt="">
            </div>
          </div>
        </div>
      </div>
      <div id="QandA" class="link-decoration">
        <h1><img src="~assets/svg/qanda.svg" alt="よくある質問"></h1>
        <span v-html="top.qanda.body" />
      </div>
    </main>
    <footer v-html="top.footer.body"></footer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  async asyncData () {
    const res = await Promise.all([
      axios.get(
        'https://tcu-dc.microcms.io/api/v1/top',
        { headers: { 'X-MICROCMS-API-KEY': 'cce632607ed24373acc3e0ba0be10e180d71' } }
      ),
      axios.get(
        'https://tcu-dc.microcms.io/api/v1/blog',
        { headers: { 'X-MICROCMS-API-KEY': 'cce632607ed24373acc3e0ba0be10e180d71' } }
      )
    ])
    return {
      top: res[0].data,
      blog: res[1].data.contents
    }
  },
  head () {
    return {
      title: '東京都市大学デジタルコンテンツ研究会',
      titleTemplate: ''
    }
  }
}
</script>
