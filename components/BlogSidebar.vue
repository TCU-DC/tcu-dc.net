<template>
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
      <div v-for="i in contents" :key="i.id">
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
</template>
<script>
export default {
  props: ['contents']
}
</script>
